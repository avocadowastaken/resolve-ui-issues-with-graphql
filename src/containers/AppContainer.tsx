import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { CategoriesPage } from "../pages/CategoriesPage";
import { CategoryPage } from "../pages/CategoryPage";
import { MealPage } from "../pages/MealPage";

export function AppContainer() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/categories" exact={true} component={CategoriesPage} />
        <Route path="/categories/:name" exact={true} component={CategoryPage} />
        <Route path="/meals/:id" exact={true} component={MealPage} />

        <Redirect from="/" to="/categories" />
      </Switch>
    </BrowserRouter>
  );
}
