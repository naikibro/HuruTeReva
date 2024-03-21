import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";

import {
  Feather,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

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

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>
            <MaterialCommunityIcons
              name="weather-cloudy"
              size={24}
              color="black"
            />
            {"   "}
            {weather.current.condition.text}
          </Text>
          <Text style={styles.infoText}>
            <Entypo name="water" size={24} color="black" />
            {"   "}Humidity:
            {weather.current.humidity}%
          </Text>
          <Text style={styles.infoText}>
            <Feather name="wind" size={24} color="black" />
            {"   "}
            {weather.current.wind_dir} at {weather.current.wind_kph} km/h
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoText, { color: "blue" }]}>
            {"   "}
            <FontAwesome
              name="thermometer-three-quarters"
              size={24}
              color="black"
            />
            {"        "}
            {weather.current.temp_c}°C
          </Text>
          <Text style={[styles.infoText, { color: "purple" }]}>
            <Fontisto name="sunglasses-alt" size={24} color="black" />
            {"   "}
            UV Index: {weather.current.uv}
          </Text>
        </View>
      </View>

      <Text style={styles.lastUpdatedText}>
        Last Updated: {weather.current.last_updated}
      </Text>
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
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,

    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  infoItem: {
    marginRight: 20,
  },
  infoText: {
    marginBottom: 5,
    fontSize: 15,
  },
  lastUpdatedText: {
    fontStyle: "italic",
    color: "gray",
    marginVertical: 5,
  },
});

export default WeatherDetails;
