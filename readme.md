Weather Application

This Weather Application provides real-time weather updates and forecasts for a given city or the user's current location. It is built using HTML, CSS, and JavaScript and utilizes the WeatherAPI for fetching weather data.

Features

Search by City: Enter a city name to get the current weather and a 3-day forecast.

Current Location Weather: Fetch weather data based on your device's current location.

Recent Searches: Save and view your last five searched cities for quick access.

Interactive UI: Displays weather data with icons, temperature, wind speed, and humidity.

Loading Spinner: Visual indicator during data fetching.

Technologies Used

HTML5

Tailwind CSS

JavaScript (ES6+)

WeatherAPI

Installation

Clone this repository:

git clone https://github.com/yourusername/weather-app.git

Navigate to the project directory:

cd weather-app

Open the index.html file in your preferred web browser.

Usage

Search Weather by City:

Enter a city name in the input field.

Click on the "Search" button to view the current weather and 3-day forecast.

Get Weather for Current Location:

Click on the "Current Location" button.

Allow location access when prompted by your browser.

View Recent Searches:

The application saves your last five searches.

Select a city from the dropdown menu to view its weather data.

Project Structure

weather-app/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript logic
└── README.md           # Project documentation

API Integration

This application uses the WeatherAPI for fetching weather data.

Current Weather API: Provides real-time weather data.

Forecast API: Delivers a 3-day weather forecast.

Configuration

Obtain an API key from WeatherAPI.

Replace the placeholder API_KEY in the script.js file with your API key:

const API_KEY = "your_api_key_here";

Screenshots

Main Interface



Forecast Section



Future Enhancements

Add support for more detailed weather metrics.

Implement a responsive design for better mobile usability.

Integrate additional APIs for extended features like air quality and radar maps.

License

This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgments

WeatherAPI for providing the weather data.

Inspiration from various open-source weather applications.

Feel free to contribute to this project by submitting issues or pull requests!


