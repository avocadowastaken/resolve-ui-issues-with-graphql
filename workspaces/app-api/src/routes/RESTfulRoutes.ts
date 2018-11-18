import { Router } from "express";

import { DogService } from "../services/DogService";

interface Options {
  readonly apiKey: string;
}

export function createRESTfulRoutes({ apiKey }: Options): Router {
  const dogService = new DogService(apiKey);

  return Router()
    .use((_req, res, next) => {
      res.set("Content-Type", "application/json");

      next();
    })
    .get("/api/breeds/:id", ({ params: { id } }, res, next) =>
      dogService
        .getBreed(id)
        .then(x => res.json(x))
        .catch(next)
    )
    .get("/api/breeds/:id/details", ({ params: { id } }, res, next) =>
      dogService
        .getBreedDetails(id)
        .then(x => res.json(x))
        .catch(next)
    )
    .get("/api/breeds/:id/pictures", ({ params: { id } }, res, next) =>
      dogService
        .getBreedPictures(id)
        .then(x => res.json(x))
        .catch(next)
    )
    .get("/api/breeds", ({ query }, res, next) =>
      dogService
        .listBreeds(query)
        .then(x => res.json(x))
        .catch(next)
    );
}
