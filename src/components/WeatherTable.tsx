import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Box } from '@mui/material';
import { WiTime1, WiThermometer, WiDaySunny, WiStrongWind, WiCloud, WiDayCloudy, WiRain, WiSnow, WiFog } from 'react-icons/wi';
import Navigation from '@mui/icons-material/Navigation';
import '../styles/WeatherTable.css';
import { WeatherTableProps } from '../types';

const formatTime = (time: string) => {
  const hours = Math.floor(parseInt(time) / 100);
  const minutes = parseInt(time) % 100;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const getWeatherIcon = (description: string) => {
  switch (description.trim().toLowerCase()) {
    case 'clear':
    case 'sunny':
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
      return <WiCloud size={24} />;
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
            <TableCell className="table-header-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>
              <WiTime1 size={24} />
            </TableCell>
            <TableCell className="table-header-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>
              <WiThermometer size={24} />
            </TableCell>
            <TableCell className="table-header-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>
              <WiDaySunny size={24} />
            </TableCell>
            <TableCell className="table-header-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>
              <WiStrongWind size={24} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hourlyData.map((hour, index) => (
            <TableRow key={index}>
              <TableCell className="table-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>{formatTime(hour.time)}</TableCell>
              <TableCell className="table-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>{hour.tempC} °C</TableCell>
              <TableCell className="table-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>
                {hour.weatherDesc.length > 0 ? (
                  <Grid container justifyContent="center" alignItems="center" minWidth={100}>
                    <Box sx={{ margin: "2px 10px" }} alignItems={"center"} display={"flex"}>
                      {getWeatherIcon(hour.weatherDesc[0].value)}
                    </Box>
                    <Typography>{hour.weatherDesc[0].value}</Typography>
                  </Grid>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell className="table-cell" sx={{ textAlign: "center", verticalAlign: "middle" }}>
                <Grid container justifyContent="center" alignItems="center" minWidth={100}>
                  <Box sx={{ margin: "2px 10px" }} alignItems={"center"} display={"flex"}>
                    {getWindDirectionIcon(hour.winddirDegree)}
                  </Box>
                  <Typography>{hour.windspeedMiles} km/h</Typography>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;