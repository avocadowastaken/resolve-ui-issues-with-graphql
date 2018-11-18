import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";

import { BreedPage } from "../pages/BreedPage";
import { LandingPage } from "../pages/LandingPage";

export function RootContainer() {
  return (
    <Switch>
      <Route
        path="/breeds/:id"
        render={({
          match: {
            params: { id }
          }
        }: RouteComponentProps<{ id: string }>) => <BreedPage id={id} />}
      />

      <Route path="/" exact={true} render={() => <LandingPage />} />
    </Switch>
  );
}
