import React, { useRef, useEffect } from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { BlurView } from "expo-blur";

import getDayOfWeekWithDate from "../utils/functions";

const ForecastDetails = ({ weather }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <BlurView intensity={50} style={styles.blurViewContainer}>
        {weather.forecast.forecastday.map((day, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={styles.title}>{getDayOfWeekWithDate(day.date)}</Text>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurViewContainer: {
    marginTop: 30,
    padding: 25,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .1)",
  },
  weatherIconImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "left",
  },
});

export default ForecastDetails;
