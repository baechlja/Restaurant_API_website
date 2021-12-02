//API url festlegen
const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
//Konstanten von html dokument festlegen
const lieferung = document.getElementById('lieferung')
const checkbox_input_menus = document.getElementById('checkbox_lieferung') 
const search_input_lieferadresse = document.getElementById('lieferadresse') 
//const total_price_calculation = document.getElementsByClassName('Preis')
const total_price_calculation = 50
const calculate_button = document.getElementById('calculate_button')
const view_button = document.getElementById('view_button')

//Zubereitungszeit für die einzelnen Menüs festlegen
const prepation_time = null 

async function loadData(api_key, destination, origin) {
  const url = `${maps_url}?key=${api_key}&destinations=${destination}&origins=${origin}`;
  const data = await fetch(url);
  const json = await data.json()
  const delivery_time =  45  //json["rows"][1]["duration"]["text"]
  return delivery_time
}

//calculate the total delivery_time
async function calculate_total_delivery_time (delivery_time){
  delivery_time = loadData("AIzaSyDf6dam-1N9aS0FMEmGf9-F1HZ057XhG5E","Rotzingen 45 79733 Görwihl BW, DE", "Hangstraße 46-50 Loerach, 79539 BW, DE");
  
  if (checkbox_input_menus.value = "Asian Fusion") {
    prepation_time = 60
  } else if (checkbox_input_menus.value = "African Fusion") {
    preperation_time = 40
  } else if (checkbox_input_menus.value = "Arabic Fusion") {
    preperation_time = 50
  } else if (checkbox_input_menus.value = "European Fusion") {
    preperation_time = 70
  } else if (checkbox_input_menus.value = "Latin Fusion") {
    preperation_time = 30
  } else {
    preperation_time = 20
  }
  const delivery_time_total = delivery_time + prepation_time
  return delivery_time_total 
}

async function create_new_order(id,menus, price,adress, delivery_time_total) {
    const new_order = document.createElement('div');
    new_order.classList.add('section_delivery');

    new_order.innerHTML = `
    <div class="order">Bestellnummer: ${id}</div>
      <div class="order_info">
        <span>
          <span class="menus">Menus: ${menus}</span>
          <span class="price"> Preis gesamt: ${price}</span>
          <span class="adresse">Adresse: ${adress}</span>
          <span class="lieferzeit">Lieferzeit: ${delivery_time_total}</span>
        </span>
    </div>
  `;
  lieferung.appendChild(new_order);
}

async function create_total_time() {
  const total_time = document.createElement('div');
  total_time.classList.add('section_delivery');

    total_time.innerHTML = `
    <div class="total_time">${delivery_time_total}</div>
  `;
  lieferung.appendChild(total_time);
}

function doSearch() {
    const order_id = Date.now().toString(36) + Math.random().toString(36);
    const ordered_menus = checkbox_input_menus.value;
    const total_price = total_price_calculation;
    const order_adress= search_input_lieferadresse.value;
    const order_delivery_time = 45
    create_new_order(order_id, ordered_menus, total_price, order_adress, order_delivery_time);
  }

calculate_button.addEventListener('click', create_total_time)
view_button.addEventListener('click', doSearch);
