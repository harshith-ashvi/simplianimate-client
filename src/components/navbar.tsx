import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import UserButton from "./navbar/UserButton";

import { useAuth } from "./auth/Auth";

import { navLinks } from "@/data/home";
import fullLogo from "@/assets/images/simpliAnimate-full.png";

const Navbar = () => {
  const { user, signout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleOpenNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const avatarUrl = useMemo(
    () => user?.user_metadata?.avatar_url ?? "",
    [user]
  );

  return (
    <header
      className={`${isScrolled ? "shadow-lg" : ""} w-full fixed top-0 left-0`}
    >
      <nav className="md:flex items-center justify-between bg-white py-1 md:px-4 px-3 max-container">
        {/* logo section */}
        <a href="/" className="cursor-pointer">
          <img src={fullLogo} alt="SimpliAnimate" width={200} height={50} />
        </a>
        <div className="flex items-center justify-center">
          {/* Menu icon */}
          <div
            onClick={toggleOpenNav}
            className="absolute right-4 top-1 cursor-pointer md:hidden"
          >
            <div className="flex items-center justify-center">
              {isNavOpen ? (
                <X className="h-6 w-6 mt-3 mr-5" onClick={toggleOpenNav} />
              ) : (
                <Menu className="h-6 w-6 mt-3 mr-5" onClick={toggleOpenNav} />
              )}
              <div className="md:hidden mt-2">
                <UserButton handleSignout={signout} avatarUrl={avatarUrl} />
              </div>
            </div>
          </div>
          {/* linke items */}
          <ul
            className={`md:flex md:items-center md:pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in ${
              isNavOpen ? "top-12" : "top-[-490px]"
            }`}
          >
            {navLinks.map((link) => (
              <li
                className="md:ml-8 md:my-0 my-5 font-semibold"
                key={link.label}
              >
                <a
                  href={link.href}
                  className="text-gray-800 hover:text-orange-400 duration-500"
                  target={link.label === "Request Template" ? "_blank" : ""}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="max-md:hidden ml-4">
            <UserButton handleSignout={signout} avatarUrl={avatarUrl} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
