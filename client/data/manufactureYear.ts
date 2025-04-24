interface IYear {
  from: number;
  to: number;
}

type TManufactureYear = Record<string, IYear>;

export const manufactureYear: TManufactureYear = {
  malibu: {
    from: 2012,
    to: 2025,
  },
  spark: {
    from: 2010,
    to: 2025,
  },
  damas: {
    from: 1996,
    to: 2025,
  },
  cobalt: {
    from: 2013,
    to: 2025,
  },
  gentra: {
    from: 2013,
    to: 2025,
  },
  // BYD models
  chazor: {
    from: 2023, // Introduced in Uzbekistan
    to: 2025,
  },
  song: {
    from: 2023, // Song Plus DM-i available in Uzbekistan since 2023
    to: 2025,
  },
  d1: {
    from: 2020, // Originally launched in China; not officially sold in Uzbekistan as of now
    to: 2025,
  },
  // BMW models
  m5: {
    from: 1985, // Global debut (E28)
    to: 2025, // Currently in production (G90)
  },
  x7: {
    from: 2018, // First generation launched
    to: 2025,
  },
  // Leapmotor model
  c11: {
    from: 2021, // Global release year
    to: 2025,
  },
};
