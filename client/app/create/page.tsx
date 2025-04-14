"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Create: React.FC = () => {
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

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("950 000");
  const [activeTab, setActiveTab] = useState("edit");
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const colors = [
    { id: "black", color: "bg-black" },
    { id: "white", color: "bg-white border border-gray-300" },
    { id: "gray", color: "bg-gray-400" },
    { id: "red", color: "bg-red-500" },
    { id: "blue", color: "bg-blue-600" },
    { id: "purple", color: "bg-purple-500" },
    { id: "green", color: "bg-green-500" },
    { id: "mint", color: "bg-emerald-300" },
    { id: "yellow", color: "bg-yellow-400" },
  ];

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
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

  const carImage =
    "https://public.readdy.ai/ai/img_res/f0d671a43cf44c11de0f5fabf30b6f55.jpg";

  return (
    <div className="container">
      {/* <h1 className="mb-6 text-2xl font-medium">Редактирование объявления</h1> */}

      <Card className="p-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-8">
          {/* Basic info */}
          <div>
            <h2 className="text-lg font-medium mb-4">Основная информация</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500 mb-1">Марка</Label>
                <Input
                  className="border-gray-300"
                  placeholder="BMW"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Модель</Label>
                <Input
                  className="border-gray-300"
                  placeholder="M5"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Год выпуска
                </Label>
                <Input className="border-gray-300" value="2025" />
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Пробег, км</Label>
                <Input className="border-gray-300" value="0" />
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Статус</Label>
                <div className="flex space-x-2 mt-1">
                  <Button
                    variant="outline"
                    className="!rounded-button bg-green-100 text-green-700 border-green-200 hover:bg-green-200 whitespace-nowrap"
                  >
                    Новая
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    С пробегом
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Car specifications */}
          <div>
            <h2 className="text-lg font-medium mb-4">Характеристики</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500 mb-1">Тип кузова</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Button
                    variant="outline"
                    className="!rounded-button bg-green-100 text-green-700 border-green-200 hover:bg-green-200 whitespace-nowrap"
                  >
                    Седан
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Универсал
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Двигатель</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Button
                    variant="outline"
                    className="!rounded-button bg-green-100 text-green-700 border-green-200 hover:bg-green-200 whitespace-nowrap"
                  >
                    Бензин
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Дизель
                  </Button>
                </div>
              </div>
              {/* <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Привод
                          </Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Button
                              variant="outline"
                              className="!rounded-button bg-green-100 text-green-700 border-green-200 hover:bg-green-200 whitespace-nowrap"
                            >
                              Полный
                            </Button>
                            <Button
                              variant="outline"
                              className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                            >
                              Задний
                            </Button>
                          </div>
                        </div> */}
              <div>
                <Label className="text-sm text-gray-500 mb-1">Коробка</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Button
                    variant="outline"
                    className="!rounded-button bg-green-100 text-green-700 border-green-200 hover:bg-green-200 whitespace-nowrap"
                  >
                    Автомат
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Механика
                  </Button>
                </div>
              </div>
            </div>

            {/* Color selection */}
            <div className="mt-4">
              <Label className="text-sm text-gray-500 mb-1">Цвет кузова</Label>
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
          </div>

          <Separator />

          {/* Ownership */}
          <div>
            <h2 className="text-lg font-medium mb-4">Владение</h2>
            <div className="space-y-4">
              {/* <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Собственность
                          </Label>
                          <div className="flex space-x-2 mt-1">
                            <Button
                              variant="outline"
                              className="!rounded-button bg-green-100 text-green-700 border-green-200 hover:bg-green-200 whitespace-nowrap"
                            >
                              Собственник
                            </Button>
                            <Button
                              variant="outline"
                              className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                            >
                              По доверенности
                            </Button>
                          </div>
                        </div> */}

              {/* <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            ПТС
                          </Label>
                          <div className="flex items-center space-x-4 mt-1">
                            <RadioGroup defaultValue="original">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="original"
                                  id="original"
                                />
                                <Label htmlFor="original">
                                  Оригинал / Электронный (ЭПТС)
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div> */}

              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Количество владельцев
                </Label>
                <div className="flex items-center space-x-4 mt-1">
                  <RadioGroup defaultValue="owners">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="owners" id="owners" />
                      <Label htmlFor="owners">Количество</Label>
                    </div>
                  </RadioGroup>
                  <Input className="w-20 h-8 border-gray-300" value="1" />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500 mb-1">
                  Когда был куплен автомобиль?
                </Label>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-car" />
                    <Label htmlFor="new-car">Не указано</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="used-car" />
                    <Label htmlFor="used-car">Не применимо</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Photo section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Фотографии</h2>
            <p className="text-sm text-gray-600 mb-4">
              Чтобы фото быстро загружались, используйте изображения размером не
              более 800x600 пикселей. Загружайте фото в формате JPG или PNG.
              Максимальный размер файла 5 МБ.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="relative aspect-[4/3] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <img
                  src={carImage}
                  alt="BMW M5"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                  <i className="fas fa-times text-gray-500"></i>
                </button>
              </div>
              <div className="aspect-[4/3] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <i className="fas fa-plus text-gray-400 text-2xl"></i>
              </div>
              <div className="aspect-[4/3] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <i className="fas fa-plus text-gray-400 text-2xl"></i>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="!rounded-button text-green-600 border-green-600 hover:bg-green-50 whitespace-nowrap"
              >
                <i className="fas fa-upload mr-2"></i>
                Загрузить фото
              </Button>
            </div>
          </div>

          <Separator />

          {/* Description section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Описание</h2>
            <Textarea
              className="min-h-[120px] border-gray-300"
              placeholder="Опишите состояние автомобиля, комплектацию и особенности"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
              Минимум 80 символов. Сейчас: {description.length}
            </p>
          </div>

          <Separator />

          {/* Contacts section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Контакты</h2>
            <p className="text-sm text-gray-600 mb-2">Как с вами связаться?</p>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500 mb-1">Телефон</Label>
                <Input className="border-gray-300" value="+998991234567" />
              </div>
              <div>
                <Label className="text-sm text-gray-500 mb-1">Адрес</Label>
                <Input className="border-gray-300" value="Tashkent" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Price section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Цена</h2>
            <div className="flex items-center">
              <Input
                className="border-gray-300 text-right"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="ml-2 text-lg">$</span>
            </div>
          </div>
        </div>
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
      </Card>
    </div>
  );
};

export default Create;
