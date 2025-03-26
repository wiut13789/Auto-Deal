import Link from "next/link";
import { Navbar } from "../Navbar";

export const Header = () => {
  return (
    <div className="py-8 shadow-md">
      <div className="container">
        <div className="flex justify-between">
          <div>
            <Link href="/" className="font-black text-[28px]">
              <span className="text-[#02027E]">auto</span>
              <span className="text-[#38A65B]">-deal</span>
            </Link>
          </div>

          <Navbar />
        </div>
      </div>
    </div>
  );
};
