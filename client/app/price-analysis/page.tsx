"use client";

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { colors } from "@/data/colors";
import { brands } from "@/data/brands";
import { models } from "@/data/models";
import { manufactureYear } from "@/data/manufactureYear";
import { generateYears } from "@/utils";
import { transmissionType } from "@/data/transmission-type";
import { bodyType } from "@/data/bodyType";
import { fuelType } from "@/data/fuelType";
import { regions } from "@/data/regions";
const App: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "2025",
    bodyType: "",
    fuelType: "",
    transmissionType: "",
    kilometers: "0",
    previousOwners: "",
    region: "",
  });

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
  };
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Calculate a sample price based on inputs
      const basePrice = 25000;
      const yearFactor = (2025 - parseInt(formData.year)) * 1000;
      const kmFactor = parseInt(formData.kilometers) * 0.05;
      const ownersFactor = formData.previousOwners
        ? parseInt(formData.previousOwners) * 1500
        : 0;

      let fuelTypeFactor = 0;
      switch (formData.fuelType) {
        case "electric":
          fuelTypeFactor = 5000;
          break;
        case "hybrid":
          fuelTypeFactor = 3000;
          break;
        case "diesel":
          fuelTypeFactor = 1000;
          break;
        default:
          fuelTypeFactor = 0;
      }

      const calculatedPrice =
        basePrice - yearFactor - kmFactor - ownersFactor + fuelTypeFactor;
      const finalPrice = Math.max(calculatedPrice, 1000);

      setPredictedPrice(finalPrice);
      setShowResult(true);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    handleSelectChange("model", "");
  }, [formData.brand]);

  useEffect(() => {
    handleSelectChange("year", "");
    handleSelectChange("bodyType", "");
    handleSelectChange("fuelType", "");
    handleSelectChange("transmissionType", "");
  }, [formData.model]);

  return (
    <div className=" bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Car Value Calculator
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 pb-8">
            <div className="grid gap-6">
              <div className="grid gap-3">
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

              <div className="grid gap-3">
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

              <div className="grid gap-3">
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
                <span className="text-xs text-gray-500">(1990-2025)</span>
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="bodyType"
                  className="text-sm text-gray-500 mb-1"
                >
                  Body type
                </Label>

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

              <div className="grid gap-3">
                <Label
                  htmlFor="fuelType"
                  className="text-sm text-gray-500 mb-1"
                >
                  Fuel type
                </Label>

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
              <div className="grid gap-3">
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

              <div className="grid gap-3">
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

              <div className="mt-4">
                <Label className="text-sm text-gray-500 mb-1">Body color</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-8 h-8 rounded-full ${color.color} ${
                        selectedColor === color.id
                          ? "ring-2 ring-offset-2 ring-green-500"
                          : ""
                      }`}
                      onClick={() => handleColorSelect(color.id)}
                    />
                  ))}
                </div>
              </div>
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

              <div className="grid gap-3">
                <Label className="text-sm text-gray-500 mb-1">Location</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleSelectChange("region", value)}
                >
                  <SelectTrigger id="region" className="border-gray-300">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id.toString()}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSubmit}
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
                    <div className="text-sm text-gray-500">
                      Confidence Range
                    </div>
                    <div className="font-medium">
                      ${Math.floor(predictedPrice! * 0.9).toLocaleString()} - $
                      {Math.ceil(predictedPrice! * 1.1).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
