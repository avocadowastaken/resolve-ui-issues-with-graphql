import * as React from "react";
import { AppRegistry } from "react-native";

import { ApolloApp } from "./api/Apollo";

AppRegistry.registerComponent("App", () => ApolloApp);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});

if (module.hot) {
  module.hot.accept();
}
