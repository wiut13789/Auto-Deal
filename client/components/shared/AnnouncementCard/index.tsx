import Image from "next/image";
import { AnnouncementCardProps } from "./index.interface";

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  photo,
  brand,
  model,
  price,
  year,
  kilometers,
}) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col">
    <div className="relative w-full h-48">
      {photo ? (
        <Image
          src={photo.startsWith("/") ? photo : "/" + photo}
          alt={`${brand} ${model}`}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          No Image
        </div>
      )}
    </div>
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h2 className="text-base font-medium uppercase text-gray-800 mb-1">
          {brand} {model}
        </h2>
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {price.toLocaleString()} USD
        </div>
      </div>
      <div className="text-gray-500 text-sm">
        {year} / {kilometers.toLocaleString()} km
      </div>
    </div>
  </div>
);
