import { sample } from "lodash";
import * as React from "react";

import { BreedPayload } from "./api/Types";
import { PupCardWrapper } from "./PupCardWrapper";

interface Props {
  readonly breeds: BreedPayload[];
}

interface State {
  readonly shown: Set<number>;
  readonly left: null | BreedPayload;
  readonly right: null | BreedPayload;
}

function getRandom(
  breeds: BreedPayload[],
  shown: Set<number>,
): null | BreedPayload {
  if (breeds.length !== shown.size) {
    const breed = sample(breeds);

    if (breed) {
      if (shown.has(breed.id)) {
        return getRandom(breeds, shown);
      }

      return breed;
    }
  }

  return null;
}

export class Breedster extends React.Component<Props, State> {
  public readonly state: State = {
    left: null,
    right: null,
    shown: new Set(),
  };

  private start = () =>
    this.setState(({ shown }, { breeds }) => {
      const left = getRandom(breeds, shown);

      if (left) {
        shown.add(left.id);
      }

      const right = getRandom(breeds, shown);

      if (right) {
        shown.add(right.id);
      }

      return { left, right, shown: new Set(shown) };
    });

  public pickLeft = () =>
    this.setState(({ shown }, { breeds }) => {
      const right = getRandom(breeds, shown);

      if (right) {
        shown.add(right.id);
      }

      return { right, shown: new Set(shown) };
    });

  public pickRight = () =>
    this.setState(({ shown }, { breeds }) => {
      const left = getRandom(breeds, shown);

      if (left) {
        shown.add(left.id);
      }

      return { left, shown: new Set(shown) };
    });

  public render() {
    const { shown, left, right } = this.state;

    return (
      <div className="d-flex align-items-center justify-content-center">
        {shown.size === 0 ? (
          <button
            type="button"
            onClick={this.start}
            className="btn btn-primary"
          >
            Start!
          </button>
        ) : left && right ? (
          <div className="row">
            <div className="col-sm-6">
              <PupCardWrapper breed={left} onPick={this.pickLeft} />
            </div>

            <div className="col-sm-6">
              <PupCardWrapper breed={right} onPick={this.pickRight} />
            </div>
          </div>
        ) : (
          <div>Todo...</div>
        )}
      </div>
    );
  }
}
