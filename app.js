(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const messages = {
    pl: {
      pageTitle: "Master QR Maker — generator kodów QR", pageDescription: "Generator kodów QR z personalizacją, wydrukiem A4 i modelami stojaków 3D.",
      workspace: "PRZESTRZEŃ ROBOCZA", tools: "Narzędzia", studio: "Studio QR", navCustomize: "Personalizacja", navExport: "Eksport",
      eyebrow: "KREATOR QR", heading: "Zaprojektuj swój kod QR", subheading: "Od cyfrowego linku po gotowy stojak — wszystko w jednym miejscu.", newProject: "Nowy projekt",
      section1Title: "Co chcesz zakodować?", section1Sub: "Wybierz typ i uzupełnij dane", section2Title: "Nadaj mu charakter", section2Sub: "Kolory, znak w środku i podpis", section3Title: "Przygotuj do użycia", section3Sub: "Wybierz format gotowego projektu",
      modeUrl: "Link", modeText: "Tekst", modeWifi: "Wi-Fi", modeEmail: "E-mail", modeContact: "Kontakt",
      centerMark: "Znak w centrum kodu", optional: "opcjonalnie", none: "Bez znaku", image: "Obraz", lettering: "Napis",
      darkColor: "Kolor kodu", lightColor: "Tło kodu", caption: "Podpis pod kodem", captionPlaceholder: "Np. Zeskanuj, aby otworzyć menu", defaultCaption: "Zeskanuj i odkryj więcej",
      helper: "Środek kodu ma ograniczony rozmiar. Przed drukiem zeskanuj gotowy projekt telefonem.",
      pngTitle: "Pobierz PNG", pngSub: "Wysoka rozdzielczość, 1600 × 1600 px", svgTitle: "Pobierz SVG", svgSub: "Wektor do dowolnego skalowania",
      printTitle: "Drukuj kartkę A4", printSub: "Gotowy układ z tytułem i kodem", plateTitle: "Pobierz płytkę STL", plateSub: "Wypukły kod QR i podpis", baseTitle: "Pobierz stopkę STL", baseSub: "Podstawka z dopasowaną szczeliną",
      previewKicker: "PODGLĄD NA ŻYWO", yourProject: "Twój projekt", live: "Na żywo", qrTab: "Kod QR", paperTab: "Kartka A4", standTab: "Stojak 3D",
      paperOverline: "POŁĄCZ SIĘ Z NAMI", scanQr: "Zeskanuj kod QR", matrixLabel: "ROZMIAR MATRYCY", eccLabel: "KOREKCJA BŁĘDÓW", eccValue: "Wysoka · H", modeLabel: "TYP KODU",
      standDimensions: "Podgląd poglądowy • płytka {width} × {height} mm + stopka {base} mm",
      tipTitle: "Mała wskazówka", tipText: "Do druku 3D użyj ciemnego filamentu dla wypukłych modułów i jasnego tła. Jednokolorowy wydruk może być trudny do zeskanowania.",
      urlLabel: "Adres strony", urlPlaceholder: "https://twojastrona.pl", urlHint: "Wpisz pełny adres zaczynający się od https:// lub http://.",
      textLabel: "Treść wiadomości", textPlaceholder: "Wpisz tekst do zakodowania", ssidLabel: "Nazwa sieci (SSID)", ssidPlaceholder: "Nazwa Wi-Fi",
      passwordLabel: "Hasło", passwordPlaceholder: "Hasło do sieci", securityLabel: "Zabezpieczenie", openNetwork: "Sieć otwarta", hiddenNetwork: "Sieć ukryta",
      emailLabel: "Adres e-mail", emailPlaceholder: "kontakt@firma.pl", subjectLabel: "Temat", subjectPlaceholder: "Temat wiadomości",
      bodyLabel: "Treść", bodyPlaceholder: "Opcjonalna wiadomość", nameLabel: "Imię i nazwisko", namePlaceholder: "Przykładowa Osoba",
      phoneLabel: "Telefon", phonePlaceholder: "000 000 000", contactEmailPlaceholder: "osoba@example.com", orgLabel: "Firma", optionalPlaceholder: "Opcjonalnie",
      chooseImage: "Wybierz obraz", imageHelp: "PNG, JPG, WEBP lub SVG • maks. 5 MB", overlayTextLabel: "Napis w centrum kodu", overlayTextPlaceholder: "Np. MENU",
      imageTooLarge: "Obraz może mieć maksymalnie 5 MB.", imageType: "Wybierz PNG, JPG, WEBP lub SVG.", invalidSvg: "Nieprawidłowy plik SVG.", imageAdded: "Obraz dodany do projektu.", imageLoadError: "Nie udało się wczytać obrazu.",
      urlRequired: "Wpisz adres strony.", urlInvalid: "Podaj poprawny adres URL.", urlProtocol: "Adres musi zaczynać się od http:// lub https://.",
      textRequired: "Wpisz tekst do zakodowania.", ssidRequired: "Wpisz nazwę sieci Wi-Fi.", passwordRequired: "Wpisz hasło lub wybierz sieć otwartą.",
      emailInvalid: "Podaj poprawny adres e-mail.", nameRequired: "Wpisz imię i nazwisko.", lowContrast: "Kontrast kolorów jest niski. Kod może być trudny do odczytania.",
      tooLong: "Treść jest za długa dla kodu QR z wysoką korekcją błędów.", svgSaved: "Pobrano plik SVG.", pngSaved: "Pobrano PNG 1600 × 1600 px.",
      pngError: "Nie udało się zapisać PNG.", plateSaved: "Pobrano płytkę STL.", baseSaved: "Pobrano stopkę STL.", projectReset: "Utworzono nowy projekt.",
      printDocument: "wydruk", printFooter: "Master QR Maker"
    },
    en: {
      pageTitle: "Master QR Maker — QR code generator", pageDescription: "Create custom QR codes, A4 prints and 3D stand models.",
      workspace: "WORKSPACE", tools: "Tools", studio: "QR Studio", navCustomize: "Customize", navExport: "Export",
      eyebrow: "QR CREATOR", heading: "Design your QR code", subheading: "From a digital link to a ready to print stand — all in one place.", newProject: "New project",
      section1Title: "What would you like to encode?", section1Sub: "Choose a type and enter the details", section2Title: "Make it yours", section2Sub: "Colors, center mark and caption", section3Title: "Ready to use", section3Sub: "Choose an output format",
      modeUrl: "Link", modeText: "Text", modeWifi: "Wi-Fi", modeEmail: "Email", modeContact: "Contact",
      centerMark: "Center mark", optional: "optional", none: "No mark", image: "Image", lettering: "Text",
      darkColor: "QR color", lightColor: "Background", caption: "Caption below the code", captionPlaceholder: "E.g. Scan to open the menu", defaultCaption: "Scan to discover more",
      helper: "Keep the center mark small. Scan the finished code with your phone before printing.",
      pngTitle: "Download PNG", pngSub: "High resolution, 1600 × 1600 px", svgTitle: "Download SVG", svgSub: "Scalable vector graphic",
      printTitle: "Print A4 sheet", printSub: "Ready layout with title and QR code", plateTitle: "Download plaque STL", plateSub: "Raised QR code and caption", baseTitle: "Download base STL", baseSub: "Stand with a fitted slot",
      previewKicker: "LIVE PREVIEW", yourProject: "Your design", live: "Live", qrTab: "QR code", paperTab: "A4 sheet", standTab: "3D stand",
      paperOverline: "CONNECT WITH US", scanQr: "Scan the QR code", matrixLabel: "MATRIX SIZE", eccLabel: "ERROR CORRECTION", eccValue: "High · H", modeLabel: "CODE TYPE",
      standDimensions: "Illustrative preview • plaque {width} × {height} mm + base {base} mm",
      tipTitle: "Quick tip", tipText: "For 3D printing, use a dark filament for the raised modules and a light background. A single color print may be hard to scan.",
      urlLabel: "Website URL", urlPlaceholder: "https://yourwebsite.com", urlHint: "Enter a full address starting with https:// or http://.",
      textLabel: "Message", textPlaceholder: "Enter text to encode", ssidLabel: "Network name (SSID)", ssidPlaceholder: "Wi-Fi name",
      passwordLabel: "Password", passwordPlaceholder: "Network password", securityLabel: "Security", openNetwork: "Open network", hiddenNetwork: "Hidden network",
      emailLabel: "Email address", emailPlaceholder: "hello@example.com", subjectLabel: "Subject", subjectPlaceholder: "Message subject",
      bodyLabel: "Message", bodyPlaceholder: "Optional message", nameLabel: "Full name", namePlaceholder: "Example Person",
      phoneLabel: "Phone", phonePlaceholder: "000 000 000", contactEmailPlaceholder: "person@example.com", orgLabel: "Company", optionalPlaceholder: "Optional",
      chooseImage: "Choose an image", imageHelp: "PNG, JPG, WEBP or SVG • max. 5 MB", overlayTextLabel: "Text in the center", overlayTextPlaceholder: "E.g. MENU",
      imageTooLarge: "The image must be 5 MB or smaller.", imageType: "Choose a PNG, JPG, WEBP or SVG file.", invalidSvg: "Invalid SVG file.", imageAdded: "Image added to the design.", imageLoadError: "Could not load the image.",
      urlRequired: "Enter a website URL.", urlInvalid: "Enter a valid URL.", urlProtocol: "The URL must start with http:// or https://.",
      textRequired: "Enter text to encode.", ssidRequired: "Enter the Wi-Fi network name.", passwordRequired: "Enter a password or choose an open network.",
      emailInvalid: "Enter a valid email address.", nameRequired: "Enter a full name.", lowContrast: "Color contrast is low. The code may be hard to scan.",
      tooLong: "The content is too long for a QR code with high error correction.", svgSaved: "SVG downloaded.", pngSaved: "PNG downloaded at 1600 × 1600 px.",
      pngError: "Could not save the PNG.", plateSaved: "Plaque STL downloaded.", baseSaved: "Base STL downloaded.", projectReset: "New project created.",
      printDocument: "print", printFooter: "Master QR Maker"
    }
  };
  const savedLanguage = (() => { try { return localStorage.getItem("masterQrLanguage"); } catch { return null; } })();
  let lang = savedLanguage === "en" ? "en" : "pl";
  const t = key => messages[lang][key] || key;
  const makeDefaults = locale => ({
    url: { url: "https://example.com" },
    text: { text: locale === "pl" ? "Witaj! To mój kod QR." : "Hello! This is my QR code." },
    wifi: { ssid: locale === "pl" ? "Moja sieć" : "My network", password: "", security: "WPA", hidden: false },
    email: { email: "kontakt@example.com", subject: locale === "pl" ? "Wiadomość z kodu QR" : "Message from a QR code", body: "" },
    contact: { name: locale === "pl" ? "Przykładowa Osoba" : "Example Person", phone: "000 000 000", email: "osoba@example.com", organization: "" }
  });
  let values = makeDefaults(lang);
  let mode = "url", overlay = "none", imageData = "", overlayImg = null, imageName = "";
  let matrix = null, qrSvg = "", renderTimer = 0, toastTimer = 0;
  const modeFields = $("modeFields");
  const overlayControls = $("overlayControls");
  const q = selector => document.querySelector?.(selector) || null;
  function applyLanguage() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    const description = q('meta[name="description"]');
    if (description) description.content = t("pageDescription");
    const staticText = [
      [".nav-label", "workspace"], [".breadcrumbs strong", "studio"],
      ['.sidebar nav a[href="#studio"] span', "studio"], ['.sidebar nav a[href="#personalizacja"] span', "navCustomize"], ['.sidebar nav a[href="#eksport"] span', "navExport"],
      [".page-heading p", "subheading"], [".editor-column > .panel:first-child .panel-head h2", "section1Title"], [".editor-column > .panel:first-child .panel-head p", "section1Sub"],
      ["#personalizacja .panel-head h2", "section2Title"], ["#personalizacja .panel-head p", "section2Sub"], ["#eksport .panel-head h2", "section3Title"], ["#eksport .panel-head p", "section3Sub"],
      ['[data-mode="url"] span', "modeUrl"], ['[data-mode="text"] span', "modeText"], ['[data-mode="wifi"] span', "modeWifi"], ['[data-mode="email"] span', "modeEmail"], ['[data-mode="contact"] span', "modeContact"],
      [".field-label .optional", "optional"], ['[data-overlay="none"]', "none"], ['[data-overlay="image"]', "image"], ['[data-overlay="text"]', "lettering"],
      [".colors-row .field:first-child > span:first-child", "darkColor"], [".colors-row .field:last-child > span:first-child", "lightColor"],
      [".helper-note span", "helper"], [".preview-kicker", "previewKicker"], [".preview-head h2", "yourProject"],
      ['[data-preview="qr"]', "qrTab"], ['[data-preview="paper"]', "paperTab"], ['[data-preview="stand"]', "standTab"],
      [".paper-overline", "paperOverline"], ["#paperTitle", "scanQr"],
      [".preview-meta > div:first-child > span", "matrixLabel"], [".preview-meta > div:nth-child(2) > span", "eccLabel"],
      [".preview-meta > div:nth-child(2) > strong", "eccValue"], [".preview-meta > div:nth-child(3) > span", "modeLabel"],
      [".tip-card strong", "tipTitle"], [".tip-card p", "tipText"]
    ];
    staticText.forEach(([selector, key]) => { const element = q(selector); if (element) element.textContent = t(key); });
    const breadcrumb = q(".breadcrumbs"); if (breadcrumb?.firstChild) breadcrumb.firstChild.textContent = t("tools") + " ";
    const eyebrow = q(".eyebrow"); if (eyebrow?.lastChild) eyebrow.lastChild.textContent = " " + t("eyebrow");
    const heading = q(".page-heading h1"); if (heading?.firstChild) heading.firstChild.textContent = t("heading");
    const markLabel = q(".field-label"); if (markLabel?.firstChild) markLabel.firstChild.textContent = t("centerMark") + " ";
    const reset = $("resetBtn"); if (reset?.lastChild) reset.lastChild.textContent = " " + t("newProject");
    const live = q(".live-pill"); if (live?.lastChild) live.lastChild.textContent = " " + t("live");
    const captionLabel = $("caption")?.parentElement?.querySelector("span");
    if (captionLabel) captionLabel.textContent = t("caption");
    $("caption").placeholder = t("captionPlaceholder");
    const exports = [
      ["pngBtn","pngTitle","pngSub"], ["svgBtn","svgTitle","svgSub"], ["printBtn","printTitle","printSub"],
      ["plateBtn","plateTitle","plateSub"], ["baseBtn","baseTitle","baseSub"]
    ];
    exports.forEach(([id,title,sub]) => {
      const button = $(id); if (!button?.querySelector) return;
      button.querySelector("strong").textContent = t(title);
      button.querySelector("span").textContent = t(sub);
    });
    document.querySelectorAll('[data-lang]').forEach(button => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    q(".type-grid")?.setAttribute("aria-label", lang === "pl" ? "Typ kodu QR" : "QR code type");
    q(".segmented")?.setAttribute("aria-label", lang === "pl" ? "Rodzaj znaku" : "Center mark type");
    q(".preview-tabs")?.setAttribute("aria-label", lang === "pl" ? "Rodzaj podglądu" : "Preview type");
    q(".sidebar nav")?.setAttribute("aria-label", lang === "pl" ? "Nawigacja główna" : "Main navigation");
    q(".editor-column")?.setAttribute("aria-label", lang === "pl" ? "Ustawienia generatora" : "Generator settings");
    q(".preview-column")?.setAttribute("aria-label", lang === "pl" ? "Podgląd projektu" : "Design preview");
    $("darkColor").setAttribute("aria-label", t("darkColor"));
    $("lightColor").setAttribute("aria-label", t("lightColor"));
    renderFields();
    renderOverlayControls();
  }
  function setLanguage(next) {
    if (next === lang) return;
    const oldDefaults = makeDefaults(lang), newDefaults = makeDefaults(next);
    for (const type of Object.keys(values)) for (const key of Object.keys(values[type])) {
      if (values[type][key] === oldDefaults[type][key]) values[type][key] = newDefaults[type][key];
    }
    if ($("caption").value === messages[lang].defaultCaption) $("caption").value = messages[next].defaultCaption;
    lang = next;
    try { localStorage.setItem("masterQrLanguage", lang); } catch {}
    applyLanguage();
  }

  const field = (label, key, value, opts = {}) => {
    const element = opts.multiline
      ? `<textarea data-key="${key}" placeholder="${opts.placeholder || ""}">${escapeHtml(value)}</textarea>`
      : `<input data-key="${key}" type="${opts.type || "text"}" value="${escapeHtml(value)}" placeholder="${opts.placeholder || ""}" ${opts.maxlength ? `maxlength="${opts.maxlength}"` : ""}>`;
    return `<label class="field"><span>${label}</span>${element}</label>`;
  };
  function escapeHtml(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }
  function renderFields() {
    const v = values[mode];
    const sections = {
      url: field(t("urlLabel"), "url", v.url, { type: "url", placeholder: t("urlPlaceholder") }) + `<p class="field-hint">${t("urlHint")}</p>`,
      text: field(t("textLabel"), "text", v.text, { multiline: true, placeholder: t("textPlaceholder") }),
      wifi: field(t("ssidLabel"), "ssid", v.ssid, { placeholder: t("ssidPlaceholder") }) + '<div class="field-row">' + field(t("passwordLabel"), "password", v.password, { placeholder: t("passwordPlaceholder") }) + `<label class="field"><span>${t("securityLabel")}</span><select data-key="security"><option value="WPA">WPA / WPA2 / WPA3</option><option value="WEP">WEP</option><option value="nopass">${t("openNetwork")}</option></select></label></div><label class="checkbox-field"><input type="checkbox" data-key="hidden"> ${t("hiddenNetwork")}</label>`,
      email: field(t("emailLabel"), "email", v.email, { type: "email", placeholder: t("emailPlaceholder") }) + field(t("subjectLabel"), "subject", v.subject, { placeholder: t("subjectPlaceholder") }) + field(t("bodyLabel"), "body", v.body, { multiline: true, placeholder: t("bodyPlaceholder") }),
      contact: '<div class="field-row">' + field(t("nameLabel"), "name", v.name, { placeholder: t("namePlaceholder") }) + field(t("phoneLabel"), "phone", v.phone, { type: "tel", placeholder: t("phonePlaceholder") }) + '</div>' + field(t("emailLabel"), "email", v.email, { type: "email", placeholder: t("contactEmailPlaceholder") }) + field(t("orgLabel"), "organization", v.organization, { placeholder: t("optionalPlaceholder") })
    };
    modeFields.innerHTML = sections[mode];
    if (mode === "wifi") {
      modeFields.querySelector('[data-key="security"]').value = v.security;
      modeFields.querySelector('[data-key="hidden"]').checked = v.hidden;
    }
    modeFields.querySelectorAll("[data-key]").forEach(el => el.addEventListener(el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input", () => {
      values[mode][el.dataset.key] = el.type === "checkbox" ? el.checked : el.value;
      queueRender();
    }));
    queueRender();
  }
  function renderOverlayControls() {
    if (overlay === "image") {
      overlayControls.innerHTML = `<label class="upload-zone"><svg><use href="#i-image"/></svg><span><strong>${imageName ? escapeHtml(imageName) : t("chooseImage")}</strong><small>${t("imageHelp")}</small></span>${imageData ? `<img class="upload-thumb" src="${imageData}" alt="">` : ""}<input id="imageUpload" type="file" accept=".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml" aria-label="${t("chooseImage")}"></label>`;
      $("imageUpload").addEventListener("change", handleImage);
    } else if (overlay === "text") {
      overlayControls.innerHTML = field(t("overlayTextLabel"), "overlayText", window.overlayText || "QR", { maxlength: 12, placeholder: t("overlayTextPlaceholder") });
      overlayControls.querySelector("input").addEventListener("input", e => { window.overlayText = e.target.value; queueRender(); });
    } else overlayControls.innerHTML = "";
    queueRender();
  }
  async function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast(t("imageTooLarge"));
    if (!["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.type)) return toast(t("imageType"));
    try {
      let source = await file.text();
      let url;
      if (file.type === "image/svg+xml") {
        const doc = new DOMParser().parseFromString(source, "image/svg+xml");
        if (doc.querySelector("parsererror") || doc.documentElement.localName !== "svg") throw Error(t("invalidSvg"));
        doc.querySelectorAll("script,foreignObject,iframe,object,embed,link").forEach(n => n.remove());
        doc.querySelectorAll("style").forEach(n => {
          n.textContent = n.textContent.replace(/@import[^;]+;/gi, "").replace(/url\(\s*['"]?(?:https?:|\/\/)[^)]*\)/gi, "none");
        });
        doc.querySelectorAll("*").forEach(node => [...node.attributes].forEach(a => {
          const href = /(?:^|:)href$/i.test(a.name), value = a.value.trim();
          const safeRef = value.startsWith("#") || /^data:image\/(?:png|jpeg|webp);base64,/i.test(value);
          if (/^on/i.test(a.name) || (href && !safeRef) || /url\(\s*['"]?(?:https?:|\/\/)/i.test(value)) node.removeAttribute(a.name);
        }));
        source = new XMLSerializer().serializeToString(doc.documentElement);
        url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
      } else url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      await img.decode();
      const canvas = document.createElement("canvas"); canvas.width = canvas.height = 512;
      const ctx = canvas.getContext("2d");
      const scale = Math.min(512 / img.width, 512 / img.height);
      ctx.drawImage(img, (512 - img.width * scale) / 2, (512 - img.height * scale) / 2, img.width * scale, img.height * scale);
      URL.revokeObjectURL(url);
      imageData = canvas.toDataURL("image/png");
      overlayImg = new Image(); overlayImg.src = imageData; await overlayImg.decode();
      imageName = file.name;
      renderOverlayControls();
      toast(t("imageAdded"));
    } catch (err) { toast(t("imageLoadError")); }
  }
  const wifiEscape = s => String(s).replace(/([\\;,:"'])/g, "\\$1");
  const vcardEscape = s => String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
  function payload() {
    const v = values[mode];
    if (mode === "url") {
      if (!v.url.trim()) throw Error(t("urlRequired"));
      let u; try { u = new URL(v.url.trim()); } catch { throw Error(t("urlInvalid")); }
      if (!["http:", "https:"].includes(u.protocol)) throw Error(t("urlProtocol"));
      return u.href;
    }
    if (mode === "text") { if (!v.text.trim()) throw Error(t("textRequired")); return v.text; }
    if (mode === "wifi") {
      if (!v.ssid.trim()) throw Error(t("ssidRequired"));
      if (v.security !== "nopass" && !v.password) throw Error(t("passwordRequired"));
      return `WIFI:T:${v.security};S:${wifiEscape(v.ssid)};P:${wifiEscape(v.password)};H:${v.hidden ? "true" : "false"};;`;
    }
    if (mode === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) throw Error(t("emailInvalid"));
      const params = [];
      if (v.subject) params.push("subject=" + encodeURIComponent(v.subject));
      if (v.body) params.push("body=" + encodeURIComponent(v.body));
      return `mailto:${v.email.trim()}${params.length ? "?" + params.join("&") : ""}`;
    }
    if (!v.name.trim()) throw Error(t("nameRequired"));
    return ["BEGIN:VCARD", "VERSION:3.0", `FN:${vcardEscape(v.name)}`, v.phone ? `TEL:${vcardEscape(v.phone)}` : "", v.email ? `EMAIL:${vcardEscape(v.email)}` : "", v.organization ? `ORG:${vcardEscape(v.organization)}` : "", "END:VCARD"].filter(Boolean).join("\r\n");
  }
  function queueRender() { clearTimeout(renderTimer); renderTimer = setTimeout(render, 80); }
  function contrast(a, b) {
    const lum = hex => { const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
    const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
  }
  function render() {
    try {
      const data = payload();
      matrix = QRCode.getMatrix(data, QRCode.CorrectLevel.H).map(row => row.map(Boolean));
      qrSvg = makeSvg(matrix, $("darkColor").value, $("lightColor").value);
      $("qrPreview").innerHTML = qrSvg;
      $("paperQr").innerHTML = qrSvg;
      $("standQr").innerHTML = qrSvg;
      const caption = $("caption").value.trim();
      $("qrCaption").textContent = caption;
      $("paperCaption").textContent = caption;
      $("standCaption").textContent = caption;
      $("matrixSize").textContent = `${matrix.length} × ${matrix.length}`;
      const {width,height}=dimensions();
      $("standDimensions").textContent = t("standDimensions").replace("{width}", Math.round(width)).replace("{height}", Math.round(height)).replace("{base}", Math.round(width+10));
      $("modeMeta").textContent = t("mode" + mode[0].toUpperCase() + mode.slice(1));
      const lowContrast = contrast($("darkColor").value, $("lightColor").value) < 4.5;
      $("inputError").hidden = !lowContrast;
      $("inputError").textContent = lowContrast ? t("lowContrast") : "";
      setExportsDisabled(false);
    } catch (err) {
      matrix = null; qrSvg = "";
      ["qrPreview", "paperQr", "standQr"].forEach(id => $(id).innerHTML = "");
      $("matrixSize").textContent = "—";
      $("inputError").hidden = false;
      $("inputError").textContent = /overflow|Too long data/i.test(err.message) ? t("tooLong") : err.message;
      setExportsDisabled(true);
    }
  }
  function setExportsDisabled(value) { ["pngBtn", "svgBtn", "printBtn", "plateBtn", "baseBtn"].forEach(id => $(id).disabled = value); }
  function makeSvg(modules, dark, light) {
    const n = modules.length, size = n + 8;
    let path = "";
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (modules[y][x]) path += `M${x + 4} ${y + 4}h1v1h-1z`;
    let mark = "";
    if (overlay === "image" && imageData) {
      const s = n * .235, p = (size - s) / 2, inset = s * .12;
      mark = `<rect x="${p}" y="${p}" width="${s}" height="${s}" rx="${s * .14}" fill="${light}"/><image href="${imageData}" x="${p + inset}" y="${p + inset}" width="${s - 2 * inset}" height="${s - 2 * inset}" preserveAspectRatio="xMidYMid meet"/>`;
    } else if (overlay === "text" && (window.overlayText || "").trim()) {
      const txt = (window.overlayText || "").trim(), s = n * .235, p = (size - s) / 2, fs = Math.min(s * .43, s * 1.3 / Math.max(txt.length, 2));
      mark = `<rect x="${p}" y="${p}" width="${s}" height="${s}" rx="${s * .14}" fill="${light}"/><text x="${size / 2}" y="${size / 2}" dominant-baseline="central" text-anchor="middle" fill="${dark}" font-family="Arial,sans-serif" font-weight="800" font-size="${fs}">${escapeHtml(txt)}</text>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}" role="img" aria-label="${t("qrTab")}"><rect width="${size}" height="${size}" fill="${light}"/><path fill="${dark}" d="${path}"/>${mark}</svg>`;
  }
  function download(blob, name) {
    const a = document.createElement("a"), url = URL.createObjectURL(blob);
    a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function toast(message) { const el = $("toast"); el.textContent = message; el.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 3200); }
  function saveSvg() { if (!matrix) return; download(new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" }), "master-qr-maker.svg"); toast(t("svgSaved")); }
  async function savePng() {
    if (!matrix) return;
    const img = new Image(), url = URL.createObjectURL(new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" }));
    try {
      img.src = url; await img.decode();
      const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1600;
      canvas.getContext("2d").drawImage(img, 0, 0, 1600, 1600);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw Error();
      download(blob, "master-qr-maker.png"); toast(t("pngSaved"));
    } catch { toast(t("pngError")); }
    finally { URL.revokeObjectURL(url); }
  }
  function printPage() {
    if (!matrix) return;
    const caption = escapeHtml($("caption").value.trim());
    const doc = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Master QR Maker — ${t("printDocument")}</title><style>@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;color:#173556}.page{width:210mm;height:297mm;padding:20mm;position:relative;text-align:center}.bar{position:absolute;top:0;left:0;right:0;height:3mm;background:#2177dc}.brand{text-align:left;font-size:10pt;font-weight:bold;letter-spacing:2px;color:#7088a2}.content{margin-top:35mm}.over{font-size:9pt;color:#2177dc;letter-spacing:3px;font-weight:bold}h1{font-size:27pt;margin:7mm 0 15mm}.qr{width:110mm;height:110mm;margin:auto}.qr svg{width:100%;height:100%}.caption{font-size:14pt;font-weight:bold;margin:15mm 0}.foot{position:absolute;bottom:18mm;left:0;right:0;color:#9caec0;font-size:8pt}</style></head><body><div class="page"><div class="bar"></div><div class="brand">⌗ MASTER QR MAKER</div><div class="content"><div class="over">${t("paperOverline")}</div><h1>${t("scanQr")}</h1><div class="qr">${qrSvg}</div><div class="caption">${caption}</div></div><div class="foot">${t("printFooter")}</div></div><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),300));<\/script></body></html>`;
    const frame = document.createElement("iframe");
    frame.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none";
    document.body.append(frame);
    frame.srcdoc = doc;
    setTimeout(() => frame.remove(), 60000);
  }
  function addTriangle(list, a, b, c) {
    const u = b.map((v, i) => v - a[i]), v = c.map((w, i) => w - a[i]);
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const len = Math.hypot(...n) || 1; list.push([n.map(x => x / len), a, b, c]);
  }
  function addQuad(list, a, b, c, d) { addTriangle(list, a, b, c); addTriangle(list, a, c, d); }
  function addBox(list, x0, y0, z0, x1, y1, z1) {
    if (x1 <= x0 || y1 <= y0 || z1 <= z0) return;
    const a=[x0,y0,z0],b=[x1,y0,z0],c=[x1,y1,z0],d=[x0,y1,z0],e=[x0,y0,z1],f=[x1,y0,z1],g=[x1,y1,z1],h=[x0,y1,z1];
    addQuad(list,d,c,b,a); addQuad(list,e,f,g,h); addQuad(list,a,b,f,e); addQuad(list,b,c,g,f); addQuad(list,c,d,h,g); addQuad(list,d,a,e,h);
  }
  function stlBlob(triangles) {
    const buf = new ArrayBuffer(84 + triangles.length * 50), view = new DataView(buf);
    const title = new TextEncoder().encode("Master QR Maker - 3D model");
    new Uint8Array(buf, 0, title.length).set(title);
    view.setUint32(80, triangles.length, true); let off = 84;
    for (const [normal,a,b,c] of triangles) {
      for (const point of [normal,a,b,c]) for (const coord of point) { view.setFloat32(off, coord, true); off += 4; }
      view.setUint16(off, 0, true); off += 2;
    }
    return new Blob([buf], { type: "model/stl" });
  }
  function dimensions() {
    const qrMm = Math.max(76, (matrix.length + 8) * 1.2);
    const width = qrMm + 24, height = qrMm + 48;
    return { qrMm, width, height };
  }
  function addRasterText(list, text, x, y, width, height, z, depth) {
    if (!text) return;
    const canvas = document.createElement("canvas"); canvas.width = 160; canvas.height = 32;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000"; ctx.font = "bold 23px Arial,sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(text, 80, 16, 154);
    const pixels = ctx.getImageData(0, 0, 160, 32).data, sx = width / 160, sy = height / 32;
    for (let row = 0; row < 32; row++) {
      let start = -1;
      for (let col = 0; col <= 160; col++) {
        const on = col < 160 && pixels[(row * 160 + col) * 4 + 3] > 130;
        if (on && start < 0) start = col;
        if ((!on || col === 160) && start >= 0) {
          addBox(list, x + start * sx, y + (31 - row) * sy, z, x + col * sx, y + (32 - row) * sy, z + depth);
          start = -1;
        }
      }
    }
  }
  function markBitmap() {
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (overlay === "image" && overlayImg) ctx.drawImage(overlayImg, 2, 2, 28, 28);
    else if (overlay === "text") {
      ctx.fillStyle = "#000"; ctx.font = "bold 17px Arial,sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText((window.overlayText || "").trim(), 16, 16, 29);
    }
    const data = ctx.getImageData(0, 0, 32, 32).data;
    return Array.from({length:32},(_,y)=>Array.from({length:32},(_,x)=>{
      const i=(y*32+x)*4, alpha=data[i+3]/255, gray=(data[i]*.299+data[i+1]*.587+data[i+2]*.114);
      return alpha>.4 && gray<235;
    }));
  }
  function makePlate() {
    const tris=[], {qrMm,width,height}=dimensions(), n=matrix.length, unit=qrMm/(n+8), left=12, bottom=36;
    addBox(tris,0,0,0,width,height,3);
    const patchSize=n*.235, p0=(n-patchSize)/2, p1=(n+patchSize)/2;
    for (let y=0;y<n;y++) for(let x=0;x<n;x++) {
      if(!matrix[y][x])continue;
      if(overlay!=="none" && ((overlay==="image" && imageData) || (overlay==="text" && (window.overlayText||"").trim())) && x>=p0&&x<p1&&y>=p0&&y<p1)continue;
      const xx=left+(x+4)*unit, yy=bottom+(n+3-y)*unit;
      addBox(tris,xx,yy,3,xx+unit,yy+unit,3.8);
    }
    if (overlay !== "none" && ((overlay==="image" && imageData) || (overlay==="text" && (window.overlayText||"").trim()))) {
      const s=qrMm*.235, x0=left+(qrMm-s)/2, y0=bottom+(qrMm-s)/2, bits=markBitmap(), pixel=s/32;
      for(let row=0;row<32;row++)for(let col=0;col<32;col++)if(bits[row][col])addBox(tris,x0+col*pixel,y0+(31-row)*pixel,3,x0+(col+1)*pixel,y0+(32-row)*pixel,3.8);
    }
    addRasterText(tris,$("caption").value.trim(),10,11,width-20,17,3,.8);
    return stlBlob(tris);
  }
  function makeBase() {
    const tris=[],{width}=dimensions(), bw=width+10, depth=45, slot=3.4, center=depth/2;
    addBox(tris,0,0,0,bw,depth,4);
    addBox(tris,3,center-slot/2-5,4,bw-3,center-slot/2,14);
    addBox(tris,3,center+slot/2,4,bw-3,center+slot/2+5,14);
    return stlBlob(tris);
  }
  function savePlate(){ if(!matrix)return; download(makePlate(),"master-qr-maker-plaque.stl"); toast(t("plateSaved")); }
  function saveBase(){ if(!matrix)return; download(makeBase(),"master-qr-maker-base.stl"); toast(t("baseSaved")); }

  document.querySelectorAll(".type-option").forEach(button => button.addEventListener("click", () => {
    mode = button.dataset.mode;
    document.querySelectorAll(".type-option").forEach(b => { b.classList.toggle("active", b===button); b.setAttribute("aria-pressed", String(b===button)); });
    renderFields();
  }));
  document.querySelectorAll(".segment").forEach(button => button.addEventListener("click", () => {
    overlay = button.dataset.overlay;
    document.querySelectorAll(".segment").forEach(b => b.classList.toggle("active", b===button));
    renderOverlayControls();
  }));
  document.querySelectorAll(".preview-tab").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".preview-tab").forEach(b => { b.classList.toggle("active", b===button); b.setAttribute("aria-selected", String(b===button)); });
    document.querySelectorAll(".preview-view").forEach(v => v.classList.toggle("active", v.id===button.dataset.preview+"View"));
  }));
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  const navItems = [...document.querySelectorAll(".sidebar nav .nav-item")];
  let navLockUntil = 0;
  function setNavActive(id) {
    navItems.forEach(item => {
      const active = item.getAttribute("href") === "#" + id;
      item.classList.toggle("active", active);
      if (active) item.setAttribute("aria-current", "location");
      else item.removeAttribute("aria-current");
    });
  }
  navItems.forEach(item => item.addEventListener("click", () => {
    navLockUntil = Date.now() + 900;
    setNavActive(item.getAttribute("href").slice(1));
  }));
  let scrollFrame = 0;
  window.addEventListener?.("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (Date.now() < navLockUntil) return;
      let active = "studio";
      for (const id of ["personalizacja", "eksport"]) if ($(id).getBoundingClientRect().top <= 170) active = id;
      setNavActive(active);
    });
  }, { passive: true });
  if (["studio", "personalizacja", "eksport"].includes(window.location?.hash?.slice(1))) setNavActive(window.location.hash.slice(1));
  ["darkColor","lightColor"].forEach(id => $(id).addEventListener("input", () => { $(id==="darkColor"?"darkHex":"lightHex").textContent=$(id).value.toUpperCase(); queueRender(); }));
  $("caption").addEventListener("input", queueRender);
  $("svgBtn").addEventListener("click", saveSvg);
  $("pngBtn").addEventListener("click", savePng);
  $("printBtn").addEventListener("click", printPage);
  $("plateBtn").addEventListener("click", savePlate);
  $("baseBtn").addEventListener("click", saveBase);
  $("resetBtn").addEventListener("click", () => {
    values=makeDefaults(lang); mode="url"; overlay="none"; imageData=""; imageName=""; overlayImg=null; window.overlayText="QR";
    $("darkColor").value="#173556"; $("lightColor").value="#ffffff"; $("darkHex").textContent="#173556"; $("lightHex").textContent="#FFFFFF";
    $("caption").value=t("defaultCaption");
    document.querySelectorAll(".type-option").forEach(b=>{b.classList.toggle("active",b.dataset.mode==="url");b.setAttribute("aria-pressed",String(b.dataset.mode==="url"));});
    document.querySelectorAll(".segment").forEach(b=>b.classList.toggle("active",b.dataset.overlay==="none"));
    renderFields(); renderOverlayControls(); toast(t("projectReset"));
  });
  window.overlayText="QR";
  if (lang === "en" && $("caption").value === messages.pl.defaultCaption) $("caption").value = t("defaultCaption");
  applyLanguage();
})();
