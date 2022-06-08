# install
npm install
npm install --global expo-cli

# start
npm run android

# Utworzenie pliku apk. 
expo build:android


W  pliku config.json należy wpisać adres ip serwera. 
Dla aplikacji mobilnej podany jest serwer na heroku ale może być on niedostępny z powodu limitu dla darmowego serwera na platformie. 
Pierwsze żądanie może chwilkę dłużej potrwać ponieważ serwer po dłuższym czasie nieaktywności zasypia.
Zaleca się wiec użycie lokalnego serwera, w tym celu należy podać w pliku config.json w zmiennej "apiUrl":"lokalny adres ip:8080" jak w przykładzie powyżej z tego pliku. 


aby uruchomić aplikację należy pobrać node.js w wersji v14.16.1
aby pobrać zależności należy uruchomić polecenie 
npm install

aby uruchomić aplikację na androidzie należy uruchomić emulator oraz wpisać polecenie
npm run android

Aplikację można zainstalować również własnym smartfonie. W przypadku połączenia lokalnego z serwerem należy pamiętać aby były w tej samej sieci. 
W przypadku korzystania z serwera na heroku ta czynność nie jest wymagana. 
Aby zainstalować taką aplikację na własnym telefonie należy umożliwić w ustawieniach telefonu instalowanie aplikacji z nieznanych źródeł. 


dane testowe do logowanie:
email:	test1@wp.pl
hasło:	zaq1@WSX

email:	test2@wp.pl
hasło:	zaq1@WSX


Testowane na urządzeniach:
Pixel 2 XL API 30 Android 11.0
Pixel 3a API 30 Android 11.0
