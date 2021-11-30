//API url festlegen
const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
const order_id = Date.now().toString(36) + Math.random().toString(36) //generate a uniqe Id for every order by using Date.now() and Math.random()
//Konstanten von html dokument festlegen
const lieferung = document.getElementById('lieferung')
const checkbox_input_menus = document.getElementById('checkbox_lieferung') 
const search_input_lieferadresse = document.getElementById('lieferadresse') 
const total_price_calculation = document.getElementsByClassName('Preis')
const calculate_button = document.getElementById('calculate_button')
const view_button = document.getElementById('view_button')

//Zubereitungszeit für die einzelnen Menüs festlegen
const prepation_time = null 

if (checkbox_input_menus = "Asian Fusion") {
  price = 60
} else if (checkbox_input_menus = "African Fusion") {
  preperation_time = 40
} else if (checkbox_input_menus = "Arabic Fusion") {
  preperation_time = 50
} else if (checkbox_input_menus = "European Fusion") {
  preperation_time = 70
} else if (checkbox_input_menus = "Latin Fusion") {
  preperation_time = 30
} else {
  preperation_time = 20
}



async function loadData(api_key, destination, origin) {
  const url = `${maps_url}?key=${api_key}&destinations=${destination}&origins=${origin}`;
  const data = await fetch(url);
  const json = await data.json()
  const delivery_time = json["rows"][1]["duration"]["text"]
  return delivery_time
}

//calculate the total delivery_time

const delivery_time_total = delivery_time + prepation_time 

async function create_new_order(id,menus, price,adress, delivery_time_total) {
    const new_order = document.createElement('div');
    new_order.classList.add('section_delivery');

    new_order.innerHTML = `
    <div class="order">${id}</div>
      <div class="order_info">
        <span>
          <span class="menus">${menus}</span>
          <span class="price">${price}</span>
          <span class="adresse">${adress}</span>
          <span class="lieferzeit">${delivery_time_total}</span>
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
    const order_delivery_time = delivery_time_total.value
    create_new_order(order_id, ordered_menus, total_price, order_adress, order_delivery_time);
  }

loadData("xxx","Rotzingen 45 79733 Görwihl BW, DE", "Hangstraße 46-50 Loerach, 79539 BW, DE");
calculate_button.addEventListener('click', caculate_delivery_time)
view_button.addEventListener('click', doSearch);
