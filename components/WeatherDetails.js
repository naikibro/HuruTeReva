import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import getDayOfWeekWithDate from "../utils/functions";

const WeatherDetails = ({ weather }) => {
  const localTime = new Date(weather.location.localtime);
  const formattedDate = localTime.toISOString().slice(0, 10).replace(/-/g, "-");

  return (
    <BlurView intensity={50} style={styles.blurViewContainer}>
      <Image
        source={{ uri: `https:${weather.current.condition.icon}` }}
        style={styles.weatherIconImage}
      />
      <Text style={styles.title}>{getDayOfWeekWithDate(formattedDate)}</Text>
      <Text style={styles.subtitle}>{weather.location.country}</Text>

      <Text>Condition: {weather.current.condition.text}</Text>
      <Text>Humidity: {weather.current.humidity}%</Text>
      <Text>
        Wind: {weather.current.wind_dir} at {weather.current.wind_kph} km/h
      </Text>
      <Text>Pressure: {weather.current.pressure_mb} mb</Text>
      <Text>Visibility: {weather.current.vis_km} km</Text>
      <Text>UV Index: {weather.current.uv}</Text>
      <Text>Last Updated: {weather.current.last_updated}</Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurViewContainer: {
    padding: 25,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .1)",
  },
  weatherIconImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "600",
    fontSize: 25,
    textAlign: "left",
  },
  subtitle: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "left",
  },
});

export default WeatherDetails;
