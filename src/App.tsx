import { useState } from 'react';
import ForecastTab from './components/ForecastTab';
import { Grid, Typography, TextField, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { WeatherData } from './types';
import NoResultsImage from './assets/no-results.svg';
import WelcomeImage from './assets/wellcome.svg';
import './styles/app.css'

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWeatherData = async (city: string) => {
    const apiUrl = `https://wttr.in/${city}?format=j1`;

    try {
      setIsLoading(true);
      setWeatherData(null);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
      fetchWeatherData(inputValue.trim());
      setHasSearched(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTabChange = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <TextField
          className='search-input'
          variant="outlined"
          label="Search City"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
      {weatherData ? (
        <Grid item width="100%" className="weather-container">
          <Typography className="capitalize" color="primary" display="flex" justifyContent="center" alignContent="center">
            <h1>{location}</h1>
          </Typography>
          <ForecastTab
            days={weatherData.weather}
            selectedDay={selectedDay}
            onTabChange={handleTabChange}
          />
        </Grid>
      ) : (
        <Grid item>
          {isLoading ? (
            <Grid container justifyContent="center" alignItems="center" marginTop="100px">
              <CircularProgress />
            </Grid>
          ) : hasSearched ? (
              <Grid container direction="column" justifyContent="center" alignItems="center" marginTop="100px">
              <img src={NoResultsImage} alt="No results" style={{ width: 250, height: 250 }} />
              <Typography color="primary" display="flex" justifyContent="center" alignContent="center" margin="30px">
                No weather data available
              </Typography>
            </Grid>
          ) : (
            <Grid container justifyContent="center" alignItems="center" marginTop="100px">
              <img src={WelcomeImage} alt="Welcome" style={{ width: 300 }} />
            </Grid>
          )}
          <ForecastTab days={[]} selectedDay={selectedDay} onTabChange={handleTabChange} />
        </Grid>
      )}
    </Grid>
  );
}

export default App;