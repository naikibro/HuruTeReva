import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

const ForecastDetails = ({ weather }) => {
  return (
    <BlurView intensity={50} style={styles.blurViewContainer}>
      {weather.forecast.forecastday.map((day, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={styles.title}>{day.date}</Text>
          <Text>
            <Text style={{ color: "blue" }}>{day.day.mintemp_c}°C</Text> -
            <Text style={{ color: "green" }}>{day.day.maxtemp_c}°C</Text>
          </Text>
          <Text>Humidity: {day.day.avghumidity}%</Text>
          <Text style={{ color: "purple" }}>UV Index: {day.day.uv}</Text>
          <Image
            source={{ uri: `https:${day.day.condition.icon}` }}
            style={styles.weatherIconImage}
          />
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            {day.day.condition.text}
          </Text>
        </View>
      ))}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurViewContainer: {
    marginTop: 30,
    padding: 25,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(210, 210, 255, .5)",
  },
  weatherIconImage: {
    width: 100,
    height: 100,
    alignSelf: "center", // Center the image
  },
  title: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "left",
  },
});

export default ForecastDetails;
