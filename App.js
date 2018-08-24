import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

export default class App extends React.Component {
  state = {
    isLoaded: false
  };
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? null : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Starting Daily Weather</Text>
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
    backgroundColor: "#FDF6AA",
    paddingRight: 25
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 100
  }
});
