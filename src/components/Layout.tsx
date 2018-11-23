import * as React from "react";
import { View } from "react-native";
import { Route } from "react-router";

import { FetchError, Fetching } from "./Fetching";
import { Header } from "./Header";

interface Props {
  readonly error?: Error;
  readonly fetching?: boolean;
  readonly title: React.ReactNode;
  readonly children: React.ReactNode;
}

export function Layout({ title, error, fetching, children }: Props) {
  return (
    <Route>
      {({ history }) => (
        <View>
          <Header
            title={title}
            onLogoPress={() => history.push("/")}
            logo={fetching ? "🌀" : error ? "💀" : undefined}
          />

          {error ? <FetchError /> : fetching ? <Fetching /> : children}
        </View>
      )}
    </Route>
  );
}
