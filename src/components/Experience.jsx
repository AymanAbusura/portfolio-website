/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { LazyMotion, domAnimation, m } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { getExperiences } from "../constants/index-translated";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { github as githubIcon } from "../assets";
import { useTranslation } from 'react-i18next';

const PointList = ({ label, points }) => {
  if (!points || points.length === 0) return null;
  return (
    <div className="mt-5">
      <p className="eyebrow text-[12px] text-accent uppercase tracking-wide font-mono font-medium mb-2">
        {label}
      </p>
      <ul className="list-disc ml-5 space-y-1.5">
        {points.map((point, index) => (
          <li key={index} className="text-secondary text-[14px] pl-1 leading-[22px] tracking-wide">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ExperienceCard = ({ experience }) => {
  const { t } = useTranslation();

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
        <p className='text-secondary text-[15px] font-semibold' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
        <p className='text-secondary text-[13px]' style={{ margin: 0 }}>
          {experience.location}
        </p>
      </div>

      <div>
        <p className='text-secondary text-[13px] mt-2' style={{ margin: 0 }}>
          {experience.about}
        </p>
      </div>

      <PointList label={t("experience.labels.tasks")} points={experience.points} />
      <PointList label={t("experience.labels.achievements")} points={experience.achievements} />
      <PointList label={t("experience.labels.kpis")} points={experience.kpis} />

      {(experience.stack || experience.github) && (
        <div className="mt-5 pt-4 border-t border-line flex flex-col gap-2">
          {experience.stack && (
            <p className="text-[13px] text-secondary">
              <span className="font-mono text-accent">{t("experience.labels.stack")}:</span>{" "}
              {experience.stack}
            </p>
          )}
          {experience.github && (
            <a
              href={experience.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:text-accent transition-colors duration-200 w-fit"
            >
              <img src={githubIcon} alt="" className="w-3.5 h-3.5 object-contain" />
              GitHub
            </a>
          )}
        </div>
      )}
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