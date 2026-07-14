import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const currentLang = lang || i18n.language?.toLowerCase() || "en";

  const handleLanguageChange = () => {
    const newLang = currentLang === "en" ? "ru" : "en";

    i18n.changeLanguage(newLang);
    navigate(`/${newLang}`);
  };

  return (
    <button
      className="text-ink font-mono text-[13px] hover:text-accent cursor-pointer"
      onClick={handleLanguageChange}
    >
      {currentLang.toUpperCase()}
    </button>
  );
}

export default LanguageSelector;