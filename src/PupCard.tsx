import * as React from "react";

import { BreedPayload, BreedPicture } from "./api/Types";

interface Props {
  readonly breed: BreedPayload;
  readonly picture: BreedPicture;

  readonly onPick: () => void;
  readonly onInfoClick: () => void;
}

export function PupCard({ breed, picture, onPick, onInfoClick }: Props) {
  return (
    <div className="card">
      {picture != null && (
        <div
          style={{
            overflow: "hidden",
            maxHeight: "200px",
            minHeight: "200px",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <img className="card-img-top" src={picture.url} alt={breed.name} />
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{breed.name}</h5>

        <div className="d-flex justify-content-between">
          <button type="button" onClick={onPick} className="btn btn-primary">
            Me{" "}
            <span role="img" aria-label="Heart">
              ❤️
            </span>
          </button>

          <button type="button" onClick={onInfoClick} className="btn btn-info">
            Info{" "}
            <span role="img" aria-label="Paw">
              🐾
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
