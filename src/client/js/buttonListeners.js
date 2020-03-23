import { json } from "body-parser";
const baseUrl = 'http://localhost:8081';

const handleSubmit = async function(event){
    const departingDate = document.getElementById("departing-date").value;
    const returningDate = document.getElementById("returning-date").value;
    const cityName = document.getElementById("travel-city").value;
    const url = `${baseUrl}?city=${cityName}&date=${departingDate}`;

    const inputData = {
      departingDate,
      returningDate,
      cityName
    }

    const postData = async (url= "", data={}) => { 
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      return await result.json()
    }
    postData("http://localhost:8081/test", inputData).then(returnData => {
          console.log(returnData.photoURL);
          console.log(returnData.location);
          postUI(returnData);
    })
}


const postUI = async function(trip){
  const innerHtml = document.getElementById("results-container").innerHTML;
  document.getElementById("results-container").innerHTML = innerHtml + createCard(trip);
  
}

const createCard = function (trip){
  const returnCard =`<div class="card">
        <img src="${trip.photoURL}" id="destination-image" width="400" height="300">
        <div id="destination-info">
          <p>${trip.location}</p>
          <p>Lat: ${trip.cityLat} Lng: ${trip.cityLng}</p>
          <p>Temperature: ${trip.weather}° </p>
          <p>Departing Date: ${trip.departDate}</p>
          <p>Your trip starts in ${trip.daysLeft} days!</p>
        </div>
      </div>`
  return returnCard;
}

export {postUI,handleSubmit};