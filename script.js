//API url festlegen
const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
//Konstanten von html dokument festlegen
const lieferung = document.getElementById('lieferung')
//Die Ausgewählten Menus erfassen
const ordered_menus = [];
if (document.getElementById("asian_check").checked) {
  ordered_menus.push({
    menu:   "Asian Fusion",
    prep_time: 60,
    price: 22
})
} else if (document.getElementById("arabic_check").checked) {
  ordered_menus.push({
    menu:   "Arabic Fusion",
    prep_time: 50,
    price: 18
})
} else if (document.getElementById("african_check").checked) {
  ordered_menus.push({
    menu:   "African Fusion",
    prep_time: 40,
    price: 20
})
} else if (document.getElementById("latin_check").checked) {
  ordered_menus.push({
    menu:   "Latin Fusion",
    prep_time: 30,
    price: 20
})
} else if (document.getElementById("other_check").checked) {
  ordered_menus.push({
    menu:   "Other Fusion",
    prep_time: 20,
    price: 21
})
} else if (document.getElementById("european_check").checked) {
  ordered_menus.push({
    menu:   "European Fusion",
    prep_time: 70,
    price: 15
})
}else {
  ordered_menus.push({
    menu:   "None",
    prep_time: 0,
    price: 0
})
}
//Die eigegebene Lieferadresse speichern  
const search_input_lieferadresse = document.getElementById('lieferadresse')
//ToDo:Preis anhand der Menus berechnen 
//const total_price_calculation = document.getElementsByClassName('Preis')
const total_price_calculation = 50
//Button zur Berechnung der Lieferzeit
const calculate_button = document.getElementById('calculate_button')
//Button zur Anzeige der Bestellung
const view_button = document.getElementById('view_button')

//Zubereitungszeit für die einzelnen Menüs festlegen
const preperation_time = null
//Lieferzeit festlegen 
const delivery_time = null

//API laden
async function loadData(api_key, destination, origin) {
  const url = `${maps_url}?key=${api_key}&destinations=${destination}&origins=${origin}`;
  const data = await fetch(url);
  const json = await data.json()
  const delivery_time =  45  //json["rows"][1]["duration"]["text"]
  return delivery_time
}

//calculate the total delivery_time
async function calculate_total_delivery_time (){
  //delivery_time = loadData("enter your api key here","Rotzingen 45 79733 Görwihl BW, DE", "Hangstraße 46-50 Loerach, 79539 BW, DE");
  const preperation_time = ordered_menus.reduce((sum, currentValue) => {
    return sum + currentValue.prep_time;
  }, 0);
  
  const delivery_time_total = delivery_time + preperation_time
  return delivery_time_total 
}

async function create_new_order(id,menus, price,adress, delivery_time_total) {
    const new_order = document.createElement('div');
    new_order.classList.add('section-delivery');

    new_order.innerHTML = `
    <div id="Bestellung">
    <div class="order">Bestellnummer: ${id}</div>
      <div class="order_info">
        <span>
          <span class="menus">Menus: ${menus}</span>
          <span class="price"> Preis gesamt: ${price}</span>
          <span class="adresse">Adresse: ${adress}</span>
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
async function create_total_time(delivery_time_total) {
  const total_time = document.createElement('div');
  total_time.classList.add('section_delivery');

    total_time.innerHTML = `
    <div class="total_time">Lieferzeit: ${delivery_time_total}</div>
  `;
  lieferung.appendChild(total_time);
}

function doSearch() {
    const order_id = Date.now().toString(36) + Math.random().toString(36);
    const order_menus = "Asian Fusion"//ordered_menus
    const total_price =  50 //ordered_menus.reduce((sum, currentValue) => {
     // return sum + currentValue.price;
   // }, 0);
    const order_adress= search_input_lieferadresse.value;
    const order_delivery_time =  45 //calculate_total_delivery_time (delivery_time)
    create_new_order(order_id, order_menus, total_price, order_adress, order_delivery_time);
  }

function doCalculation() {
  const delivery_time_total = calculate_total_delivery_time (delivery_time)
  create_total_time(delivery_time_total)
}

calculate_button.addEventListener('click', doCalculation)
view_button.addEventListener('click', doSearch);
