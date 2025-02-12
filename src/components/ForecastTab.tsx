import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import WeatherTable from './WeatherTable';

interface ForecastTabProps {
  days: {
    date: string;
    hourly: any[];
  }[];
  selectedDay: number;
  onTabChange: (dayIndex: number) => void;
}

const ForecastTab: React.FC<ForecastTabProps> = ({ days, selectedDay, onTabChange }) => {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box>
      <Tabs value={selectedDay} onChange={handleChange} aria-label="weather forecast tabs">
        {days.map((day, index) => (
          <Tab key={index} label={day.date} />
        ))}
      </Tabs>
      <WeatherTable hourlyData={days[selectedDay].hourly} />
    </Box>
  );
};

export default ForecastTab;