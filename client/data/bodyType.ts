interface IBodyType {
  id: string;
  name: string;
}

type TBodyType = Record<string, IBodyType[]>;

export const bodyType: TBodyType = {
  malibu: [{ id: "sedan", name: "Sedan" }],
  spark: [{ id: "hatchback", name: "Hatchback" }],
  gentra: [{ id: "sedan", name: "Sedan" }],
  damas: [{ id: "minivan", name: "Minivan" }],
  cobalt: [{ id: "sedan", name: "Sedan" }],
  // BYD models
  chazor: [{ id: "sedan", name: "Sedan" }],
  song: [{ id: "suv", name: "SUV" }],
  d1: [{ id: "minivan", name: "Minivan" }],
  // Leapmotor model
  c11: [{ id: "suv", name: "SUV" }],
  // BMW models
  x7: [{ id: "suv", name: "SUV" }],
  m5: [{ id: "sedan", name: "Sedan" }],
};
