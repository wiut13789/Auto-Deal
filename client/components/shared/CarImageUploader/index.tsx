"use client";

import { Cross } from "lucide-react";
import { useState, useRef } from "react";

export default function CarImageUploader({
  onImageChange,
}: {
  onImageChange: (imagePath: string | null) => void;
}) {
  const [carImage, setCarImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setCarImage(data.filePath);
      onImageChange(data.filePath);
    }
  };

  const handleUploadClick = () => {
    inputFileRef.current?.click();
  };

  const handleRemoveImage = () => {
    setCarImage(null);
    onImageChange(null);
  };

  return (
    <div>
      {carImage ? (
        <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={carImage}
            alt="Car"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
          >
            <Cross fill="#6b7280" className="rotate-45 text-transparent" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleUploadClick}
          className="aspect-[4/3] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
        >
          <i className="fas fa-plus text-gray-400 text-4xl"></i>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputFileRef}
        className="hidden"
      />
    </div>
  );
}
