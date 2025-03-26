import Link from "next/link";

import { links } from "@/data/nav-links";

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
