import React from 'react';
import { Tab, Tabs, Box, Typography, Grid } from '@mui/material';
import WeatherTable from './WeatherTable';
import { ForecastTabProps } from '../types';
import "../styles/ForecastTab.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const getDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { weekday: 'long' });
};

const ForecastTab: React.FC<ForecastTabProps> = ({ days, selectedDay, onTabChange }) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedDay} onChange={handleChange} aria-label="weather forecast tabs" variant="fullWidth">
        {days.map((day, index) => (
          <Tab 
            key={index} 
            label={
              <Box>
                <Typography variant="body1">{getDayOfWeek(day.date)}</Typography>
                <Typography variant="body2">{formatDate(day.date)}</Typography>
                <Grid container justifyContent="center" alignItems="center">
                  <Typography variant="body2" className='temperature-max'>{day.maxtempC}°C</Typography>
                  <Typography variant="body2" className='temperature-min'>{day.mintempC}°C</Typography>
                </Grid>
              </Box>
            }
          />
        ))}
      </Tabs>
      {days[selectedDay] && days[selectedDay].hourly && (
        <WeatherTable hourlyData={days[selectedDay].hourly} />
      )}
    </Box>
  );
};

export default ForecastTab;