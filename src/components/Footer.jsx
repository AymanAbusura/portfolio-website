import { github, linkedin, hh, habr, telegram } from "../assets";
import { useTranslation } from 'react-i18next';

const socials = [
  { icon: github, href: "https://github.com/AymanAbusura", label: "github" },
  { icon: linkedin, href: "https://www.linkedin.com/in/AymanAbusura", label: "linkedin" },
  { icon: hh, href: "https://belgorod.hh.ru/resume/07e7badbff0f8be7db0039ed1f3475336b504d", label: "hh" },
  { icon: habr, href: "https://career.habr.com/aymanabusura", label: "habr" },
  { icon: telegram, href: "https://t.me/ayman_abusura96", label: "telegram" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary/90 backdrop-blur-md border-t border-line mt-10">
      <div className="c-space max-w-7xl mx-auto py-10 flex justify-between items-center flex-wrap gap-6">
        <div className="text-black/50 font-mono text-[12px] flex gap-2">
          <p>{t("footer.box1")}</p>
          <p>/</p>
          <p>{t("footer.box2")}</p>
        </div>

        <div className="flex gap-2.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors duration-300"
            >
              <img src={s.icon} alt="" className="w-5 h-5 object-contain invert opacity-70" loading="lazy" />
            </a>
          ))}
        </div>

        <p className="text-black/50 font-mono text-[12px]">{t("footer.box3")}</p>
      </div>
    </footer>
  );
};

export default Footer;
