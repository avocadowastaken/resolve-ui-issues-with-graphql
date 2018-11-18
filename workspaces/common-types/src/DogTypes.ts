export interface BreedsFilter {
  readonly page?: number;
  readonly limit?: number;
}

export interface BreedPayload {
  readonly id: number;
  readonly name: string;
}

export interface BreedPicturePayload {
  readonly id: string;
  readonly url: string;
}

export interface BreedDetailsPayload {
  readonly id: number;
  readonly bredFor: string;
  readonly lifeSpan: string;
  readonly breedGroup: string;
  readonly temperament: string;
  readonly height: string;
  readonly weight: string;
}
