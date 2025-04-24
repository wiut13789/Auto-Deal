interface IModel {
  id: string;
  name: string;
}

type TModel = Record<string, IModel[]>;

export const models: TModel = {
  chevrolet: [
    {
      id: "malibu",
      name: "Malibu",
    },
    {
      id: "gentra",
      name: "Gentra",
    },
    {
      id: "spark",
      name: "Spark",
    },
    {
      id: "damas",
      name: "Damas",
    },
    {
      id: "cobalt",
      name: "Cobalt",
    },
  ],
  byd: [
    {
      id: "chazor",
      name: "Chazor",
    },
    {
      id: "song",
      name: "Song Plus",
    },
    {
      id: "d1",
      name: "D1",
    },
  ],
  bmw: [
    {
      id: "m5",
      name: "M5",
    },
    {
      id: "x7",
      name: "X7",
    },
  ],
  leapmotor: [
    {
      id: "c11",
      name: "C11",
    },
  ],
};
