import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface WeatherDesc {
  value: string;
}

interface HourlyForecast {
  time: string;
  tempC: string;
  weatherCode: string;
  weatherDesc: WeatherDesc[];
  windspeedMiles: string;
}

interface WeatherTableProps {
  hourlyData: HourlyForecast[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ hourlyData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Temperature (°C)</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Wind Speed (mph)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hourlyData.map((hour, index) => (
            <TableRow key={index}>
              <TableCell>{hour.time}</TableCell>
              <TableCell>{hour.tempC}</TableCell>
              <TableCell>
                {hour.weatherDesc.length > 0 ? hour.weatherDesc[0].value : 'N/A'}
              </TableCell>
              <TableCell>{hour.windspeedMiles}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;