import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import * as Location from "expo-location";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const weatherApiKey = "8c543a3f286f4b8e8b3193513241903";

    const fetchWeather = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log("location", location);

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location.coords.latitude},${location.coords.longitude}&aqi=no`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

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
              <Text style={styles.title}>
                {weather.location.name}, {weather.location.country}
              </Text>
              <Text>Condition: {weather.current.condition.text}</Text>
              <Text>Temperature: {weather.current.temp_c}°C</Text>
              <Text>Humidity: {weather.current.humidity}%</Text>
              <Text>
                Wind: {weather.current.wind_dir} at {weather.current.wind_kph}{" "}
                km/h
              </Text>
              <Text>Pressure: {weather.current.pressure_mb} mb</Text>
              <Text>Visibility: {weather.current.vis_km} km</Text>
              <Text>UV Index: {weather.current.uv}</Text>
              <Text>Last Updated: {weather.current.last_updated}</Text>
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
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
  },
  report: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
    textAlign: "left",
    alignSelf: "flex-start",
  },
});

export default App;
