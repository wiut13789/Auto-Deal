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
  console.log(items);

  return (
    <div className="grid grid-cols-3 gap-[29px]">
      {items.map((item) => (
        <Link
          key={item._id}
          className="p-2.5 flex flex-col border rounded-md"
          href={`/car/${item._id}`}
        >
          <div>
            {"imagePath" in item && (
              <div className="w-full h-[228px]">
                <Image src={item.imagePath} fill alt={item.brand} />
              </div>
            )}
            <h2 className="font-medium uppercase">{item.brand}</h2>
            <span>{item.price}</span>
            <span>
              {item.year} / {item.kilometers} km
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
