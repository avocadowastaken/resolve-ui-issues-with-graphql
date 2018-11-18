import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { RootContainer } from "./RootContainer";

export function AppContainer() {
  return (
    <BrowserRouter>
      <RootContainer />
    </BrowserRouter>
  );
}
