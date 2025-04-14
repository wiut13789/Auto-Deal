import Image from "next/image";

import { AnnouncementsGridProps } from "./index.interface";
import Link from "next/link";

// ({
//   price: {
//     value: 29200,
//     currency: "USD",
//   },
// });

export const AnnouncementsGrid = ({ items }: AnnouncementsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-[29px]">
      {items.map((item) => (
        <Link href={`/car/${item.id}`}>
          <div key={item.id} className="p-2.5 flex flex-col border rounded-md">
            {"imagePath" in item && (
              <div className="w-full h-[228px]">
                <Image src={item.imagePath} fill alt={item.title} />
              </div>
            )}
            <h2 className="font-medium">{item.title}</h2>
            <span>{item.price}</span>
            <span>
              {item.year} / {item.distance} km
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
