# HuruTeReva

HuruTeReva is a weather application built with React Native, leveraging the Expo framework for easy development and deployment. It utilizes the Expo Location API to fetch the user's current location and then retrieves the weather information for that location using the Weather API.

## Features

- Fetch and display the current weather information including temperature, humidity, wind speed, and more.
- Refresh the weather information on demand.
- Display weather conditions with a corresponding icon.
- User-friendly interface with background image and data presented in a readable format.

## Installation

To run HuruTeReva, ensure you have Node.js installed on your system. Then, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/naikibro/HuruTeReva
```

2. Navigate into the project directory:

```bash
cd HuruTeReva
```

3. Install the dependencies:

```bash
npm install
```

4. Start the project with Expo:

```bash
npx expo start
```

---

## Build the app

You gotta first create and have an Expo account

### Install the latest eas cli

```sh
npm install -g eas-cli
eas login
eas build:configure
```

### Build locally with eas

```sh
eas build --local --profile naiki #--platform android
```

### Or build in the cloud with eas

```
eas build
```

---

## Usage

After starting the project, you can run it on a physical device using the Expo Go app or on a simulator/emulator. The app will request location permissions on startup. Once granted, it fetches and displays the current weather information based on your location. You can refresh the weather data by pressing the "Refresh" button.

## Acknowledgments

- Weather information provided by [WeatherAPI](https://www.weatherapi.com/).
- This project uses Expo for development. Visit [Expo documentation](https://docs.expo.dev/) for more details.

For more information on how to contribute to this project, please refer to the CONTRIBUTING.md file.
