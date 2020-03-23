# Travel Planner App

This application can be used to track the weather and your travel destination. This application utilizes 3 APIs, that are dependent upon one another with help from Webpack, Service Worker, and Jest. 

## Installation

1. Clone the repository
2. cd into the cloned repository:
    * npm install 
3. Create a new .env file that contains these credentials:
    * darkskyKey (from DarkSky API)
    * geonamesUsername (from GeoNames API)
    * pixabayKey (from Pixabay API)
4. Run: npm run build-prod (to run the production mode of the app)
5. Run: npm run start 

## Functions
This application shows the user information like weather, country, a photo of the destination, departing date, and returning date. The user is also able to add more than one destination by hitting the save button and going through the form again. 
