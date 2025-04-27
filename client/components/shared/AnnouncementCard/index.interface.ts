// components/shared/AnnouncementCard/index.interface.ts
export interface AnnouncementCardProps {
  _id: string;
  photo?: string;
  brand: string;
  model: string;
  price: { value: number; currency: string };
  year: number;
  kilometers: number;
}
