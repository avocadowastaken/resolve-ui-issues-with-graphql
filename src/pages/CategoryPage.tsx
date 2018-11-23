import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Fetch } from "../api/Fetch";
import { MealPayload } from "../api/Types";
import { Layout } from "../components/Layout";
import { MealList } from "../components/MealList";

export function CategoryPage({
  history,
  match: {
    params: { name },
  },
}: RouteComponentProps<{ name: string }>) {
  return (
    <Fetch
      url={`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`}
      render={({ error, fetching, response }) => (
        <Layout title={name} error={error} fetching={fetching}>
          {response && (
            <MealList
              meals={(response as { meals: MealPayload[] }).meals}
              onMealPress={x => {
                history.push(`/meals/${x.idMeal}`);
              }}
            />
          )}
        </Layout>
      )}
    />
  );
}
