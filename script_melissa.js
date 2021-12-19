
   
//Konstanten von html dokument festlegen
const lieferung = document.getElementById('lieferung');

//Die Ausgewählten Menus erfassen
const ordered_menus = [];
const no_menus_ordered = false
for (let i = 0; i < 6; i++) {
  if (document.getElementById("asian_check").checked && !ordered_menus.some(ordered_menus => ordered_menus.menu == "Asian Fusion")) {
    ordered_menus.push({
      menu:   "Asian Fusion",
      prep_time: 60,
      price: 22
  })
  } else if (document.getElementById("arabic_check").checked && !ordered_menus.some(ordered_menus => ordered_menus.menu == "Arabic Fusion"))  {
    ordered_menus.push({
      menu:   "Arabic Fusion",
      prep_time: 50,
      price: 18
  })
  } else if (document.getElementById("african_check").checked && !ordered_menus.some(ordered_menus => ordered_menus.menu == "African Fusion")) {
    ordered_menus.push({
      menu:   "African Fusion",
      prep_time: 40,
      price: 20
  })
  } else if (document.getElementById("latin_check").checked && !ordered_menus.some(ordered_menus => ordered_menus.menu == "Latin Fusion")) {
    ordered_menus.push({
      menu:   "Latin Fusion",
      prep_time: 30,
      price: 20
  })
  } else if (document.getElementById("other_check").checked && !ordered_menus.some(ordered_menus => ordered_menus.menu == "Other Fusion")) {
    ordered_menus.push({
      menu:   "Other Fusion",
      prep_time: 20,
      price: 21
  })
  } else if (document.getElementById("european_check").checked && !ordered_menus.some(ordered_menus => ordered_menus.menu == "European Fusion")) {
    ordered_menus.push({
      menu:   "European Fusion",
      prep_time: 70,
      price: 15
  })
  }else {
    const no_menus_ordered = true
  }
  }

//Die eigegebene Lieferadresse speichern  
const search_input_lieferadresse = document.getElementById('lieferadresse')
const zieladresse = "Rotzingen 45 79733 Görwihl"

//Die Adresse von Fusion Eat speichern
const fusion_eat_adress = "Hangstraße 46-50 Loerrach, 79539 BW, DE";

//Berechnung des Preises
const total_price_calculation = ordered_menus.reduce((n, {price}) => n + price, 0)

//Berechung der Zubereitungszeit
const total_prep_time_calcualtion = ordered_menus.reduce((n, {prep_time}) => n + prep_time, 0)

//Button zur Berechnung der Lieferzeit
const calculate_button = document.getElementById('calculate_button')

//Button zur Anzeige der Bestellung
const view_button = document.getElementById('view_button')

//Button zum Abschicken der Bestellung
const send_button = document.getElementById('send_button')

//API laden - Async Methode (don't work for Google APIs)
async function loadData(api_key, destination, origin) {
  const url = `${maps_url}?key=${api_key}&destinations=${destination}&origins=${origin}`;
  const data = await fetch(url);
  if (!url.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const json = await data.text();
  const minutesToDestination = json.rows[0].elements[0].duration.value;
  
}

//API laden- Google Methode
const directionsService = new google.maps.DistanceMatrixService();

function getDuration() {

  const option = {
    origins: [`"${fusion_eat_adress}"`],
    destinations: [`"${search_input_lieferadresse.value}"`],
    travelMode: "DRIVING",
  };

  directionsService.getDistanceMatrix(option, result); }

  function result(response, status) {
    if (status != "OK") {
      const total_time = document.createElement('div');
      total_time.classList.add('section_delivery');
      total_time.innerHTML = `<div class="total_time">Something went wrong</div>`;
      
      lieferung.appendChild(total_time);
      return;
    } else {
      // die Ergebnisse anhand des JSON Aufbaus sichern
      let results = response.rows[0].elements;
      let element = results[0];
      const delivery_min = element.duration.text.replace(/\D/g,'') //Mit dieser Konstanten erhalten wir den Wert für die Auslieferungsdauer - da der Rückgabewerte eine Kombination aus Zahl und String ist, wird mit Regex alle Buchstaben entfehrnt
      //Berechnung der insgesamten Lieferzeit mit Zubereitungszeit und Auslieferungsdauer
      const total_delivery_time = total_prep_time_calcualtion + Number(delivery_min);

      //Aufteilung in Stunden und Minuten zur schöneren Darstellung
      const hours = Math.floor(total_delivery_time / 60);          
      const minutes = total_delivery_time % 60;

      //Das Ergebnis in Html darstellen
      const total_time = document.createElement('div');
      total_time.classList.add('section_delivery');
      total_time.innerHTML = `<div id= "delivery_time" class="total_time"> Deine Bestellung wird in ${hours} Stunden und ${minutes} Minuten geliefert. </div>`;
      
      lieferung.appendChild(total_time);
  }
  }
  
//Die Bestellung in Html erstellen
function create_new_order(id,menus, price,adress, prep_time_total) {
    const new_order = document.createElement('div');
    new_order.classList.add('bestellansicht');

    new_order.innerHTML = `
    <div id = "orders" class = "orders">
    <div class="order_id">Bestellnummer: ${id}</div>
    </br>
      <div class="order_info">
        <span>
          <span class="menus">Menus: ${menus}</span>
          </br>
          </br>
          <span class="price"> Preis gesamt: ${price}</span>
          </br>
          <span class="adresse">Adresse: ${adress}</span>
          </br>
          <span class="zubereitungszeit"> Zubereitungszeit: ${prep_time_total}</span>
        </span>
    </div>
    </div>
    
  `;
  lieferung.appendChild(new_order);
  
}

//Hide Button erfassen
const hide_button = document.getElementById("hide_button")

//eine Option erstellen die Bestellung ein- oder auszublenden
function HideDiv() {
  var v = document.getElementById('orders');
  if (v.style.display === "none") {
     v.style.display = "block";
  } else {
     v.style.display = "none";
  }
  window.location.reload() //load the page new to enable to create new orders
} 

//Funktion zur Benachrichtigung, dass die Bestellung versendet wurde
function send_alert () {
  alert("Ihre Bestellung wurde erfolgreich zugestellt. Vielen Dank und Guten Appetitt!")
}


//Die Parameter für für die funktion create_new_order defninieren
function doSearch() {
    const order_id = Date.now().toString(36) + Math.random().toString(36);
    const order_menus = JSON.stringify(ordered_menus, null, 2).replace(/[^a-zA-Z ]/g, "").split("menu").join("").split("preptime").join("|").split("price").join("") //make Menus pretty
    const total_price =  total_price_calculation + " €";
    const order_adress= search_input_lieferadresse.value;
    const preptime_total = total_prep_time_calcualtion + " Minuten";
    create_new_order(order_id, order_menus, total_price, order_adress, preptime_total);
  };



//Funktionen per Klick ausführen
calculate_button.addEventListener('click', getDuration); //Berechnung der Lieferzeit
view_button.addEventListener('click', doSearch); //Bestellung anzeigen
hide_button.addEventListener('click', HideDiv) //Bestellung ausblenden
send_button.addEventListener('click', send_alert)

function changeMode() {
    var element = document.body;
    element.classList.toggle("change-mode");
    }
  
