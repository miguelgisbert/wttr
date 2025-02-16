
/* ForecastTabProps */

export interface ForecastTabProps {
  days: {
    date: string;
    hourly: HourlyData[];
  }[];
  selectedDay: number;
  onTabChange: (dayIndex: number) => void;
}


/* WeatherData */
export interface HourlyData {
  time: string;
  tempC: string;
  weatherDesc: { value: string }[];
  windspeedMiles: string;
  weatherCode: string;
  winddirDegree: string;
}

export interface WeatherData {
  weather: {
    date: string;
    hourly: HourlyData[];
  }[];
}

export interface WeatherDesc {
  value: string;
}

export interface HourlyForecast {
  time: string;
  tempC: string;
  weatherCode: string;
  weatherDesc: WeatherDesc[];
  windspeedMiles: string;
  winddirDegree: string;
}

export interface WeatherTableProps {
  hourlyData: HourlyForecast[];
}

