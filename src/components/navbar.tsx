import { Menu } from "lucide-react";

import fullLogo from "@/assets/images/simpliAnimate-full.png";
import { navLinks } from "@/data/home";

const Navbar = () => {
  return (
    <header className="py-2 absolute z-10 w-full mb-10">
      <nav className="flex justify-between items-center max-container">
        <a href="/" className="ml-1">
          <img src={fullLogo} alt="SimpliAnimate" width={200} height={50} />
        </a>
        <ul className="flex-1 mr-3 flex justify-end items-center gap-16 max-lg:hidden">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="font-montserrat leading-normal text-base text-slate-gray-50 pt-3"
            >
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden max-lg:block">
          <Menu className="h-6 w-6 mt-3 mr-5" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
