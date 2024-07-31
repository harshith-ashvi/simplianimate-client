import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import UserButton from "./navbar/UserButton";

import { useAuth } from "./auth/Auth";

import { navLinks } from "@/data/home";
import fullLogo from "@/assets/images/full-logo.png";

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
      className={`w-full fixed top-0 left-0 bg-white z-[100] ${
        isScrolled ? "shadow-lg" : ""
      } `}
    >
      <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20 max-w-[1536px]">
        <div className="flex items-center">
          <a href="/" className="cursor-pointer">
            <img src={fullLogo} alt="SimpliAnimate" width={200} height={50} />
          </a>
          <div className="hidden lg:flex pl-[74px] gap-x-[56px]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#36485C] font-medium hover:underline"
                target={link.label === "Request Templates" ? "_blank" : ""}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex lg:gap-x-5 gap-x-2">
          <UserButton handleSignout={signout} avatarUrl={avatarUrl} />
          <div className="lg:hidden duration-200 ease-in">
            {isNavOpen ? (
              <X size={32} onClick={toggleOpenNav} />
            ) : (
              <Menu size={32} onClick={toggleOpenNav} />
            )}
          </div>
          <ul
            className={`lg:hidden absolute bg-white z-[-1] left-0 w-full pl-9 transition-all duration-200 ease-in ${
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
                  className="text-[#36485C] font-medium hover:underline"
                  target={
                    ["Request Templates"].includes(link.label) ? "_blank" : ""
                  }
                  onClick={toggleOpenNav}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
