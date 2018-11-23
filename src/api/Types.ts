export interface BreedPayload {
  readonly id: number;
  readonly name: string;
}

export interface BreedPicture {
  readonly id: string;
  readonly url: string;
}

export interface BreedInfo {
  readonly id: number;
  readonly name: string;
  readonly weight: string;
  readonly height: string;
  // eslint-disable-next-line camelcase
  readonly life_span: string;
  // eslint-disable-next-line camelcase
  readonly bred_for: string;
  // eslint-disable-next-line camelcase
  readonly breed_group: string;
}

export interface CategoryPayload {
  readonly idCategory: string;
  readonly strCategory: string;
  readonly strCategoryThumb: string;
  readonly strCategoryDescription: string;
}

export interface MealPayload {
  readonly idMeal: string;
  readonly strMeal: string;
  readonly strMealThumb: string;
}

export interface MealDetailsPayload extends MealPayload {
  readonly strCategory: string;
  readonly strInstructions: string;

  readonly [key: string]: string;
}
