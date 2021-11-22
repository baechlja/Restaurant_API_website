import fetch from 'cross-fetch';

const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json&key=xxx"

async function loadData(api_key, destination, origin) {
    const url = `${maps_url}?access_key=${api_key}&destinations=${destination}&origins=${origin}`;
    const data = await fetch(url);
    const json = await data.json()
    return Math.trunc(json.elements[0].duration[0])
}

loadData("xxxx","Rotzingen 45 79733 Görwihl BW, DE", "Hangstraße 46-50 Loerach, 79539 BW, DE")