import * as React from "react";
import * as ReactDOM from "react-dom";

import { Fetch } from "./api/Fetch";
import { BreedPayload } from "./api/Types";
import { Breedster } from "./Breedster";

function App() {
  return (
    <div
      style={{ height: "100vh" }}
      className="container d-flex flex-grow-1 align-items-center justify-content-center"
    >
      <Fetch
        url="https://api.thedogapi.com/v1/breeds"
        render={({ error, response, fetching }) =>
          error ? (
            <h5 className="text-center">{error.message}</h5>
          ) : fetching ? (
            <h5 className="text-center">
              Fetching...{" "}
              <span role="img" aria-label="Pup">
                🐶
              </span>
            </h5>
          ) : (
            <Breedster breeds={response as BreedPayload[]} />
          )
        }
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
