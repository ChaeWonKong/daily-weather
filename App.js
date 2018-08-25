import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ActivityIndicator
} from "react-native";
import Weather from "./Weather";

const API_KEY = "0091bcdea256e1362051f02921cc915d";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }
  _getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        });
      });
  };
  render() {
    const { isLoaded, error, temperature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather weatherName={name} temp={Math.floor(temperature - 273.15)} />
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" style={styles.lodingSign} />
            <Text style={styles.loadingText}>Starting Daily Weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FDF6AA"
  },
  lodingSign: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200
  },
  loadingText: {
    paddingRight: 25,
    fontSize: 38,
    marginBottom: 100
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  }
});
