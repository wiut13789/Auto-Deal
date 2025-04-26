import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { bodyType } from "@/data/bodyType";
import { fuelType } from "@/data/fuelType";
import { transmissionType } from "@/data/transmission-type";

const CarPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  let data;

  try {
    const { id } = await params;

    const response = await fetch(
      `${process.env.SERVER_URL}/ads/get_detail/${id}`
    );

    data = await response.json();

    if (!data) return null;
  } catch (error: any) {
    console.log(error.message);
  }

  const body = bodyType[data.model].find(
    (item) => item.id === data!.bodyType
  )?.name;

  const fuel = fuelType[data.model].find(
    (item) => item.id === data!.fuelType
  )?.name;

  const transmission = transmissionType[data.model].find(
    (item) => item.id === data!.transmissionType
  )?.name;

  const carImage =
    "https://public.readdy.ai/ai/img_res/f0d671a43cf44c11de0f5fabf30b6f55.jpg";

  return (
    <div className="w-full">
      <div className="w-[1440px] mx-auto py-6 px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="max-w-4xl mx-auto">
            {/* Image */}
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
              <img
                src={carImage}
                alt="Car image"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
              {/* Left info */}
              <div>
                <h1 className="text-3xl font-bold mb-2 uppercase">
                  {data.brand}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <span>ID: {data._id}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    variant="outline"
                    className="!rounded-button uppercase bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    {body}
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    {data.year}
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    {fuel}
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    {transmission}
                  </Button>
                </div>
              </div>

              {/* Phone Number */}
              <div className="bg-gray-50 p-4 rounded-lg min-w-[200px]">
                <div className="text-lg font-semibold">{data.phoneNumber}</div>
              </div>
            </div>

            {/* Separator */}
            <Separator className="my-6" />

            {/* Characteristics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-medium mb-4">Characteristics</h2>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Brand</span>
                    <span className="w-1/2">{data.brand}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Model</span>
                    <span className="w-1/2">{data.model}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">
                      Manufacture year
                    </span>
                    <span className="w-1/2">{data.year}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Mileage</span>
                    <span className="w-1/2">{data.kilometers} км</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Body type</span>
                    <span className="w-1/2">{body}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Color</span>
                    <span className="w-1/2">{data.color}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Fuel type</span>
                    <span className="w-1/2">{fuel}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">
                      Transmission type
                    </span>
                    <span className="w-1/2">{transmission}</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Previous owners</span>
                    <span className="w-1/2">{data.previousOwners}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <Separator className="my-6" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Description</h2>
              <p className="text-gray-700">{data.description}</p>
            </div>

            {/* Separator */}
            <Separator className="my-6" />

            {/* Location */}
            <div>
              <h2 className="text-xl font-medium mb-4">Location</h2>
              <p className="text-gray-700">
                {data.region.charAt(0).toUpperCase() + data.region.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
