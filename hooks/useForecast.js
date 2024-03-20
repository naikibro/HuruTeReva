import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";

const useForecast = (forecastDate) => {
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const todayDate = new Date().toISOString().slice(0, 10);

  const nbDaysToForecast = 1;

  forecastDate = forecastDate ?? todayDate;

  const fetchForecast = useCallback(async (forecastDate) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const weatherApiKey = Constants.expoConfig.extra.WEATHER_API_KEY;
      const weatherForecastApiUrl =
        Constants.expoConfig.extra.WEATHER_FORECAST_API_URL;

      const response = await fetch(
        weatherForecastApiUrl +
          "?key=" +
          weatherApiKey +
          "&q=" +
          location.coords.latitude +
          "," +
          location.coords.longitude +
          "&days=" +
          nbDaysToForecast +
          "&dt=" +
          forecastDate +
          "&hour=12"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }
      const data = await response.json();
      setForecast(data);
      return data;
    } catch (error) {
      console.error("Error fetching forecast:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  return { forecast, location, errorMsg, fetchForecast };
};

export default useForecast;
