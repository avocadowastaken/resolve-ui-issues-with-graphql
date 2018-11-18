import * as React from "react";

import { DogApi } from "../../api/DogApi";

export interface ApiStoreContextValue {
  readonly dog: DogApi;
}

export const ApiStoreContext = React.createContext<ApiStoreContextValue>({
  dog: new DogApi()
});
