import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchWeather = useCallback(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const weatherApiKey = Constants.expoConfig.extra.WEATHER_API_KEY;
      const weatherApiUrl = Constants.expoConfig.extra.WEATHER_API_URL;

      const response = await fetch(
        weatherApiUrl +
          `?key=${weatherApiKey}&q=${location.coords.latitude},${location.coords.longitude}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, location, errorMsg, fetchWeather };
};

export default useWeather;
