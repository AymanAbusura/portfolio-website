/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Tilt } from "react-tilt";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { github, demo } from "../assets";
import { SectionWrapper } from "../hoc";
import { getProjects, getPetProjects } from "../constants/index-translated";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  preview,
  source_code_link,
}) => {
  return (
    <m.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
      layout
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="panel panel-hover p-5 rounded-2xl sm:w-[360px] w-full h-full"
      >
        <div className="relative w-full h-[230px] cursor-pointer">
          <img
            src={image}
            alt={`${name} project image`}
            className="w-full h-full object-contain rounded-2xl"
            loading="lazy"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                width={20} height={20}
                className="w-1/2 h-1/2 object-contain"
                loading="lazy"
              />
            </div>

            {preview && (
              <div
                onClick={() => window.open(preview, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={demo}
                  alt="demo preview"
                  width={20} height={20}
                  className="w-1/2 h-1/2 object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-ink font-display font-semibold text-[19px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </m.div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [visiblePetProjects, setVisiblePetProjects] = useState(3);
  const [showProjects, setShowProjects] = useState(true);

  const allProjects = Object.values(getProjects(t));
  const allPetProjects = Object.values(getPetProjects(t));

  const currentItems = showProjects ? allProjects : allPetProjects;
  const visibleCount = showProjects ? visibleProjects : visiblePetProjects;
  const isLoadMoreVisible = visibleCount < currentItems.length;

  const handleLoadMore = () => {
    if (showProjects) {
      setVisibleProjects((prev) => prev + 3);
    } else {
      setVisiblePetProjects((prev) => prev + 3);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={textVariant()} initial="hidden" animate="show">
        <p className={styles.sectionSubText}>{t("works.header1")}</p>
        <h2 className={styles.sectionHeadText}>{t("works.header2")}</h2>
      </m.div>

      <div className="w-full flex">
        <m.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          animate="show"
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {t("works.description")}
        </m.p>
      </div>

      <div
        className="relative z-4 mx-auto mt-[20px] flex w-[375px] rounded-full panel p-1.5 max-md:w-[310px]"
      >
        <button
          className={clsx(
            styles.projectsHeadBtn,
            "rounded-full",
            showProjects
              ? "text-white bg-ink"
              : "text-secondary hover:text-ink"
          )}
          onClick={() => setShowProjects(true)}
        >
          {t("works.toggle_title")}
        </button>

        <button
          className={clsx(
            styles.projectsHeadBtn,
            "rounded-full",
            !showProjects
              ? "text-white bg-ink"
              : "text-secondary hover:text-ink"
          )}
          onClick={() => setShowProjects(false)}
        >
          {t("works.toggle_title2")}
        </button>
      </div>

      <m.div
        key={showProjects ? "projects" : "pet-projects"}
        className="mt-10 flex flex-wrap md:justify-center gap-7"
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <AnimatePresence exitBeforeEnter>
          {currentItems.slice(0, visibleCount).map((project, index) => (
            <ProjectCard
              key={`project-${project.name || index}`}
              index={index}
              {...project}
            />
          ))}
        </AnimatePresence>
      </m.div>

      {isLoadMoreVisible && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-ink py-3 px-8 rounded-full outline-none w-fit text-white font-semibold text-[14px] hover:bg-accent transition-colors duration-300"
          >
            {t("works.loadMore")}
          </button>
        </div>
      )}
    </LazyMotion>
  );
};

export default SectionWrapper(Projects, "projects");