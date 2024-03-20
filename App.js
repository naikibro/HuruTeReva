import React, { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Platform,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";

// hooks
import useWeather from "./hooks/useWeather";

const App = () => {
  const { weather, location, errorMsg, fetchWeather } = useWeather();

  console.log("weather", weather);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 0,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/bg.jpg")}
          resizeMode="cover"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        {weather ? (
          <>
            <View style={styles.report}>
              <View>
                <Text
                  style={{
                    fontWeight: "300",
                    fontSize: 40,
                    alignSelf: "center",
                  }}
                >
                  {weather.current.temp_c}°C
                </Text>

                <Text
                  style={{
                    fontWeight: "300",
                    fontSize: 40,
                    alignSelf: "center",
                  }}
                >
                  {weather.location.name}
                </Text>
              </View>

              <BlurView intensity={50} style={styles.blurViewContainer}>
                <Image
                  source={{ uri: `https:${weather.current.condition.icon}` }}
                  style={styles.weatherIconImage}
                />
                <Text style={styles.title}>{weather.location.country}</Text>
                <Text>Condition: {weather.current.condition.text}</Text>
                <Text>Humidity: {weather.current.humidity}%</Text>
                <Text>
                  Wind: {weather.current.wind_dir} at {weather.current.wind_kph}{" "}
                  km/h
                </Text>
                <Text>Pressure: {weather.current.pressure_mb} mb</Text>
                <Text>Visibility: {weather.current.vis_km} km</Text>
                <Text>UV Index: {weather.current.uv}</Text>
                <Text>Last Updated: {weather.current.last_updated}</Text>
              </BlurView>

              <Pressable
                style={{ alignSelf: "center", color: "blue" }}
                onPress={fetchWeather}
              >
                <Text style={{ color: "blue" }}>Refresh</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading weather...</Text>
          </>
        )}
        <StatusBar hidden />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "left",
  },
  report: {
    padding: 15,
    flex: 1,
    justifyContent: "space-evenly",
    textAlign: "left",
    alignSelf: "center",
  },
  blurViewContainer: {
    padding: 25,
    borderRadius: 20,
    overflow: "hidden",
  },
  weatherIconImage: {
    width: 100,
    height: 100,
  },
});

export default App;
