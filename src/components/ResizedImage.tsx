import * as React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";

interface Props {
  readonly uri: string;
  readonly width: number;
  readonly height: number;
  readonly style?: StyleProp<ImageStyle>;
}

export function ResizedImage({ uri, height, width }: Props) {
  return (
    <Image
      source={{
        width,
        height,
        uri: `http://images.weserv.nl/?url=${uri}&height=${height}&width=${width}`,
      }}
    />
  );
}
