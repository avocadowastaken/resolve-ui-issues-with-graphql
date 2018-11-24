import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { MealDetailsPayload } from "../api/Types";
import { ResizedImage } from "./ResizedImage";

const styles = StyleSheet.create({
  image: { width: "100%", height: 150 },
  instructions: {
    margin: 20,
    fontSize: 20,
    textAlign: "justify",
    fontFamily: "Luckiest Guy",
  },

  ingredients: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  ingredient: {
    marginTop: 20,
  },

  ingredientText: {
    width: 150,
    height: 60,
    margin: 10,
    fontSize: 20,
    fontFamily: "Luckiest Guy",
  },
});

interface Props {
  readonly meal: MealDetailsPayload;
}

export function MealDetails({ meal }: Props) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: meal.strMealThumb }} />

      <View style={styles.ingredients}>
        {Array.from({ length: 20 }).map((_, idx) => {
          const ingredient = meal[`strIngredient${idx + 1}`];
          const measure = meal[`strMeasure${idx + 1}`];

          if (!ingredient || !measure) {
            return null;
          }

          return (
            <View key={ingredient} style={styles.ingredient}>
              <ResizedImage
                width={150}
                height={150}
                uri={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
              />

              <Text style={styles.ingredientText}>
                {measure} {ingredient}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </View>
  );
}
