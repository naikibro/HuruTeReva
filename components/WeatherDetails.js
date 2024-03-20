import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

const WeatherDetails = ({ weather }) => {
  return (
    <BlurView intensity={50} style={styles.blurViewContainer}>
      <Image
        source={{ uri: `https:${weather.current.condition.icon}` }}
        style={styles.weatherIconImage}
      />
      <Text style={styles.title}>{weather.location.country}</Text>
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
  },
  weatherIconImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "left",
  },
});

export default WeatherDetails;
