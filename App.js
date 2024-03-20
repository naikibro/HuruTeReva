import React from "react";
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
} from "react-native";
import WeatherDetails from "./components/WeatherDetails";
import useWeather from "./hooks/useWeather";

const App = () => {
  const { weather, fetchWeather } = useWeather();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/bg.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
        />
        {weather ? (
          <>
            <View style={styles.report}>
              <View>
                <Text style={styles.temperature}>
                  {weather.current.temp_c}°C
                </Text>
                <Text style={styles.locationName}>{weather.location.name}</Text>
              </View>

              <WeatherDetails weather={weather} />

              <Pressable style={styles.refreshButton} onPress={fetchWeather}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
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
  safeAreaView: {
    flex: 1,
    marginTop: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  report: {
    padding: 15,
    flex: 1,
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
    alignSelf: "center",
    color: "blue",
  },
  refreshButtonText: {
    color: "blue",
  },
});

export default App;
