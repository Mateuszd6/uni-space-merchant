Kompilacja projektu odbywa sie za pomoca GNUMake'a. `make all` po prostu
aliasuje tsc --build, clean usuwa wszystkie pliku .js by mozliwty byl pleny
rebiuld (oddaje zarowno kod zrodlowy (src/) jak i zkompilowany do JS'a
(dist/). Komenda `make validate` przygotowuje i odpala testy. Wazne by uzyc
wlasnie tej komendy, poniewaz wersja JS'a obslugujaca 'moduly' w przegladarce
nie dziala z Moch'a wiec przed odpaleniem Moch'i trzeba dokonac zmian w
zmiennych srodowiskowych i wskazac adres strony do odpalenia testow Selenium.

`make update` pobiera zaleznosci kozystajac z npm. Wszystkie potrzebne zaleznosci
do testow powinny pobrac sie automatycznie przy `make validate`.
