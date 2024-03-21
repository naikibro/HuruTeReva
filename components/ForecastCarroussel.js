import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";

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
    <>
      {forecasts ? (
        <>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "300",
              marginTop: 30,
            }}
          >
            Weather forecast for next 7 days
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {forecasts.map((forecast, index) => (
              <View key={index} style={{ marginRight: 20 }}>
                <ForecastDetails weather={forecast} />
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading weather forecast for the next 7 days...</Text>
          </View>
        </>
      )}
    </>
  );
};

export default ForecastCarrousel;
