import {
  BreedDetailsPayload,
  BreedPayload,
  BreedPicturePayload,
  BreedsFilter
} from "@app/types";
import { createPromiseMemo } from "@app/utils";
import axios from "axios";

export class DogService {
  private readonly client = axios.create({
    baseURL: "https://api.thedogapi.com",
    headers: {
      "X-API-Key": this.apiKey
    }
  });

  public constructor(private readonly apiKey: string) {
    // Noop.
  }

  public readonly getBreed = createPromiseMemo<string, BreedPayload>(id =>
    this.client
      .get(`/v1/breeds/${id}`)
      .then(({ data: x }) => ({ id: x.id, name: x.name }))
  );

  public readonly getBreedDetails = createPromiseMemo<
    string,
    BreedDetailsPayload
  >(id =>
    this.client.get(`/v1/breeds/${id}`).then(({ data: x }) => ({
      id: x.id,
      bredFor: x.bred_for,
      lifeSpan: x.life_span,
      breedGroup: x.breed_group,
      temperament: x.temperament,
      height: x.height && x.height.metric,
      weight: x.weight && x.weight.metric
    }))
  );

  public readonly getBreedPictures = createPromiseMemo<
    string,
    BreedPicturePayload[]
  >(id =>
    this.client
      .get("/v1/images/search", { params: { breed_id: id } })
      .then(({ data }) =>
        data.map((x: BreedPicturePayload) => ({ id: x.id, url: x.url }))
      )
  );

  public readonly listBreeds = createPromiseMemo<BreedsFilter, BreedPayload[]>(
    params => this.client.get("/v1/breeds", { params }).then(x => x.data),
    {
      stringifyKey: ({ page, limit }) => [page, limit].join("|")
    }
  );
}
