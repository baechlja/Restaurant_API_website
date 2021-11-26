//API url festlegen
const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
const order_id = Date.now().toString(36) + Math.random().toString(36) //generate a uniqe Id for every order by using Date.now() and Math.random()
//Konstanten von html dokument festlegen
const lieferung = document.getElementById('lieferung')
const checkbox_input_menus = document.getElementById('checkbox_lieferung') 
const search_input_lieferadresse = document.getElementById('lieferadresse') 
const total_price_calculation = document.getElementsByClassName('Preis')
//Zubereitungszeit für die einzelnen Menüs festlegen
const preparation_time_Asian_Fusion = 60
const preparationtime_African_Fusion = 40
const preparationtime_Arabic_Fusion = 50
const preparationtime_European_Fusion = 70
const preparationtime_Latin_Fusion = 30
const preparationtime_Other_Fusion = 20

const delivery_time_calculation = document.getElementById('') //in html ergänzen oder funktion bauen (API erforderlich!)


function create_new_order(id,menus, price,adress, delivery_time) {
    const new_order = document.createElement('div');
    new_order.classList.add('section_delivery');

    new_order.innerHTML = `
    <div class="order">${order_id}</div>
      <div class="order_info">
        <span>
          <span class="menus">${menus}</span>
          <span class="price">${price}</span>
          <span class="adresse">${adress}</span>
          <span class="lieferzeit">${delivery_time}</span>
        </span>
    </div>
  `;
  lieferung.appendChild(new_order);
}
function doSearch() {
    const order_id = order_id.value;
    const ordered_menus = checkbox_input_menus.value;
    const total_price = total_price_calculation.value;
    const order_adress= search_input_lieferadresse.value;
    const order_delivery_time = delivery_time_calculation.value
    create_new_order(order_id, ordered_menus, total_price, order_adress, order_delivery_time);
  }

async function loadData(api_key, destination, origin) {
    const url = `${maps_url}?key=${api_key}&destinations=${destination}&origins=${origin}`;
    const data = await fetch(url);
    const json = await data.json()
    return console.log(json)
}

loadData("xxx","Rotzingen 45 79733 Görwihl BW, DE", "Hangstraße 46-50 Loerach, 79539 BW, DE")