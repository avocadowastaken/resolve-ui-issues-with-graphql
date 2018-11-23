import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CategoryPayload } from "../api/Types";
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
    margin: 10,
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: "Luckiest Guy",
  },
});

interface Props {
  readonly categories: CategoryPayload[];
  readonly onCategoryPress: (category: CategoryPayload) => void;
}

export function CategoryList({ categories, onCategoryPress }: Props) {
  return (
    <View style={styles.root}>
      {categories.map(x => (
        <TouchableOpacity
          key={x.idCategory}
          activeOpacity={0.8}
          style={styles.container}
          onPress={() => onCategoryPress(x)}
        >
          <ResizedImage width={150} height={150} uri={x.strCategoryThumb} />

          <Text style={styles.text}>{x.strCategory}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
