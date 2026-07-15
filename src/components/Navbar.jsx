import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";

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
  const navKeys = ['box2', 'box3', 'box4', 'box5'];

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = toggle ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [toggle]);

  const goTo = (key) => {
    setToggle(false);
    setActive(key);
    const sectionId = sectionMap[key];
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navBar = (
    <nav className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-line`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => {
            setActive("");
            setToggle(false);
            window.scrollTo(0, 0);
          }}
        >
          <img src={photo400} alt="logo" width={32} height={32} className="w-8 h-8 object-cover object-bottom rounded-lg border border-line" loading="lazy" />
          <p className="text-ink text-[15px] font-display font-semibold cursor-pointer flex items-center gap-2">
            {t("navbar.box1")}
            <span className="sm:inline hidden font-mono text-[12px] font-normal text-secondary">/ {t("navbar.position")}</span>
          </p>
        </Link>

        <ul className="list-none hidden lg:flex flex-row items-center gap-1 font-mono text-[13px] panel rounded-full px-1.5 py-1.5">
          {navKeys.map((key, idx) => (
            <li
              key={idx}
              className={`${active === key ? "bg-ink text-white" : "text-secondary hover:text-ink"} rounded-full px-4 py-1.5 cursor-pointer transition-colors duration-200`}
              onClick={() => goTo(key)}
            >
              <a href={`#${sectionMap[key]}`}>{t(`navbar.${key}`)}</a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <LanguageSelector />
        </div>

        {/* Mobile Navigation trigger — hidden while the overlay is open,
            since the overlay renders its own close button */}
        <div className={`flex lg:hidden justify-end items-center ${toggle ? "invisible" : ""}`}>
          <button
            onClick={() => setToggle(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black-200 transition-colors duration-200"
            aria-label="Open menu"
            aria-expanded={toggle}
          >
            <Menu size={18} strokeWidth={2.5} className="text-ink" />
          </button>
        </div>
      </div>
    </nav>
  );

  const mobileMenu = (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {toggle && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] lg:hidden bg-primary flex flex-col"
            onClick={() => setToggle(false)}
          >
            {/* Close button lives inside the overlay itself, so it is always on top */}
            <div className={`${styles.paddingX} w-full flex items-center justify-between py-4`}>
              <div className="flex items-center gap-2.5">
                <img src={photo400} alt="logo" width={32} height={32} className="w-8 h-8 object-cover object-bottom rounded-lg border border-line" loading="lazy" />
                <p className="text-ink text-[15px] font-display font-semibold">{t("navbar.box1")}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setToggle(false); }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black-200 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={2.5} className="text-ink" />
              </button>
            </div>

            <div
              className="flex-1 flex flex-col justify-center px-8 pb-10 max-w-7xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="list-none flex flex-col gap-1">
                {navKeys.map((key, idx) => (
                  <m.li
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, delay: 0.06 * idx }}
                    className="border-b border-line py-4"
                  >
                    <a
                      href={`#${sectionMap[key]}`}
                      onClick={(e) => { e.preventDefault(); goTo(key); }}
                      className="flex items-baseline gap-4 group w-full"
                    >
                      <span className="font-mono text-[13px] text-secondary">
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-display text-[32px] font-semibold transition-colors duration-200 ${
                          active === key ? "text-accent" : "text-ink group-hover:text-accent"
                        }`}
                      >
                        {t(`navbar.${key}`)}
                      </span>
                    </a>
                  </m.li>
                ))}
              </ul>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, delay: 0.06 * navKeys.length }}
                className="mt-8 flex items-center justify-between"
              >
                <span className="font-mono text-[12px] text-secondary">{t("navbar.language", "language")}</span>
                <LanguageSelector />
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );

  return (
    <>
      {navBar}
      {typeof document !== "undefined" && createPortal(mobileMenu, document.body)}
    </>
  );
};

export default Navbar;