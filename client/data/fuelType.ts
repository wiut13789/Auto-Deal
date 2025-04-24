interface IFuelType {
  id: string;
  name: string;
}

type TFuelType = Record<string, IFuelType[]>;

export const fuelType: TFuelType = {
  malibu: [
    { id: "gasoline", name: "Gasoline" },
    { id: "hybrid", name: "Hybrid" },
    { id: "gasoline_cng", name: "Gasoline + CNG" }, // Dual
  ],
  spark: [
    { id: "gasoline", name: "Gasoline" },
    { id: "gasoline_lpg", name: "Gasoline + LPG" }, // Dual
  ],
  gentra: [
    { id: "gasoline", name: "Gasoline" },
    { id: "gasoline_cng", name: "Gasoline + CNG" },
  ],
  damas: [
    { id: "gasoline", name: "Gasoline" },
    { id: "gasoline_cng", name: "Gasoline + CNG" },
  ],
  cobalt: [
    { id: "gasoline", name: "Gasoline" },
    { id: "gasoline_cng", name: "Gasoline + CNG" },
  ],
  chazor: [{ id: "electric", name: "Electric" }],
  song: [
    { id: "electric", name: "Electric" },
    { id: "hybrid", name: "Hybrid" },
    { id: "electric_hybrid", name: "Electric + Hybrid" }, // Dual
  ],
  d1: [{ id: "electric", name: "Electric" }],
  c11: [{ id: "electric", name: "Electric" }],
  x7: [
    { id: "gasoline", name: "Gasoline" },
    { id: "diesel", name: "Diesel" },
    { id: "hybrid", name: "Hybrid" },
  ],
  m5: [
    { id: "gasoline", name: "Gasoline" },
    { id: "hybrid", name: "Hybrid" },
  ],
};
