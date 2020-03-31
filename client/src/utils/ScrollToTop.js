import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ScrollToTop = () => {
  const history = useHistory();
  const pathname = history.location.pathname;

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
};

export default ScrollToTop;
