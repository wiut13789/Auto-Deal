import Link from "next/link";
import { AnnouncementsGridProps } from "./index.interface";
import { AnnouncementCard } from "../AnnouncementCard";

export const AnnouncementsGrid: React.FC<AnnouncementsGridProps> = ({
  items,
}) => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Link key={item._id} href={`/car/${item._id}`} className="no-underline">
          <AnnouncementCard {...item} />
        </Link>
      ))}
    </div>
  </div>
);
