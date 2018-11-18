import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContainer } from "./containers/AppContainer";

render();

if (module.hot) {
  module.hot.accept("./containers/AppContainer", render);
}

function render() {
  ReactDOM.render(<AppContainer />, document.getElementById("root"));
}
