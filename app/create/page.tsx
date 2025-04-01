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
        <h1 className="mb-6 text-2xl font-medium">Редактирование объявления</h1>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="mb-6 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="edit"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 !rounded-button"
              onClick={() => setActiveTab("edit")}
            >
              Редактирование
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600 !rounded-button"
              onClick={() => setActiveTab("preview")}
            >
              Предпросмотр
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Form */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="space-y-8">
                    {/* Basic info */}
                    <div>
                      <h2 className="text-lg font-medium mb-4">
                        Основная информация
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Марка
                          </Label>
                          <Input className="border-gray-300" value="BMW" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Модель
                          </Label>
                          <Input className="border-gray-300" value="M5" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Год выпуска
                          </Label>
                          <Input className="border-gray-300" value="2025" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Пробег, км
                          </Label>
                          <Input className="border-gray-300" value="0" />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Статус
                          </Label>
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
                      <h2 className="text-lg font-medium mb-4">
                        Характеристики
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Тип кузова
                          </Label>
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
                          <Label className="text-sm text-gray-500 mb-1">
                            Двигатель
                          </Label>
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
                        <div>
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
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Коробка
                          </Label>
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
                        <Label className="text-sm text-gray-500 mb-1">
                          Цвет кузова
                        </Label>
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
                        <div>
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
                        </div>

                        <div>
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
                        </div>

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
                            <Input
                              className="w-20 h-8 border-gray-300"
                              value="1"
                            />
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
                        Чтобы фото быстро загружались, используйте изображения
                        размером не более 800x600 пикселей. Загружайте фото в
                        формате JPG или PNG. Максимальный размер файла 5 МБ.
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
                      <p className="text-sm text-gray-600 mb-2">
                        Как с вами связаться?
                      </p>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Телефон
                          </Label>
                          <Input
                            className="border-gray-300"
                            value="+7 (912) 345-67-89"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-500 mb-1">
                            Адрес
                          </Label>
                          <Input
                            className="border-gray-300"
                            value="Москва, ул. Ленина 1"
                          />
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
                        <span className="ml-2 text-lg">₽</span>
                      </div>
                    </div>

                    {/* Terms section */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          Я соглашаюсь с правилами размещения объявлений на
                          Avito
                        </Label>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right column - Preview */}
              <div className="lg:col-span-1">
                <Card className="p-6 bg-white rounded-lg shadow-sm sticky top-6">
                  <h2 className="text-lg font-medium mb-4">
                    Предпросмотр объявления
                  </h2>
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <img
                      src={carImage}
                      alt="BMW M5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">BMW M5</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">
                    {price} ₽
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>2025 г., 0 км, Седан, Бензин, Автомат, Полный привод</p>
                    <p>Москва, ул. Ленина 1</p>
                  </div>
                  <div className="space-y-3">
                    <Button className="!rounded-button w-full bg-green-600 hover:bg-green-700 text-white whitespace-nowrap">
                      Опубликовать
                    </Button>
                    <Button
                      variant="outline"
                      className="!rounded-button w-full border-gray-300 text-gray-700 whitespace-nowrap"
                    >
                      Сохранить как черновик
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
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
                        <p className="text-sm">
                          Без ДТП (проверено 01.04.2025)
                        </p>
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
                  <p className="text-gray-700 mb-4">Москва, ул. Ленина 1</p>
                  <div className="aspect-[16/9] bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Create;
