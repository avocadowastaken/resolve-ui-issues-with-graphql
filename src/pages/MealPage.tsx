import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Fetch } from "../api/Fetch";
import { MealDetailsPayload } from "../api/Types";
import { Layout } from "../components/Layout";
import { MealDetails } from "../components/MealDetails";

export function MealPage({
  history,
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) {
  return (
    <Fetch
      url={`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`}
      render={({ error, response, fetching }) => {
        const meal = !response
          ? null
          : (response as { meals: MealDetailsPayload[] }).meals[0];

        return (
          <Layout
            error={error}
            fetching={fetching}
            title={!meal ? null : meal.strMeal}
          >
            {meal && <MealDetails meal={meal} />}
          </Layout>
        );
      }}
    />
  );
}
