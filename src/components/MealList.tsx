import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CategoryPayload, MealPayload } from "../api/Types";
import { ResizedImage } from "./ResizedImage";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    width: 150,
    height: 60,
    margin: 10,
    fontSize: 20,
    fontFamily: "Luckiest Guy",
  },
});

interface Props {
  readonly meals: MealPayload[];
  readonly onMealPress: (category: MealPayload) => void;
}

export function MealList({ meals, onMealPress }: Props) {
  return (
    <View style={styles.root}>
      {meals.map(x => (
        <TouchableOpacity
          key={x.idMeal}
          activeOpacity={0.8}
          style={styles.container}
          onPress={() => onMealPress(x)}
        >
          <ResizedImage width={150} height={150} uri={x.strMealThumb} />

          <Text style={styles.text}>{x.strMeal}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
