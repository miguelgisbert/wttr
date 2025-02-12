import { useState, useEffect } from 'react';
import ForecastTab from './components/ForecastTab';
import './styles/App.css';
import { Grid, Typography } from '@mui/material';

interface WeatherData {
  weather: {
    date: string;
    hourly: any[];
  }[];
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    setLocation('Barcelona'); 
    const apiUrl = `https://wttr.in/${location}?format=j1`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Weather data:', data); 
        setWeatherData(data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  const handleTabChange = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" margin="auto" minWidth={600}>
      {weatherData ? (
          <Grid item>
            <Typography>{location}</Typography>
            <ForecastTab 
              days={weatherData.weather} 
              selectedDay={selectedDay} 
              onTabChange={handleTabChange} 
            />
          </Grid>
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
}

export default App;