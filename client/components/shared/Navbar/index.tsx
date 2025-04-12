import { Button } from "@/components/ui/button";
import { links } from "@/data/nav-links";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-1">
        <li>
          <Link href={links[0].path}>
            <Button variant="primary">{links[0].name}</Button>
          </Link>
        </li>
        <li>
          <Link href={links[1].path}>
            <Button variant="secondary">{links[1].name}</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
