Kompilacja projektu odbywa sie za pomoca GNUMake'a. make all po prostu aliasuje
tsc --build, clean dokonuje rebiuld'a (oddaje zarowno kod zrodlowy (src/) jak i
zkompilowany do JS'a (dist/). Komenda `make validate` przygotowuje i odpala
testy. Wazne by uzyc wlasnie tej komendy, poniewaz wersja JS'a obslugujaca
'moduly' w przegladarce nie dziala z Node'em wiec przed odpaleniem Moch'i trzeba
dokonac zmian w zmiennych srodowiskowych i wskazac adres strony do odpalenia
testow Selenium.
