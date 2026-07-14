/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { LazyMotion, domAnimation, m } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

import { photo400, photo800 } from '../assets';

// i18n
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[220px] w-full'>
    <LazyMotion features={domAnimation}>
      <m.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='panel panel-hover w-full rounded-2xl py-8 px-8 min-h-[190px] flex justify-center items-center flex-col gap-4'
      >
        <img src={icon} alt={title} className='object-contain opacity-80' width={40} height={40} loading="lazy" decoding="async" />
        <h3 className='text-ink text-[15px] font-semibold text-center'>
          {title}
        </h3>
      </m.div>
    </LazyMotion>
  </Tilt>
);

const About = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      const ismobile = window.innerWidth < 1200;
      if (ismobile !== isMobile) setIsMobile(ismobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t("about.header1")}</p>
          <h2 className={styles.sectionHeadText}>{t("about.header2")}</h2>
        </m.div>
      </LazyMotion>

      <div className="lg:flex lg:justify-between gap-20">
        <LazyMotion features={domAnimation}>
          <m.p
            variants={fadeIn("", "", 0.1, 1)}
            className='mt-4 text-secondary text-[17px] max-w-l leading-[30px] text-start'
          >
            {t("about.description")}
          </m.p>
        </LazyMotion>
      </div>

      <div className='mt-20 flex flex-wrap justify-between gap-10'>
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            title={t(`about.services.service${index + 1}`)}
            icon={service.icon}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
