import {
  BreedDetailsPayload,
  BreedPayload,
  BreedPicturePayload,
  BreedsFilter
} from "@app/types";
import { createPromiseMemo } from "@app/utils";
import axios from "axios";

export class DogApi {
  private readonly client = axios.create({
    baseURL: "//localhost:3010"
  });

  public readonly getBreed = createPromiseMemo<string, BreedPayload>(id =>
    this.client.get(`/api/breeds/${id}`).then(x => x.data)
  );

  public readonly getBreedDetails = createPromiseMemo<
    string,
    BreedDetailsPayload
  >(id => this.client.get(`/api/breeds/${id}/details`).then(x => x.data));

  public readonly getBreedPictures = createPromiseMemo<
    string,
    BreedPicturePayload[]
  >(id => this.client.get(`/api/breeds/${id}/pictures`).then(x => x.data));

  public readonly listBreeds = createPromiseMemo<BreedsFilter, BreedPayload[]>(
    (params: BreedsFilter) =>
      this.client.get("/api/breeds", { params }).then(x => x.data),
    { stringifyKey: ({ page, limit }) => [page, limit].join("|") }
  );
}
