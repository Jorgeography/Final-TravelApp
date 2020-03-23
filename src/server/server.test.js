async function getCoordinates (yourcity){
    const fetch = require('node-fetch');
    const dotenv = require('dotenv');
    dotenv.config();
    const baseURL = 'http://api.geonames.org/searchJSON?q=';
    const username = process.env.geonamesUsername;
    const res = await fetch(`${baseURL}${yourcity}&maxRows=10&username=${username}`)
    try {
        const data = await res.json();
        const lng = data.geonames[0].lng;
        const lat = data.geonames[0].lat;

        return[lng,lat];
    } catch(error) {
        console.log("error", error);
    }
}
const regeneratorRuntime = require("regenerator-runtime");
test ("Is it a function?", async() => {
    expect(typeof getCoordinates('Boston')).toBe("object");
});