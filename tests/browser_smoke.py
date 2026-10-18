"""Local browser smoke test. Requires Playwright and its Chromium browser."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from tempfile import TemporaryDirectory
import struct
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *_args):
        pass


server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
thread = Thread(target=server.serve_forever, daemon=True)
thread.start()
try:
    with sync_playwright() as playwright, TemporaryDirectory() as directory:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900}, accept_downloads=True)
        requests = []
        page.on("request", lambda request: requests.append(request.url))
        page.goto(f"http://127.0.0.1:{server.server_port}/")
        page.locator("#qrPreview svg").wait_for()
        page.screenshot(path=str(ROOT / "preview.png"), full_page=True)
        assert page.title().startswith("Master QR Maker")
        assert page.locator(".privacy-card, .local-badge, .status-strip, .side-foot").count() == 0
        assert "v1.0" not in page.locator("body").inner_text()
        for target in ["personalizacja", "eksport", "studio"]:
            item = page.locator(f'.sidebar nav a[href="#{target}"]')
            item.click()
            assert item.get_attribute("aria-current") == "location"
            assert item.evaluate("(el) => el.classList.contains('active')")
        page.locator('[data-key="url"]').fill("https://openai.com")
        page.locator('[data-lang="en"]').click()
        assert page.locator("html").get_attribute("lang") == "en"
        assert page.locator(".page-heading h1").inner_text() == "Design your QR code."
        assert page.locator('[data-key="url"]').input_value() == "https://openai.com"
        assert page.locator('[data-mode="contact"] span').inner_text() == "Contact"
        assert page.locator("#caption").input_value() == "Scan to discover more"
        assert page.locator(".field-label").inner_text().startswith("Center mark")
        assert page.locator("#plateBtn strong").inner_text() == "Download plaque STL"
        page.wait_for_function("document.querySelector('#standDimensions').textContent.includes('Illustrative preview')")
        page.screenshot(path=str(ROOT / "preview-en.png"), full_page=True)
        page.locator('[data-mode="wifi"]').click()
        page.wait_for_function("document.querySelector('#inputError').textContent.includes('password')")
        page.locator('[data-mode="url"]').click()
        page.locator('[data-preview="paper"]').click()
        assert page.locator("#paperTitle").inner_text() == "Scan the QR code"
        page.reload()
        assert page.locator('[data-lang="en"]').get_attribute("aria-pressed") == "true"
        page.locator('[data-lang="pl"]').click()
        assert page.locator(".page-heading h1").inner_text() == "Zaprojektuj swój kod QR."
        page.locator("#qrPreview svg").wait_for()
        assert "29" in page.locator("#matrixSize").inner_text()
        assert page.locator("#qrPreview path").evaluate("(el) => getComputedStyle(el).stroke") == "none"

        page.locator('[data-mode="wifi"]').click()
        page.locator('[data-key="ssid"]').fill("Studio Wi-Fi")
        page.locator('[data-key="password"]').fill("Test12345")
        page.locator("#qrPreview svg").wait_for()
        assert page.locator("#inputError").is_hidden()
        page.locator('[data-key="showDetails"]').check()
        page.locator("#caption").fill("Welcome inside")
        page.wait_for_function("document.querySelectorAll('#qrCaption .caption-line').length === 3")
        assert page.locator("#qrCaption").inner_text().splitlines() == ["SSID: Studio Wi-Fi", "Hasło: Test12345", "Welcome inside"]
        assert page.locator("#paperCaption").inner_text().count("Test12345") == 1
        with page.expect_download() as event:
            page.locator("#svgBtn").click()
        wifi_svg = Path(directory) / "wifi-details.svg"
        event.value.save_as(wifi_svg)
        assert "Studio Wi-Fi" in wifi_svg.read_text(encoding="utf-8")
        assert "Test12345" in wifi_svg.read_text(encoding="utf-8")
        page.locator("#printBtn").click()
        assert "Studio Wi-Fi" in page.locator("iframe").last.get_attribute("srcdoc")
        assert "Test12345" in page.locator("iframe").last.get_attribute("srcdoc")

        page.locator("#nfcEnabled").check()
        assert page.locator("#nfcOptions").is_visible()
        page.locator("#nfcThickness").fill("0.7")
        page.locator("#nfcThickness").blur()
        page.wait_for_function("document.querySelector('#nfcPrintHint').textContent.includes('2,3')")
        assert page.locator("#standNfc").inner_text() == "NFC"
        pocket_centers = {}
        for position in ["qr", "caption", "symbol"]:
            page.locator("#nfcPosition").select_option(position)
            if position == "caption":
                page.locator("#nfcDiameter").fill("28")
                page.locator("#nfcDiameter").press("Tab")
            if position == "symbol":
                page.locator("#nfcDiameter").fill("25")
                page.locator("#nfcDiameter").press("Tab")
            with page.expect_download() as event:
                page.locator("#plateBtn").click()
            data = (Path(directory) / f"nfc-{position}.stl")
            event.value.save_as(data)
            vertices = []
            raw = data.read_bytes()
            cavity_volume = 0
            for offset in range(84, len(raw), 50):
                triangle = struct.unpack_from("<12fH", raw, offset)
                points = [(triangle[i], triangle[i + 1], triangle[i + 2]) for i in (3, 6, 9)]
                if all(1 < point[2] < 3 for point in points):
                    a, b, c = points
                    cavity_volume += (a[0] * (b[1] * c[2] - b[2] * c[1]) + a[1] * (b[2] * c[0] - b[0] * c[2]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6
                for i in (3, 6, 9):
                    if 1 < triangle[i + 2] < 3:
                        vertices.append((triangle[i], triangle[i + 1], triangle[i + 2]))
            assert vertices, f"Missing NFC cavity: {position}"
            expected_size = 29.2 if position == "caption" else 26.2
            assert abs(max(v[0] for v in vertices) - min(v[0] for v in vertices) - expected_size) < .02
            assert any(abs(v[2] - 2.3) < .001 for v in vertices)
            assert cavity_volume < -100, f"NFC shell does not form a negative volume: {position}"
            pocket_centers[position] = (max(v[1] for v in vertices) + min(v[1] for v in vertices)) / 2
        assert pocket_centers["qr"] > pocket_centers["caption"] > pocket_centers["symbol"]
        page.locator('[data-preview="stand"]').click()
        page.screenshot(path=str(ROOT / "preview-features.png"), full_page=True)
        page.locator('[data-preview="qr"]').click()
        page.locator("#nfcEnabled").uncheck()

        page.locator('[data-mode="url"]').click()
        page.locator('[data-overlay="icon"]').click()
        page.wait_for_function("document.querySelectorAll('#qrPreview svg path').length >= 2")
        for icon in ["wifi", "home", "nfc", "radio", "globe", "phone", "mail", "link"]:
            page.locator(f'[data-icon="{icon}"]').click()
            assert page.locator(f'[data-icon="{icon}"]').get_attribute("aria-pressed") == "true"
            assert page.locator("#qrPreview svg path").count() >= 2
        with page.expect_download() as event:
            page.locator("#plateBtn").click()
        icon_plate = Path(directory) / "icon-plaque.stl"
        event.value.save_as(icon_plate)
        assert icon_plate.stat().st_size > 10000
        page.locator('[data-overlay="text"]').click()
        page.locator('[data-key="overlayText"]').fill("MENU")
        assert page.locator("#qrPreview text").text_content() == "MENU"

        page.locator('[data-overlay="image"]').click()
        svg = b'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="#2376de"/></svg>'
        page.locator("#imageUpload").set_input_files({"name": "znak.svg", "mimeType": "image/svg+xml", "buffer": svg})
        page.locator(".upload-thumb").wait_for()
        page.locator("#qrPreview image").wait_for()

        page.locator('[data-preview="paper"]').click()
        assert page.locator("#paperView").is_visible()
        page.locator('[data-preview="stand"]').click()
        assert page.locator("#standView").is_visible()

        for button, suffix in [("svgBtn", ".svg"), ("pngBtn", ".png"), ("plateBtn", ".stl"), ("baseBtn", ".stl")]:
            with page.expect_download() as event:
                page.locator(f"#{button}").click()
            download = event.value
            path = Path(directory) / (button + suffix)
            download.save_as(path)
            assert path.stat().st_size > 84
            if suffix == ".stl":
                data = path.read_bytes()
                assert len(data) == 84 + int.from_bytes(data[80:84], "little") * 50

        page.locator("#resetBtn").click()
        page.locator('[data-preview="qr"]').click()
        page.set_viewport_size({"width": 390, "height": 844})
        page.locator("#qrPreview svg").wait_for()
        page.screenshot(path=str(ROOT / "preview-mobile.png"), full_page=True)
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
        page.locator('[data-lang="en"]').click()
        page.locator("#printBtn").click()
        print_markup = page.locator("iframe").last.get_attribute("srcdoc")
        assert "size:A4" in print_markup and 'lang="en"' in print_markup
        assert "Scan the QR code" in print_markup and "MASTER QR MAKER" in print_markup
        unexpected = [url for url in requests if not url.startswith(f"http://127.0.0.1:{server.server_port}/") and not url.startswith(("blob:", "data:"))]
        assert not unexpected, unexpected
        browser.close()
        print("OK: przeglądarka, tryby, obraz SVG, podglądy, PNG/SVG/STL, mobile i brak ruchu zewnętrznego")
finally:
    server.shutdown()
    server.server_close()
