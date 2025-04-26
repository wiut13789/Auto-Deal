import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactButton() {
  const [showPhone, setShowPhone] = useState(false);
  const phoneNumber = "+1 (555) 123-4567"; // replace with your real number

  return (
    <div className="space-y-3">
      {showPhone ? (
        <Button className="!rounded-button w-full bg-green-600 text-white whitespace-nowrap">
          <i className="fas fa-phone-alt mr-2"></i>
          {phoneNumber}
        </Button>
      ) : (
        <Button
          onClick={() => setShowPhone(true)}
          className="!rounded-button w-full bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
        >
          <i className="fas fa-phone-alt mr-2"></i>
          Contact details
        </Button>
      )}
    </div>
  );
}
