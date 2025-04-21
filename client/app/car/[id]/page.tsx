"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Create: React.FC = () => {
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

  const carImage =
    "https://public.readdy.ai/ai/img_res/f0d671a43cf44c11de0f5fabf30b6f55.jpg";

  return (
    <div className=" ">
      <div className="w-[1440px] mx-auto py-6 px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
              <img
                src={carImage}
                alt="BMW M5"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">BMW M5</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <span>ID: 1234567890</span>
                  <span>•</span>
                  <span>Опубликовано: 01.04.2025</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Седан
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    2025 г.
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Бензин
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Автомат
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 whitespace-nowrap"
                  >
                    Полный привод
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-green-600 mb-4">
                  {price} ₽
                </p>
                <div className="space-y-3">
                  <Button className="!rounded-button w-full bg-green-600 hover:bg-green-700 text-white whitespace-nowrap">
                    <i className="fas fa-phone-alt mr-2"></i>
                    Позвонить
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button w-full border-green-600 text-green-600 hover:bg-green-50 whitespace-nowrap"
                  >
                    <i className="fas fa-comment mr-2"></i>
                    Написать сообщение
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-medium mb-4">Характеристики</h2>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Марка</span>
                    <span className="w-1/2">BMW</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Модель</span>
                    <span className="w-1/2">M5</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Год выпуска</span>
                    <span className="w-1/2">2025</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Пробег</span>
                    <span className="w-1/2">0 км</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Кузов</span>
                    <span className="w-1/2">Седан</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Цвет</span>
                    <span className="w-1/2">Черный</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Двигатель</span>
                    <span className="w-1/2">Бензин, 4.4 л</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Мощность</span>
                    <span className="w-1/2">625 л.с.</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Коробка</span>
                    <span className="w-1/2">Автоматическая</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Привод</span>
                    <span className="w-1/2">Полный</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Владение</h2>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">ПТС</span>
                    <span className="w-1/2">Оригинал</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">
                      Владельцев по ПТС
                    </span>
                    <span className="w-1/2">1</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 text-gray-500">Состояние</span>
                    <span className="w-1/2">Не требует ремонта</span>
                  </div>
                </div>

                <h2 className="text-xl font-medium mt-6 mb-4">
                  Проверка автомобиля
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-sm">
                      Без скручивания пробега (проверено 01.04.2025)
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-sm">Без ДТП (проверено 01.04.2025)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <p className="text-sm">VIN проверен</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Описание</h2>
              <p className="text-gray-700">
                {description ||
                  "Новый BMW M5 2025 года выпуска. Автомобиль в идеальном состоянии, без пробега. Полная комплектация, включает в себя: кожаный салон, панорамную крышу, адаптивный круиз-контроль, систему кругового обзора, подогрев всех сидений, вентиляцию передних сидений, аудиосистему Harman/Kardon и многое другое. Автомобиль на гарантии производителя."}
              </p>
            </div>

            <Separator className="mb-6" />

            <div>
              <h2 className="text-xl font-medium mb-4">Местоположение</h2>
              <p className="text-gray-700 mb-4">tashkent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
