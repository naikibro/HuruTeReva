import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";

import useForecast from "../hooks/useForecast";

import ForecastDetails from "./ForecastDetails";

const ForecastCarrousel = () => {
  const [forecastPeriod, setForecastPeriod] = useState([]);
  const { fetchForecast } = useForecast();
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const dates = Array.from({ length: 7 }, (_, i) => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i);
      const formattedDate = futureDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "/");
      return formattedDate;
    });

    setForecastPeriod(dates);
  }, []);

  useEffect(() => {
    const fetchForecasts = async () => {
      const newForecasts = [];
      for (const item of forecastPeriod) {
        const tempForecast = await fetchForecast(item);

        if (tempForecast) {
          newForecasts.push(tempForecast);
        }
      }
      setForecasts(newForecasts);
    };

    fetchForecasts();
  }, [forecastPeriod, fetchForecast]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {forecasts.map((forecast, index) => (
        <View key={index} style={{ marginRight: 20 }}>
          <ForecastDetails weather={forecast} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ForecastCarrousel;
