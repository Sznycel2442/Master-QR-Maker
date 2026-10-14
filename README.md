# Master QR Maker

Lokalna aplikacja do projektowania kodów QR, wydruków A4 i stojaków do druku 3D. Nie wymaga konta, backendu ani połączenia z internetem. Zawartość kodu, obrazy i pliki wynikowe są przetwarzane w przeglądarce.

Krótka instrukcja po polsku i angielsku: [manual.md](manual.md).

## Uruchomienie

Otwórz `index.html` w aktualnej przeglądarce. Jeśli przeglądarka ogranicza pobieranie plików ze stron `file://`, uruchom lokalny serwer w katalogu projektu:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Następnie otwórz `http://127.0.0.1:8765`. Serwer nasłuchuje tylko na Twoim komputerze. Nie ma zewnętrznych skryptów, fontów ani usług sieciowych.

## Funkcje

- Tryby: link, tekst, Wi-Fi, e-mail i kontakt vCard.
- Interfejs po polsku i angielsku; przełącznik PL/EN znajduje się w prawym górnym rogu.
- Własne kolory, podpis oraz znak w centrum kodu: tekst albo plik PNG, JPG, WEBP lub SVG. Obrazy są lokalnie zmniejszane i osadzane w pliku wynikowym.
- Podgląd kodu, kartki A4 i stojaka.
- Eksport PNG 1600 × 1600 px, SVG oraz wydruk A4.
- Dwa pliki STL: płytka z wypukłym kodem i podpisem oraz stopka ze szczeliną.

## Druk 3D

Płytkę drukuj płasko, kodem do góry. Grubość płytki to 3 mm; kod i podpis wystają o 0,8 mm. Stopka ma szczelinę 3,4 mm, aby pomieścić płytkę. Wymiary płytki rosną wraz z gęstością kodu, tak aby szerokość pojedynczego modułu wynosiła co najmniej 1,2 mm. Sprawdź wymiary pod podglądem i dopasuj je do pola roboczego drukarki.

Kontrast ma znaczenie: dla skanowalnego modelu zastosuj zmianę filamentu na warstwie wypukłych modułów lub pomaluj je ciemnym kolorem na jasnym tle. Obraz w centrum modelu jest progowany do dwukolorowej mozaiki. Drobne szczegóły zdjęcia mogą zniknąć. Przed drukiem seryjnym wydrukuj próbkę i zeskanuj ją telefonem. Eksport STL zawiera stykające się bryły; w slicerze włącz scalanie nakładających się objętości, jeśli program o to pyta.

## Prywatność

Strona nie zapisuje wprowadzonych danych i niczego nie wysyła do internetu. Lokalny serwer HTTP, jeśli go uruchomisz, tylko udostępnia pliki aplikacji na `127.0.0.1`. Dane wpisane do kodu QR są jawne dla każdego, kto zeskanuje gotowy kod.

## Biblioteka

Generator matrycy QR korzysta z lokalnie dołączonego [QRCode.js](https://github.com/davidshimjs/qrcodejs) (MIT). Dodano metodę zwracającą samą matrycę na potrzeby eksportu. Informacja licencyjna znajduje się w `vendor/LICENSE`.
