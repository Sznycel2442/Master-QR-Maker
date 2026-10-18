# Master QR Maker — krótka instrukcja / Quick guide

## Polski

1. Otwórz `index.html` w przeglądarce. Jeśli pobieranie plików z `file://` jest blokowane, uruchom w katalogu projektu `python -m http.server 8765 --bind 127.0.0.1` i wejdź na `http://127.0.0.1:8765`.
2. Wybierz typ kodu (link, tekst, Wi-Fi, e-mail lub kontakt), wpisz dane i opcjonalnie dodaj gotową ikonę, obraz albo napis w środku kodu. Przy Wi-Fi możesz pokazać SSID i hasło pod kodem oraz dopisać własny tekst. Język zmienisz przyciskiem PL/EN w prawym górnym rogu.
3. Opcjonalnie włącz NFC dla stojaka 3D, wybierz miejsce naklejki i wpisz jej średnicę oraz grubość. W slicerze ustaw pauzę tuż przed warstwą zamykającą kieszeń (sugerowane Z widoczne w interfejsie), włóż naklejkę i wznów druk.
4. Pobierz PNG lub SVG, wydrukuj kartkę A4 albo pobierz oba pliki STL: płytkę i stopkę. Przed użyciem zeskanuj próbny kod telefonem. Model 3D wymaga kontrastu między modułami a tłem.

**Prywatność i GitHub:** Generator działa w przeglądarce, bez konta i wysyłania treści kodu na serwer. Nie dodawaj do publicznego repozytorium wygenerowanych kodów zawierających rzeczywiste hasła Wi-Fi, prywatne linki ani dane kontaktowe. Foldery `private/`, `exports/`, `downloads/` i standardowe pliki eksportu są ignorowane przez Git.

## English

1. Open `index.html` in a browser. If downloads from `file://` are blocked, run `python -m http.server 8765 --bind 127.0.0.1` in the project directory and open `http://127.0.0.1:8765`.
2. Choose a QR type (link, text, Wi-Fi, email, or contact), enter the content, and optionally add a built-in icon, image, or text inside the code. For Wi-Fi, you can place the SSID, password, and extra text below the code. Use the PL/EN switch in the top right to change language.
3. Optionally enable NFC for the 3D stand, choose the sticker location, and enter its diameter and thickness. In your slicer, pause just before the pocket closes (the suggested Z is shown in the interface), insert the sticker, and resume printing.
4. Download PNG or SVG, print the A4 sheet, or download both STL files: the plaque and the base. Scan a sample with your phone before use. A 3D print needs contrast between the modules and background.

**Privacy and GitHub:** Generation runs in the browser without an account or sending QR content to a server. Do not commit generated codes containing real Wi-Fi passwords, private links, or contact details to a public repository. Git ignores `private/`, `exports/`, `downloads/`, and the standard export filenames.
