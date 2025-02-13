export interface WeatherData {
  weather: {
    date: string;
    hourly: HourlyData[];
  }[];
}

export interface HourlyData {
  time: string;
  tempC: string;
  weatherDesc: { value: string }[];
  windspeedMiles: string;
  weatherCode: string;
}