interface ITransmissionType {
  id: string;
  name: string;
}

type TTransmissionType = Record<string, ITransmissionType[]>;

export const transmissionType: TTransmissionType = {
  malibu: [
    {
      id: "manual",
      name: "Manual",
    },
    {
      id: "automatic",
      name: "Automatic",
    },
    {
      id: "hybrid",
      name: "Hybrid",
    },
    {
      id: "cvt",
      name: "CVT", //continuously variable transmission
    },
    {
      id: "ectv",
      name: "eCVT", // electronically continuously variable transmission
    },
  ],
  spark: [
    {
      id: "manual",
      name: "Manual",
    },
    {
      id: "automatic",
      name: "Automatic",
    },
    {
      id: "cvt",
      name: "CVT", //
    },
  ],
  gentra: [
    {
      id: "manual",
      name: "Manual",
    },
    {
      id: "automatic",
      name: "Automatic",
    },
  ],
  damas: [
    {
      id: "manual",
      name: "Manual",
    },
  ],
  cobalt: [
    {
      id: "manual",
      name: "Manual",
    },
    {
      id: "automatic",
      name: "Automatic",
    },
  ],
  // BYD models
  chazor: [
    {
      id: "automatic",
      name: "Automatic",
    },
    {
      id: "cvt",
      name: "CVT",
    },
  ],
  song: [
    {
      id: "automatic",
      name: "Automatic",
    },
    {
      id: "cvt",
      name: "CVT",
    },
  ],
  d1: [
    {
      id: "automatic",
      name: "Automatic",
    },
    {
      id: "cvt",
      name: "CVT",
    },
  ],
  // Leapmotor model
  c11: [
    {
      id: "automatic",
      name: "Automatic",
    },
    {
      id: "ecvt",
      name: "eCVT",
    },
  ],
  // BMW models
  x7: [
    { id: "automatic", name: "Automatic" },
    { id: "tiptronic", name: "Tiptronic" },
  ],
  m5: [
    { id: "automatic", name: "Automatic" },
    { id: "dual_clutch", name: "Dual-clutch" },
    { id: "manual", name: "Manual" },
  ],
};
