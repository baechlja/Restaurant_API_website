//API url festlegen
const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json";

//API Parameter festlegen
const Startort = "Hangstraße 46-50 Loerrach, 79539 BW, DE";
const Zielort = "Rotzingen 45, Goerwihl 79733 BW, DE "

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
  } else if (document.getElementById("european_check").checked && !ordered_menus.some(ordered_menus => ordered_menus.menu !== "European Fusion")) {
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

//Berechnung des Preises
const total_price_calculation = ordered_menus.reduce((n, {price}) => n + price, 0)

//Berechung der Zubereitungszeit
const total_prep_time_calcualtion = ordered_menus.reduce((n, {prep_time}) => n + prep_time, 0)

//Button zur Berechnung der Lieferzeit
const calculate_button = document.getElementById('calculate_button')

//Button zur Anzeige der Bestellung
const view_button = document.getElementById('view_button')

//API laden
async function loadData(api_key, destination, origin) {
  const url = `${maps_url}?key=${api_key}&destinations=${destination}&origins=${origin}`;
  const data = await fetch(url);
  const json = await data.json();
  //const delivery_time = json["rows"][1]["duration"]["text"]
  console.log(json)
}

//calculate the total delivery_time
async function calculate_total_delivery_time (){
  const delivery_time =  await this.loadData("enter you API key here","Rotzingen 45 79733 Goerwihl BW, DE", "Hangstraße 46-50 Loerrach, 79539 BW, DE")

  return delivery_time
}

//Die Bestellung in Html erstellen
async function create_new_order(id,menus, price,adress, prep_time_total, delivery_time_total) {
    const new_order = document.createElement('div');
    new_order.classList.add('bestellansicht');

    new_order.innerHTML = `
    <div class = "orders">
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
          </br>
          <span class="lieferzeit">Lieferzeit: ${delivery_time_total}</span>
        </span>
    </div>
    </div>
    
  `;
  lieferung.appendChild(new_order);
}

//eine Option erstellen die Bestellung ein- oder auszublenden
function showOrHideDiv(div_id) {
  var v = document.getElementById(div_id);
  if (v.style.display === "none") {
     v.style.display = "block";
  } else {
     v.style.display = "none";
  }
}

//Die Lieferzeit in Html erstellen
async function create_total_time(delivery_time_total) {
  const total_time = document.createElement('div');
  total_time.classList.add('section_delivery');

    total_time.innerHTML = `
    <div class="total_time">Lieferzeit: ${delivery_time_total}</div>
  `;
  lieferung.appendChild(total_time);
}

//Die Parameter für für die funktion create_new_order defninieren
function doSearch() {
    const order_id = Date.now().toString(36) + Math.random().toString(36);
    const order_menus = JSON.stringify(ordered_menus, null, 2);
    const total_price =  total_price_calculation;
    const order_adress= search_input_lieferadresse.value;
    const order_delivery_time = calculate_total_delivery_time()
    const preptime_total = total_prep_time_calcualtion;
    create_new_order(order_id, order_menus, total_price, order_adress, preptime_total, order_delivery_time);
  };

//Die Parameter für die Funktion create_total_time berechnen
function doCalculation() {
  const delivery_time_total = calculate_total_delivery_time (delivery_time)
  create_total_time(delivery_time_total)
}

//Funktionen per Klick ausführen
calculate_button.addEventListener('click', doCalculation)
view_button.addEventListener('click', doSearch);
