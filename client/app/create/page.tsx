"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/data/colors";
import { brands } from "@/data/brands";
import { models } from "@/data/models";
import { manufactureYear } from "@/data/manufactureYear";
import { generateYears } from "@/utils";
import { transmissionType } from "@/data/transmission-type";
import { bodyType } from "@/data/bodyType";
import { fuelType } from "@/data/fuelType";
import { regions } from "@/data/regions";
import { useRouter } from "next/navigation";
import CarImageUploader from "@/components/shared/CarImageUploader";

const Create: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    kilometers: "0",
    isNew: null,
    bodyType: "",
    fuelType: "", //
    transmissionType: "", //gear type
    color: "",
    previousOwners: "",
    photo: "",
    description: "",
    phoneNumber: "",
    region: "",
    price: 0,
  });

  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleSelectChange = (name: string, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const router = useRouter();

  const handleCreateSubmit = async () => {
    try {
      if (!isFormFilled) return;

      const dataToSend = {
        ...formData,
        price: Number(formData.price),
      };

      console.log(dataToSend);
      const URL = "http://127.0.0.1:8000/api/v1/ads/create";

      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
      }

      const data = await response.json();

      console.log(data);

      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAnalyzeSubmit = async () => {
    setIsLoading(true);

    try {
      // const reqBody = {
      //   brand: formData.brand,
      //   model: formData.model,
      //   year: parseInt(formData.year),
      //   bodyType: formData.bodyType,
      //   fuelType: formData.fuelType,
      //   transmissionType: formData.transmissionType,
      //   kilometers: parseInt(formData.kilometers),
      //   color: formData.color,
      //   description: formData.description
      // };

      const dataToSend = {
        ...formData,
        price: Number(formData.price),
      };

      console.log(dataToSend);

      const response = await fetch(
        "http://localhost:8000/api/v1/ads/predict-price",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      setPredictedPrice(data.predicted_price);
      setShowResult(true);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSelectChange("model", "");
  }, [formData.brand]);

  useEffect(() => {
    handleSelectChange("isNew", Number(formData.kilometers) <= 300);
  }, [formData.kilometers]);

  useEffect(() => {
    handleSelectChange("year", "");
    handleSelectChange("bodyType", "");
    handleSelectChange("fuelType", "");
    handleSelectChange("transmissionType", "");
  }, [formData.model]);

  useEffect(
    () =>
      setIsFormFilled(
        !!formData.brand &&
          !!formData.bodyType &&
          !!formData.color &&
          !!formData.description &&
          !!formData.fuelType &&
          typeof formData.isNew !== "object" &&
          !!formData.model &&
          !!formData.phoneNumber &&
          !!Number(formData.previousOwners) &&
          !!formData.region &&
          !!formData.transmissionType &&
          !!formData.year &&
          !!Number(formData.price)
      ),
    [
      formData.brand,
      formData.bodyType,
      formData.color,
      formData.description,
      formData.fuelType,
      formData.isNew,
      formData.kilometers,
      formData.model,
      formData.phoneNumber,
      formData.previousOwners,
      formData.region,
      formData.transmissionType,
      formData.year,
      formData.price,
    ]
  );

  const handleImagesChange = (images: string | null) => {
    handleSelectChange("photo", images);
  };

  return (
    <div className="container">
      <Card className="p-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-8">
          {/* Basic info */}
          <div>
            <h2 className="text-lg font-medium mb-4">Basic information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="brandName"
                  className="text-sm text-gray-500 mb-1"
                >
                  Brand name
                </Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) => handleSelectChange("brand", value)}
                >
                  <SelectTrigger id="brandName" className="border-gray-300">
                    <SelectValue placeholder="Select brand name" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="modelName"
                  className="text-sm text-gray-500 mb-1"
                >
                  Model name
                </Label>
                <Select
                  disabled={!formData.brand}
                  value={formData.model}
                  onValueChange={(value) => handleSelectChange("model", value)}
                >
                  <SelectTrigger id="modelName" className="border-gray-300">
                    <SelectValue placeholder="Select brand name" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.brand &&
                      models[formData.brand]?.map((model) => (
                        <SelectItem key={model.id} value={model.id.toString()}>
                          {model.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Year</Label>
                <Select
                  disabled={!formData.model}
                  value={formData.year}
                  onValueChange={(value) => handleSelectChange("year", value)}
                >
                  <SelectTrigger id="year" className="border-gray-300">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.model &&
                      generateYears(
                        manufactureYear[formData.model]?.from,
                        manufactureYear[formData.model]?.to
                      ).map((year, index) => (
                        <SelectItem key={index} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Mileage</Label>
                <Input
                  type="number"
                  className="border-gray-300"
                  min={0}
                  placeholder="0"
                  onChange={(e) =>
                    handleSelectChange("kilometers", e.target.value)
                  }
                  value={formData.kilometers}
                />
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Status</Label>
                <div className="flex space-x-2 mt-1">
                  <Button
                    disabled={!!formData.isNew}
                    variant="outline"
                    className={`!rounded-button whitespace-nowrap disabled:cursor-not-allowed ${
                      Number(formData.kilometers) <= 300
                        ? "bg-green-100 hover:bg-green-100 hover:text-green-700 text-green-700 border-green-200 cursor-default"
                        : "bg-gray-100 text-gray-700 border-gray-200 disabled:hover:bg-gray-100"
                    }`}
                  >
                    New
                  </Button>
                  <Button
                    disabled={!formData.isNew}
                    variant="outline"
                    className={`!rounded-button whitespace-nowrap disabled:cursor-not-allowed ${
                      Number(formData.kilometers) > 300
                        ? "bg-green-100 hover:bg-green-100 hover:text-green-700 text-green-700 border-green-200 cursor-default"
                        : "bg-gray-100 text-gray-700 border-gray-200 disabled:hover:bg-gray-100"
                    }`}
                  >
                    Used
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Car specifications */}
          <div>
            <h2 className="text-lg font-medium mb-4">Characteristics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="bodyType"
                  className="text-sm text-gray-500 mb-1"
                >
                  Body type
                </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Select
                    disabled={!formData.model}
                    value={formData.bodyType}
                    onValueChange={(value) =>
                      handleSelectChange("bodyType", value)
                    }
                  >
                    <SelectTrigger id="bodyType" className="border-gray-300">
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.model &&
                        bodyType[formData.model]?.map((bodyType) => (
                          <SelectItem
                            key={bodyType.id}
                            value={bodyType.id.toString()}
                          >
                            {bodyType.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label
                  htmlFor="fuelType"
                  className="text-sm text-gray-500 mb-1"
                >
                  Fuel type
                </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Select
                    disabled={!formData.model}
                    value={formData.fuelType}
                    onValueChange={(value) =>
                      handleSelectChange("fuelType", value)
                    }
                  >
                    <SelectTrigger id="fuelType" className="border-gray-300">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.model &&
                        fuelType[formData.model]?.map((fuelType) => (
                          <SelectItem
                            key={fuelType.id}
                            value={fuelType.id.toString()}
                          >
                            {fuelType.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="transmissionType"
                  className="text-sm text-gray-500 mb-1"
                >
                  Transmission type
                </Label>
                <Select
                  disabled={!formData.model}
                  value={formData.transmissionType}
                  onValueChange={(value) =>
                    handleSelectChange("transmissionType", value)
                  }
                >
                  <SelectTrigger
                    id="transmissionType"
                    className="border-gray-300"
                  >
                    <SelectValue placeholder="Select transmission type" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.model &&
                      transmissionType[formData.model]?.map(
                        (transmissionType) => (
                          <SelectItem
                            key={transmissionType.id}
                            value={transmissionType.id.toString()}
                          >
                            {transmissionType.name}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Color selection */}
            <div className="mt-4">
              <Label className="text-sm text-gray-500 mb-1">Body color</Label>
              <div className="flex flex-wrap gap-3 mt-2">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    style={{ backgroundColor: color.color }}
                    className={`w-8 h-8 rounded-full border border-[#d1d5db] ${
                      formData.color === color.id
                        ? "ring-2 ring-offset-2 ring-green-500"
                        : ""
                    }`}
                    onClick={() => handleSelectChange("color", color.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Ownership */}
          <div>
            <h2 className="text-lg font-medium mb-4">Ownership</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  The number of owners
                </Label>
                <div className="flex items-center space-x-4 mt-1">
                  <Input
                    type="number"
                    className="w-20 h-8 border-gray-300"
                    min={0}
                    placeholder="0"
                    value={formData.previousOwners}
                    onChange={(e) =>
                      handleSelectChange("previousOwners", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Photo section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Car images</h2>
            <div className="max-w-[700px] mx-auto">
              <CarImageUploader onImageChange={handleImagesChange} />
            </div>
          </div>

          <Separator />

          {/* Description section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Description</h2>
            <Textarea
              className="min-h-[120px] border-gray-300"
              placeholder="Describe the condition of the car, its configuration, and features."
              value={formData.description}
              onChange={(e) => {
                if (formData.description.length < 80) {
                  handleSelectChange("description", e.target.value);
                }
              }}
            />
            <p className="text-sm text-gray-500 mt-2">
              At least 80 characters. Currently: {formData.description.length}
            </p>
          </div>

          <Separator />

          {/* Contacts section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium mb-4">Contacts</h2>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-500 mb-1">
                    Phone number
                  </Label>
                  <Input
                    className="border-gray-300"
                    placeholder="+998991234567"
                    value={formData.phoneNumber}
                    type="number"
                    onChange={(e) =>
                      handleSelectChange("phoneNumber", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-500 mb-1">Location</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) =>
                      handleSelectChange("region", value)
                    }
                  >
                    <SelectTrigger id="region" className="border-gray-300">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem
                          key={region.id}
                          value={region.id.toString()}
                        >
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Price section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Price</h2>
            <div className="flex items-center">
              <Input
                type="number"
                className="border-gray-300 text-right"
                placeholder="0"
                value={formData.price}
                onChange={(e) => handleSelectChange("price", e.target.value)}
              />
              <span className="ml-2 text-lg">$</span>
            </div>
          </div>
        </div>

        {/* create adv btn */}

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            disabled={!isFormFilled}
            onClick={handleCreateSubmit}
            className="bg-slate-400 text-white py-6 px-10 text-lg font-medium !rounded-button whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
          >
            Create advertisement
          </Button>
        </div>
        {/* analyzing btn */}
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            onClick={handleAnalyzeSubmit}
            className="bg-[#38A65B] text-white py-6 px-10 text-lg font-medium !rounded-button whitespace-nowrap cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                Analyzing...
              </>
            ) : (
              "Analyze Car Price"
            )}
          </Button>
        </div>

        {showResult && (
          <div className="mt-8 animate-fadeIn">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  Estimated Car Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <div className="text-4xl font-bold text-[#38A65B] mb-2">
                    ${predictedPrice?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Estimated market value based on your vehicle details
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    <div>
                      <div className="text-sm text-gray-500">
                        Confidence Range
                      </div>
                      <div className="font-medium">
                        ${Math.floor(predictedPrice! * 0.9).toLocaleString()} -
                        ${Math.ceil(predictedPrice! * 1.1).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Valuation Date
                      </div>
                      <div className="font-medium">April 2, 2025</div>
                    </div>
                  </div>

                  <Alert className="mt-6 bg-blue-50 border-blue-200">
                    <i className="fas fa-info-circle mr-2"></i>
                    <AlertTitle>Market Insight</AlertTitle>
                    <AlertDescription>
                      This valuation is based on current market conditions and
                      similar vehicles in your area.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Create;
