import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { WiTime1, WiThermometer, WiDaySunny, WiStrongWind, WiCloud, WiDayCloudy, WiNightClear, WiRain, WiSnow, WiFog } from 'react-icons/wi';
import Navigation from '@mui/icons-material/Navigation';
import './WeatherTable.css';

interface WeatherDesc {
  value: string;
}

interface HourlyForecast {
  time: string;
  tempC: string;
  weatherCode: string;
  weatherDesc: WeatherDesc[];
  windspeedMiles: string;
  winddirDegree: string;
}

interface WeatherTableProps {
  hourlyData: HourlyForecast[];
}

const formatTime = (time: string) => {
  const hours = Math.floor(parseInt(time) / 100);
  const minutes = parseInt(time) % 100;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const getWeatherIcon = (description: string) => {
  switch (description.trim().toLowerCase()) {
    case 'clear':
      return <WiDaySunny size={24} />;
    case 'partly cloudy':
      return <WiDayCloudy size={24} />;
    case 'cloudy':
      return <WiCloud size={24} />;
    case 'overcast':
      return <WiCloud size={24} />;
    case 'freezing fog':
      return <WiFog size={24} />;
    case 'moderate or heavy freezing rain':
      return <WiRain size={24} />;
    case 'heavy snow':
      return <WiSnow size={24} />;
    case 'patchy rain nearby':
    case 'light rain shower':
      return <WiRain size={24} />;
    default:
      return <WiNightClear size={24} />;
  }
};

const getWindDirectionIcon = (degree: string) => {
  const rotation = `rotate(${degree}deg)`;
  return <Navigation style={{ transform: rotation, fontSize: '16px' }} />;
};

const WeatherTable: React.FC<WeatherTableProps> = ({ hourlyData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="table-header-cell" sx={{ textAlign: "center" }}>
              <WiTime1 size={24} />
            </TableCell>
            <TableCell className="table-header-cell" sx={{ textAlign: "center" }}>
              <WiThermometer size={24} />
            </TableCell>
            <TableCell className="table-header-cell" sx={{ textAlign: "center" }}>
              <WiDaySunny size={24} />
            </TableCell>
            <TableCell className="table-header-cell" sx={{ textAlign: "center" }}>
              <WiStrongWind size={24} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hourlyData.map((hour, index) => (
            <TableRow key={index}>
              <TableCell className="table-cell" sx={{ textAlign: "center" }}>{formatTime(hour.time)}</TableCell>
              <TableCell className="table-cell" sx={{ textAlign: "center" }}>{hour.tempC} °C</TableCell>
              <TableCell className="table-cell" sx={{ textAlign: "center" }}>
                {hour.weatherDesc.length > 0 ? (
                  <>
                    {getWeatherIcon(hour.weatherDesc[0].value)}
                    {hour.weatherDesc[0].value}
                  </>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell className="table-cell" sx={{ textAlign: "center" }}>
                {getWindDirectionIcon(hour.winddirDegree)} {hour.windspeedMiles} km/h
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;