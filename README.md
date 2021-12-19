# Restaurant_API_website

Features:


**Must-have**
* Suchbegriffe eingeben
  * Lieferzeit des Filters berechnen
  * Bestellung ansehen
* Suche filtern
  * Menu Filtern durch Checkbox (Jede Speise hat unterschiedliche Zubereitungszeiten)
  * Lieferungsart Filtern durch Auswahlliste (Auswahl ob Lieferung per Auto, Fahrrad oder ÖV benutzt werden soll)
* Asynchrone Suche im Hintergrund
  * Lieferzeit berechnen
* Erscheinung der Suchergebnisse
  * Bestellung ansehen
* Ein und Ausblendung der Suchergebnisse
  * Bestellung ansehen

 
 **Nice-to-have**

* Speicherung der Datenbank
  * Speicherung der Reservierungen
  * Mit Mongo DB Cloud
* Responsive Design
  * Dark mode/light mode

# Aufbau der Website
Die Website wurde mithilfe von HTML und CSS gebaut. In der Section "Reservierung" und "Lieferung" ist JavaScript implementiert. (in Folder FINAL)
Bei der Reservierung werden die Daten in eine MongoDB Datenbank abgespeichert.
Bei der Lieferung wird zum Einen die Lieferzeit mithilfe der Google Java Script API berechnet. Zum Anderen wird die Bestellung anhand der ausgewählten Kriterien erfasst und dargestellt.

# Anleitung zur Section Reservierung/MongoDB
Bei dem Teil Reservierung in MongoDB speichern einer der "Nice to have" Features, muss die *indexDB.html* Datei verwendet werden. Das liegt daran, dass script.js und index.html nicht mit mongoDB.js kompatibel sind.

Gehen Sie wie folgt vor:

1. Kommando in Terminal eingeben

cd desktop (Oder lokal ordner path)
<br>
cd RestaurantProject
<br>
npm init
<br>
npm i express mongoose body-parser
<br>
npx nodemon mongoDB.js

2.  http://localhost:3000/ öffen
Bestellung eingeben und abschicken 


3.  https://cloud.mongodb.com/v2/61a62d6661f41678a4d8e404#metrics/replicaSet/61a62e6d077eb037f7b6d8ba/explorer/ClusterWDS20A/orders/find

oder  
<br>
in MongoDB compass App/ New Connection/ mongodb+srv://FusionEat:FusionEat@clusterwds20a.h2osc.mongodb.net/clusterwds20a  eingeben 

4.  Bestellung in Cloud Mongodb / MongoDB compass einsehen



# Anleitung zur Section Lieferung
1. Erstellen sie einen API key für die Google Maps Java Script API. Weitere Infos finden Sie hier: https://developers.google.com/maps/documentation/javascript/get-api-key
2. Setzten Sie Ihren API key in die index.html Datei ein
<pre><code><script src="http://maps.googleapis.com/maps/api/js?key=ENTER_YOUR_API_KEY_HERE&libraries=places"></script></code></pre>

