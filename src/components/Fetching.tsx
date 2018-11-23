import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },

  text: {
    margin: 10,
    fontSize: 30,
    fontFamily: "Luckiest Guy",
  },
});

export function Fetching() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>🍭 Fetching...</Text>
    </View>
  );
}

export function FetchError() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>💀 Something went wrong...</Text>
    </View>
  );
}
