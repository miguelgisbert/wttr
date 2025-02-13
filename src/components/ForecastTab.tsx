import React from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import WeatherTable from './WeatherTable';
import { HourlyData } from '../types';

interface ForecastTabProps {
  days: {
    date: string;
    hourly: HourlyData[];
  }[];
  selectedDay: number;
  onTabChange: (dayIndex: number) => void;
}

const ForecastTab: React.FC<ForecastTabProps> = ({ days, selectedDay, onTabChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedDay} onChange={handleChange} aria-label="weather forecast tabs">
        {days.map((day, index) => (
          <Tab key={index} label={day.date} />
        ))}
      </Tabs>
      {days[selectedDay] && days[selectedDay].hourly && (
        <WeatherTable hourlyData={days[selectedDay].hourly} />
      )}
    </Box>
  );
};

export default ForecastTab;