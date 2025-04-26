export interface IAnnouncement {
  bodyType: string;
  brand: string;
  color: string;
  description: string;
  fuelType: string;
  isNew: boolean;
  kilometers: string;
  model: string;
  phoneNumber: string;
  photo: string | null;
  previousOwners: string;
  price: number;
  region: string;
  transmissionType: string;
  year: string;
  _id: string;
}

export interface AnnouncementsGridProps {
  items: IAnnouncement[];
}
