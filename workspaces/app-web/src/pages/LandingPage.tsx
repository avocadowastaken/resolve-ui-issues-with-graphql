import { BreedPayload } from "@app/types";
import cx from "classnames";
import { sample } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";

import { ApiStoreContext } from "../components/api-store-context/ApiStoreContext";
import { AppLayout } from "../components/layout/AppLayout";

interface Props {}

interface State {
  readonly error?: Error;
  readonly fetching: boolean;
  readonly breeds: BreedPayload[];
}

const colors = [
  "badge-primary",
  "badge-secondary",
  "badge-success",
  "badge-danger",
  "badge-warning",
  "badge-info",
  "badge-dark"
];

export class LandingPage extends React.Component<Props, State> {
  public static contextType = ApiStoreContext;

  public readonly context!: React.ContextType<typeof ApiStoreContext>;

  public readonly state: State = { fetching: true, breeds: [] };

  private listBreeds() {
    const { dog } = this.context;

    this.setState({ fetching: true, error: undefined });

    dog
      .listBreeds({})
      .then(breeds => {
        this.setState({ breeds, fetching: false });
      })
      .catch((error: Error) => {
        this.setState({ error, fetching: false });
      });
  }

  public componentDidMount(): void {
    this.listBreeds();
  }

  public render() {
    const { error, breeds, fetching } = this.state;

    return (
      <AppLayout
        brand={
          <>
            <span role="img" aria-label="Dog">
              🐶
            </span>
            &nbsp;
            <strong>Dogeful</strong>
          </>
        }
      >
        {error ? (
          <div>{error.message}</div>
        ) : fetching ? (
          <h1 className="d-flex justify-content-center">
            <span role="img" aria-label="Loading...">
              🌀
            </span>
          </h1>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-10 col-sm-12">
              <div className="d-flex justify-content-center flex-wrap">
                {breeds.map(x => (
                  <h4 key={x.id} className="m-1">
                    <Link
                      to={`breeds/${x.id}`}
                      className={cx("badge", sample(colors))}
                    >
                      {x.name}
                    </Link>
                  </h4>
                ))}
              </div>
            </div>
          </div>
        )}
      </AppLayout>
    );
  }
}
