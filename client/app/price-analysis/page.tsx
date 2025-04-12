"use client";

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "2025",
    fuelType: "",
    transmissionType: "",
    kilometers: "0",
    previousOwners: "",
    location: "",
  });

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

  const generateYearOptions = () => {
    const years = [];
    for (let year = 2025; year >= 1990; year--) {
      years.push(year);
    }
    return years;
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

  return (
    <div className=" bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Car Value Calculator
              </CardTitle>
              <Badge variant="outline" className="text-gray-600">
                Today: April 2, 2025
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 pb-8">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="brand" className="text-gray-700">
                  Car Brand
                </Label>
                <Input
                  id="brand"
                  name="brand"
                  placeholder="Enter car brand (e.g. Toyota, Honda)"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="border-gray-300 "
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="model" className="text-gray-700">
                  Car Model
                </Label>
                <Input
                  id="model"
                  name="model"
                  placeholder="Enter car model (e.g. Camry, Civic)"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="border-gray-300"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="year" className="text-gray-700">
                  Year of Manufacturing
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("year", value)}
                  defaultValue="2025"
                >
                  <SelectTrigger id="year" className="border-gray-300">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateYearOptions().map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs text-gray-500">(1990-2025)</span>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="fuelType" className="text-gray-700">
                  Fuel Type
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("fuelType", value)
                  }
                >
                  <SelectTrigger id="fuelType" className="border-gray-300">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="transmissionType" className="text-gray-700">
                  Transmission Type
                </Label>
                <Select
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
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                    <SelectItem value="semi-automatic">
                      Semi-automatic
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="kilometers" className="text-gray-700">
                  Kilometers Driven
                </Label>
                <Input
                  id="kilometers"
                  name="kilometers"
                  type="number"
                  placeholder="0"
                  value={formData.kilometers}
                  onChange={handleInputChange}
                  className="border-gray-300"
                  min="0"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="previousOwners" className="text-gray-700">
                  Number of Previous Owners
                </Label>
                <Input
                  id="previousOwners"
                  name="previousOwners"
                  placeholder="Enter number of previous owners"
                  value={formData.previousOwners}
                  onChange={handleInputChange}
                  className="border-gray-300"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="location" className="text-gray-700">
                  Current Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="border-gray-300 "
                />
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
      </div>
    </div>
  );
};

export default App;
