const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=CITY_NAME


//waether stack api key that has been generated in weatherstack api website
const WEATHERSTACK_API_KEY = '1b5212a50b576a09f665ab46706b7c8f';


//get route to get the details
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        //fetching the data by using axios
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query: city
            }
        });
        

        if (response.data.error) {
            return res.status(404).json({ error: 'City not found' });
        }
       //returning response in json format
        res.json({
            location: response.data.location.name,
            temperature: response.data.current.temperature,
            weather_descriptions: response.data.current.weather_descriptions[0],
            wind_speed: response.data.current.wind_speed,
            humidity: response.data.current.humidity,
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

//running the server of 3000 port
app.listen(port, () => {
    console.log(`Server is running....`);
});
