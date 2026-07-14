/* eslint-disable react-refresh/only-export-components */
import { useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ayman Abusura",
          from_email: form.email,
          to_email: "aymansalameh1996@hotmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert(t("contact.form.success"));

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert(t("contact.form.error"));
        }
      );
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="xl:mt-12 flex justify-center overflow-hidden">
        <m.div
          variants={slideIn("left", "tween", 0.2, 1)}
          initial="hidden"
          animate="show"
          className="w-full max-w-2xl glass-card p-6 rounded-2xl"
        >
          <p className={styles.sectionSubText}>
            {t("contact.header1")}
          </p>

          <h3 className={styles.sectionHeadText}>
            {t("contact.header2")}
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-5"
          >
            <label className="flex flex-col">
              <span className="text-ink font-medium mb-3">
                {t("contact.form.field1")}
              </span>

              <input
                type="text"
                name="name"
                id="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("contact.form.input1")}
                className="bg-primary border border-line focus:border-accent py-3 px-5 placeholder:text-secondary text-ink rounded-xl outline-none font-normal text-[15px] transition-colors"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-ink font-medium mb-3">
                {t("contact.form.field2")}
              </span>

              <input
                type="email"
                name="email"
                id="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("contact.form.input2")}
                className="bg-primary border border-line focus:border-accent py-3 px-5 placeholder:text-secondary text-ink rounded-xl outline-none font-normal text-[15px] transition-colors"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-ink font-medium mb-3">
                {t("contact.form.field3")}
              </span>

              <textarea
                rows={5}
                name="message"
                id="message"
                required
                autoComplete="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("contact.form.input3")}
                className="bg-primary border border-line focus:border-accent py-3 px-5 placeholder:text-secondary text-ink rounded-xl outline-none font-normal text-[15px] transition-colors resize-none"
              />
            </label>

            <button
              type="submit"
              className="bg-ink py-3 px-8 rounded-full outline-none w-fit text-white font-semibold text-[14px] hover:bg-accent transition-colors duration-300"
            >
              {loading
                ? t("contact.form.sending")
                : t("contact.form.button")}
            </button>
          </form>
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default SectionWrapper(Contact, "contact");