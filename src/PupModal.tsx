import * as React from "react";
import ReactModal from "react-modal";

import { BreedInfo } from "./api/Types";

interface Props {
  readonly isOpen: boolean;
  readonly onRequestClose: () => void;

  readonly error?: Error;
  readonly info: BreedInfo;
  readonly fetching: boolean;
}

export function PupModal({
  error,
  fetching,
  info,
  isOpen,
  onRequestClose,
}: Props) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {error ? (
        <div>Error</div>
      ) : fetching ? (
        <div>Fetching...</div>
      ) : (
        <pre>{JSON.stringify(info, null, 2)}</pre>
      )}
    </ReactModal>
  );
}
