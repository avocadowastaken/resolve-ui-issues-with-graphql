import * as React from "react";

import { Fetch } from "./api/Fetch";
import { BreedPayload, BreedPicture } from "./api/Types";
import { PupCard } from "./PupCard";
import { PupModal } from "./PupModal";
import { PupModalWrapper } from "./PupModalWrapper";

interface Props {
  readonly breed: BreedPayload;
  readonly onPick: () => void;
}

interface State {
  readonly infoVisible: boolean;
}

export class PupCardWrapper extends React.Component<Props, State> {
  public readonly state: State = { infoVisible: false };

  public render() {
    const { breed } = this.props;
    const { infoVisible } = this.state;

    return (
      <Fetch
        url={`https://api.thedogapi.com/v1/images/search?breed_id=${breed.id}`}
        render={({ error, response, fetching }) =>
          error ? (
            <div>Error</div>
          ) : !response || fetching ? (
            <div>Fetching...</div>
          ) : (
            <>
              <PupCard
                {...this.props}
                picture={(response as BreedPicture[])[0]}
                onInfoClick={() => this.setState({ infoVisible: true })}
              />

              <PupModalWrapper
                breedId={breed.id}
                isOpen={infoVisible}
                onRequestClose={() => this.setState({ infoVisible: false })}
              />
            </>
          )
        }
      />
    );
  }
}
