import {
  BreedDetailsPayload,
  BreedPayload,
  BreedPicturePayload
} from "@app/types";
import * as React from "react";
import { Link } from "react-router-dom";

import { ApiStoreContext } from "../components/api-store-context/ApiStoreContext";
import { AppBreadcrumb } from "../components/layout/AppBreadcrumb";
import { AppLayout } from "../components/layout/AppLayout";

interface Props {
  readonly id: string;
}

interface State {
  readonly error?: Error;
  readonly fetching: boolean;
  readonly breed?: BreedPayload;
  readonly breedDetails?: BreedDetailsPayload;
  readonly breedPictures?: BreedPicturePayload[];
}

export class BreedPage extends React.Component<Props, State> {
  public static contextType = ApiStoreContext;

  public readonly context!: React.ContextType<typeof ApiStoreContext>;

  public readonly state: State = {
    fetching: true
  };

  public fetchBreed() {
    const { id } = this.props;
    const { dog } = this.context;

    this.setState({
      fetching: true,
      error: undefined,
      breed: undefined,
      breedDetails: undefined,
      breedPictures: undefined
    });

    Promise.all([
      dog.getBreed(id),
      dog.getBreedDetails(id),
      dog.getBreedPictures(id)
    ])
      .then(([breed, breedDetails, breedPictures]) => {
        const { id: currentId } = this.props;

        if (id === currentId) {
          this.setState({
            fetching: false,

            breed,
            breedDetails,
            breedPictures
          });
        }
      })
      .catch((error: Error) => {
        const { id: currentId } = this.props;

        if (id === currentId) {
          this.setState({ error, fetching: false });
        }
      });
  }

  public componentDidMount(): void {
    this.fetchBreed();
  }

  public componentDidUpdate(prevProps: Readonly<Props>): void {
    const { id } = this.props;

    if (id !== prevProps.id) {
      this.fetchBreed();
    }
  }

  public render() {
    const { error, fetching, breed, breedDetails, breedPictures } = this.state;

    return (
      <AppLayout
        brand={
          !breed || fetching ? (
            <>
              <span role="img" aria-label="Loading">
                🌀
              </span>{" "}
              Loading...
            </>
          ) : (
            <>
              <span role="img" aria-label="Dog">
                🐕
              </span>
              &nbsp;
              <strong>{breed.name}</strong>
            </>
          )
        }
      >
        <AppBreadcrumb
          path={[
            <Link to="/">Home</Link>,
            breed ? (
              breed.name
            ) : (
              <span role="img" aria-label="Loading">
                🌀
              </span>
            )
          ]}
        />

        {error ? (
          <div>{error.message}</div>
        ) : (
          breed != null &&
          breedDetails != null && (
            <div className="jumbotron">
              <div className="d-flex">
                <div className="d-flex flex-grow-1 flex-column">
                  <div>
                    <h1 className="display-4">{breed.name}</h1>
                    <p className="lead">{breedDetails.temperament}</p>
                    <hr className="mr-3 my-4" />
                  </div>

                  <p>
                    Originally bred for: <strong>{breedDetails.bredFor}</strong>
                    <br />
                    Height: <strong>{breedDetails.height}</strong>
                    <br />
                    Weight: <strong>{breedDetails.weight}</strong>
                    <br />
                    Life span: <strong>{breedDetails.lifeSpan}</strong>
                  </p>
                </div>

                {breedPictures && breedPictures.length > 0 && (
                  <div>
                    <img
                      width={300}
                      alt={breed.name}
                      src={breedPictures[0].url}
                      className="rounded float-right"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </AppLayout>
    );
  }
}
