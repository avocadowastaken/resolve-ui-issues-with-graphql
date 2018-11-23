import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    padding: 20,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  logo: {
    fontSize: 40,
    marginRight: 20,
  },

  text: {
    fontSize: 40,
    fontFamily: "Luckiest Guy",
  },
});

interface Props {
  readonly logo?: string;
  readonly title: React.ReactNode;
  readonly onLogoPress: () => void;
}

export function Header({ title, onLogoPress, logo = "🦐" }: Props) {
  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.8} onPress={onLogoPress}>
        <Text style={styles.logo}>{logo}</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
