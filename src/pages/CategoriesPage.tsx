import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Fetch } from "../api/Fetch";
import { CategoryPayload } from "../api/Types";
import { CategoryList } from "../components/CategoryList";
import { Layout } from "../components/Layout";

export function CategoriesPage({ history }: RouteComponentProps) {
  return (
    <Fetch
      url="https://www.themealdb.com/api/json/v1/1/categories.php"
      render={({ error, fetching, response }) => (
        <Layout title="Categories" error={error} fetching={fetching}>
          {response && (
            <CategoryList
              categories={
                (response as { categories: CategoryPayload[] }).categories
              }
              onCategoryPress={x => {
                history.push(`/categories/${x.strCategory}`);
              }}
            />
          )}
        </Layout>
      )}
    />
  );
}
