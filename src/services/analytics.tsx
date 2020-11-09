import { useEffect } from "react";
import GA from "services/ga";
import FBPixel from "services/fbPixel";

export const useAnalytics = () => {
  useEffect(() => {
    GA.pageview(window.location.pathname);
    FBPixel.pageview();
  }, []);

  return null;
};
