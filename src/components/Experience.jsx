/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { LazyMotion, domAnimation, m } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { getExperiences } from "../constants/index-translated";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useTranslation } from 'react-i18next';

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#FFFFFF",
        color: "#14171F",
        border: "1px solid #D8DCE3",
        boxShadow: "0px 10px 40px -12px rgba(20,23,31,0.10)",
        borderRadius: "14px",
      }}
      contentArrowStyle={{ borderRight: "7px solid #FFFFFF" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
            loading="lazy"
          />
        </div>
      }
    >
      <div>
        <h3 className='text-ink font-display text-[20px] font-semibold'>{experience.title}</h3>
        <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
        <p className='text-secondary text-[8px] font-semibold' style={{ margin: 0 }}>
          {experience.location}
        </p>
      </div>

      <div>
        <p className='text-white-100 text-[8px] font-semibold' style={{ margin: 0 }}>
          {experience.about}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { t } = useTranslation();

  // Получаем переведённые данные
  const experiences = getExperiences(t);

  return (
    <LazyMotion features={domAnimation}>
      <>
        <m.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t("experience.header1")}</p>
          <h2 className={styles.sectionHeadText}>{t("experience.header2")}</h2>
        </m.div>

        <div className='mt-20 flex flex-col'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard key={`experience-${index}`} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </>
    </LazyMotion>
  );
};

export default SectionWrapper(Experience, "work");