import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Platform,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import WeatherDetails from "./components/WeatherDetails";

// Hooks
import useWeather from "./hooks/useWeather";
import ForecastCarroussel from "./components/ForecastCarroussel";

const App = () => {
  const { weather, fetchWeather } = useWeather();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require("./assets/bg.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {weather ? (
          <>
            <View style={styles.report}>
              <View style={{ marginBottom: 40, marginTop: 100 }}>
                <Text style={styles.temperature}>
                  {weather.current.temp_c}°C
                </Text>
                <Text style={styles.locationName}>{weather.location.name}</Text>
              </View>

              <WeatherDetails weather={weather} />

              <ForecastCarroussel />

              <Pressable style={styles.refreshButton} onPress={fetchWeather}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading weather...</Text>
          </View>
        )}
        <StatusBar hidden />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    display: "flex",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: Dimensions.get("window").height,
    minWidth: Dimensions.get("window").width,
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  report: {
    flex: 1,
    width: "98%",
    overflow: "visible",
    justifyContent: "space-evenly",
    textAlign: "left",
    alignSelf: "center",
  },
  temperature: {
    fontWeight: "300",
    fontSize: 40,
    alignSelf: "center",
  },
  locationName: {
    fontWeight: "300",
    fontSize: 40,
    alignSelf: "center",
  },
  refreshButton: {
    marginVertical: 30,
    alignSelf: "center",
    color: "blue",
  },
  refreshButtonText: {
    color: "blue",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
