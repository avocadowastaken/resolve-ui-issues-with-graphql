import * as React from "react";
import { AppRegistry } from "react-native";

import { AppContainer } from "./containers/AppContainer";

AppRegistry.registerComponent("App", () => AppContainer);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});

if (module.hot) {
  module.hot.accept();
}
