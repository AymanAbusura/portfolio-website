import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";

import { styles } from '../styles'
import { photo400 } from '../assets'

import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  const { t } = useTranslation();
  const sectionMap = {
    box2: "about",
    box3: "work",
    box4: "projects",
    box5: "contact",
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-line`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => {
            setActive("");
            window.scrollTo(0,0);
          }}
        >
          <img src={photo400} alt="logo" className="w-8 h-8 object-cover object-bottom rounded-lg border border-line" loading="lazy" />
          <p className="text-ink text-[15px] font-display font-semibold cursor-pointer flex items-center gap-2">
            {t("navbar.box1")}
            <span className="sm:inline hidden font-mono text-[12px] font-normal text-secondary">/ {t("navbar.position")}</span>
          </p>
        </Link>

        <ul className="list-none hidden lg:flex flex-row items-center gap-1 font-mono text-[13px] panel rounded-full px-1.5 py-1.5">
          {['box2', 'box3', 'box4', 'box5'].map((key, idx) => (
            <li
              key={idx}
              className={`${active === key ? "bg-ink text-white" : "text-secondary hover:text-ink"} rounded-full px-4 py-1.5 cursor-pointer transition-colors duration-200`}
              onClick={() => {
                setActive(key);
                const sectionId = sectionMap[key];
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <a href={`#${sectionMap[key]}`}>{t(`navbar.${key}`)}</a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <LanguageSelector />
        </div>

        {/* Mobile and Tablet Navigation */}
        <div className="relative flex lg:hidden justify-end items-center gap-3">
          <button
            onClick={() => setToggle(!toggle)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {toggle ? (
              <X size={18} strokeWidth={2.5} className="text-black" />
            ) : (
              <Menu size={18} strokeWidth={2.5} className="text-black" />
            )}
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } absolute top-12 right-0 p-4 panel min-w-[160px] z-10 rounded-2xl font-mono text-[13px] flex-col`}
          >
            <ul className="list-none flex justify-start items-start flex-col gap-3 w-full">
              {["box2", "box3", "box4", "box5"].map((key, idx) => (
                <li
                  key={idx}
                  className={`${
                    active === key ? "text-accent" : "text-secondary"
                  } cursor-pointer w-full`}
                  onClick={() => {
                    setToggle(false);
                    setActive(key);

                    const sectionId = sectionMap[key];
                    document
                      .getElementById(sectionId)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <a href={`#${sectionMap[key]}`}>
                    {t(`navbar.${key}`)}
                  </a>
                </li>
              ))}

              <li className="w-full pt-2 border-t border-line">
                <LanguageSelector />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
