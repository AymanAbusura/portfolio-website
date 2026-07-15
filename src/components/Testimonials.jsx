/* eslint-disable react-refresh/only-export-components */
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const TestimonialCard = ({ index, name, role, quote }) => (
  <m.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="glass-card rounded-2xl p-8 flex flex-col justify-between sm:w-[360px] w-full hover:shadow-glow hover:border-custom-purple/40 transition-all duration-300"
  >
    <p className="text-white-100 text-[15px] leading-[26px] before:content-['\201C'] after:content-['\201D']">
      {quote}
    </p>
    <div className="mt-6 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br bg-black flex items-center justify-center text-white font-bold text-[14px]">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-ink font-semibold text-[14px]">{name}</p>
        <p className="text-secondary text-[13px]">{role}</p>
      </div>
    </div>
  </m.div>
);

TestimonialCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

const Testimonials = () => {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true });
  const list = Array.isArray(items) ? items : Object.values(items || {});

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("testimonials.header1")}</p>
        <h2 className={styles.sectionHeadText}>{t("testimonials.header2")}</h2>
      </m.div>

      <div className="mt-14 flex flex-wrap justify-center gap-7">
        {list.map((item, index) => (
          <TestimonialCard key={`testimonial-${index}`} index={index} {...item} />
        ))}
      </div>
    </LazyMotion>
  );
};

export default SectionWrapper(Testimonials, "testimonials");