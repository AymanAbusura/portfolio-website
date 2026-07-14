import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const Top = () => {
  const [showBtn, setShowBtn] = useState(false);

  const scrollFunction = () => {
    if (window.scrollY > 20) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={topFunction}
      className={`hover:bg-accent myBtn ${showBtn ? "show" : "none"}`}
      title="Go to top"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        backgroundColor: "#14171F",
        color: "#fff",
        cursor: "pointer",
        transition: "opacity 0.3s ease",
        opacity: showBtn ? 1 : 0,
        pointerEvents: showBtn ? "auto" : "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    >
      <ArrowUp size={24} strokeWidth={2} />
    </button>
  );
};

export default Top;