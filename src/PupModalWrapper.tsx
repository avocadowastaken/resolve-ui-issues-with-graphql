import * as React from "react";

import { Fetch } from "./api/Fetch";
import { BreedInfo } from "./api/Types";
import { PupModal } from "./PupModal";

interface Props {
  readonly breedId: number;
  readonly isOpen: boolean;
  readonly onRequestClose: () => void;
}

export function PupModalWrapper({ breedId, ...props }: Props) {
  return (
    <Fetch
      url={`https://api.thedogapi.com/v1/breeds/${breedId}`}
      render={({ error, fetching, response }) => (
        <PupModal
          {...props}
          error={error}
          fetching={fetching}
          info={response as BreedInfo}
        />
      )}
    />
  );
}
