export interface IAnnouncement {
  id: number;
  title: string;
  price: string;
  model: string;
  year: string;
  distance: string;
  imagePath: string;
}

export interface AnnouncementsGridProps {
  items: IAnnouncement[];
}
