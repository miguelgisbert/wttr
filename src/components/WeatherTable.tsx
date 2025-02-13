import React from 'react';
import { TableContainer, Paper, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
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
      <div className="weather-table">
        <div className="weather-table-header">
          <div>
            <WiTime1 size={24} /> Time
          </div>
          <div>
            <WiThermometer size={24} /> Temperature
          </div>
          <div>
            <WiDaySunny size={24} /> Weather
          </div>
          <div>
            <WiStrongWind size={24} /> Wind Speed (km/h)
          </div>
        </div>
        {hourlyData.map((hour, index) => (
          <div className="weather-table-row" key={index}>
            <div>{formatTime(hour.time)}</div>
            <div>{hour.tempC} °C</div>
            <div>
              {hour.weatherDesc.length > 0 ? (
                <>
                  {getWeatherIcon(hour.weatherDesc[0].value)}
                  {hour.weatherDesc[0].value}
                </>
              ) : (
                'N/A'
              )}
            </div>
            <div>
              {getWindDirectionIcon(hour.winddirDegree)} {hour.windspeedMiles} km/h
            </div>
          </div>
        ))}
      </div>
    </TableContainer>
  );
};

export default WeatherTable;