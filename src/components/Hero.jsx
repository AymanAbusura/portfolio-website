/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { Download } from "lucide-react";

import { styles } from "../styles";
import resumeEnglish from '../assets/resume/ResumeEN.pdf';
import resumeRussian from '../assets/resume/ResumeRU.pdf';
import { github, linkedin, hh, habr, telegram } from "../assets";
import { useTranslation } from 'react-i18next';
import { photo800, photo400 } from '../assets';

const textVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const iconVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const socials = [
  { icon: github, href: "https://github.com/AymanAbusura", label: "GitHub" },
  { icon: linkedin, href: "https://www.linkedin.com/in/AymanAbusura", label: "LinkedIn" },
  { icon: hh, href: "https://belgorod.hh.ru/resume/07e7badbff0f8be7db0039ed1f3475336b504d", label: "hh.ru" },
  { icon: habr, href: "https://career.habr.com/aymanabusura", label: "Habr" },
  { icon: telegram, href: "https://t.me/ayman_abusura96", label: "Telegram" },
];

const Hero = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const resumeLink = currentLanguage === 'RU' ? resumeRussian : resumeEnglish;
  const resumeFileName = currentLanguage === 'RU' ? 'Resume-Russian.pdf' : 'Resume-English.pdf';

  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => {
      const ismobile = window.innerWidth < 767;
      if (ismobile !== isMobile) setIsMobile(ismobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <section className="relative w-full min-h-screen mx-auto pt-[140px] pb-20" aria-label="Hero section">
      <div className={`max-w-7xl mx-auto ${styles.paddingX} flex lg:flex-row flex-col-reverse items-center gap-14 justify-between`}>
        <LazyMotion features={domAnimation}>
          <m.div
            className="flex-1 max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <m.div
              className="inline-flex items-center gap-2 font-mono text-[12px] text-secondary panel px-3 py-1.5 rounded-full mb-6"
              variants={textVariant}
            >
              <span className="status-dot" />
              {t("hero.status", "available for work")}
            </m.div>

            <m.h1 className={styles.heroHeadText} variants={textVariant}>
              {t('hero.greeting', "Hi, I'm")} {t('hero.name', 'Ayman')}
              <br />
              <span className="text-accent">{t("hero.role", "Fullstack Developer")}</span>
            </m.h1>

            <m.p className={`${styles.heroSubText} mt-6`} variants={textVariant}>
              {t("hero.description")}
            </m.p>

            <m.div className="mt-9 flex flex-wrap items-center gap-4" variants={textVariant}>
              <a
                href={resumeLink}
                download={resumeFileName}
                className="bg-ink py-3.5 px-8 rounded-full outline-none text-white font-semibold text-[14px] shadow-md hover:bg-accent transition-colors duration-300 inline-flex items-center gap-2"
              >
                {t("hero.resume")}
                <Download size={16} aria-hidden="true" />
              </a>

              <div className="flex gap-2">
                {socials.map((s) => (
                  <m.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full bg-black border border-line hover:bg-accent flex items-center justify-center transition duration-300"
                    variants={iconVariant}
                  >
                    <img src={s.icon} alt="" className="w-5 h-5 object-contain" loading="lazy" />
                  </m.a>
                ))}
              </div>
            </m.div>
          </m.div>
        </LazyMotion>

        <LazyMotion features={domAnimation}>
          <m.div
            className="relative shrink-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="absolute -inset-3 border border-line rounded-[28px] -z-10" />
            <picture>
              <source srcSet={photo800} media="(min-width: 768px)" type="image/webp" />
              <source srcSet={photo400} media="(min-width: 480px)" type="image/webp" />
              <img
                src={photo400}
                alt="Ayman Abusura"
                width={isMobile ? 220 : 300}
                height={isMobile ? 293 : 400}
                fetchpriority="high"
                className="w-[220px] sm:w-[300px] h-[293px] sm:h-[300px] object-cover sm:object-contain object-top rounded-3xl grayscale-[15%]"
              />
            </picture>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Hero;
