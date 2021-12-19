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
  * Black mode/White mode

# Aufbau der Website
Die Website wurde mithilfe von Html und Css gebaut. In der Section "Reservierung" und "Lieferung" ist JavaScript implementiert.
Bei der Reservierung werden die Daten in eine MongoDB Datenbank abgespeichert.
Bei der Lieferung wird zum Einen die Lieferzeit mithilfe der Google Java Script API berechnet. Zum Anderen wird die Bestellung anhand der ausgewählten Kriterien erfasst und dargestellt.

# Anleitung zur Section Reservierung

# Anleitung zur Section Lieferung
1. Erstellen sie einen API key für die Google Maps Java Script API. Weitere Infos finden Sie hier: https://developers.google.com/maps/documentation/javascript/get-api-key
2. Setzten Sie Ihren API key in die index.html Datei ein
<pre><code><script src="http://maps.googleapis.com/maps/api/js?key=ENTER_YOUR_API_KEY_HERE&libraries=places"></script></code></pre>

