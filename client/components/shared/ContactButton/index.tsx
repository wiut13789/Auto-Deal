"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ContactButtonProps {
  phoneNumber: string;
}

export function ContactButton({ phoneNumber }: ContactButtonProps) {
  const [isPhoneShown, setIsPhoneShown] = useState(false);

  return (
    <div className="space-y-3">
      {isPhoneShown ? (
        <Button className="!rounded-button w-full bg-green-600 text-white whitespace-nowrap">
          <i className="fas fa-phone-alt mr-2"></i>
          {phoneNumber}
        </Button>
      ) : (
        <Button
          onClick={() => setIsPhoneShown(true)}
          className="!rounded-button w-full bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
        >
          <i className="fas fa-phone-alt mr-2"></i>
          Contact details
        </Button>
      )}
    </div>
  );
}
