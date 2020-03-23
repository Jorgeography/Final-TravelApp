const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
var fetch = require('node-fetch');
var path = require("path");
const express = require("express");
const app = express();
const distPath = path.join(__dirname, "..//..//dist");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(distPath));
app.use(cors());
var async  = require('express-async-await');
var moment = require('moment');

const geonamesApi = `http://api.geonames.org/search?lang=en&username=${process.env.geonamesUsername}&type=json&name=`;
const pixabayApi = `https://pixabay.com/api/?key=${process.env.pixabayKey}&image_type=photo&q=`;
const darkSkyApi = `https://api.darksky.net/forecast/${process.env.darkskyKey}`;

const port = 8081;
const server = app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

app.post("/test", async (req, res) => {
    const geoUrl = `${geonamesApi}${req.body.cityName}`;
    const geoRes = await fetch(geoUrl, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"}
    });
    const geoData = await geoRes.json();
    const firstCity = geoData.geonames[0];

    const darkskyUrl = `${darkSkyApi}/${firstCity.lat},${firstCity.lng}`;
    const darkskyRes = await fetch(darkskyUrl, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"}
    });
    const darkskyData = await darkskyRes.json();

    const pixabayUrl = `${pixabayApi}${firstCity.name}`;
    const pixabayRes = await fetch(pixabayUrl, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        }
    });
    const pixabayData = await pixabayRes.json();
    const firstPhoto = pixabayData.hits[0];

    const depart = moment(req.body.departingDate);
    const departformat = depart.format('MMM Do YYYY');
    const today = moment().format('YYYY-MM-DD');
    const countdown = depart.diff(today, 'days');

    res.send(JSON.stringify({
        photoURL: firstPhoto.largeImageURL,
        location: `${firstCity.name}, ${firstCity.countryName}`,
        cityLng: firstCity.lng,
        cityLat: firstCity.lat,
        weather: darkskyData.currently.temperature,
        daysLeft: countdown,
        departDate: req.body.departingDate}))
})