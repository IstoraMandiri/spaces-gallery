import React, { useEffect } from "react";
import GA from "services/ga";
import FBPixel from "services/fbPixel";

const Analytics = () => {
  useEffect(() => {
    GA.pageview(window.location.pathname);
    FBPixel.pageview();
  }, []);

  return null;
};

export default Analytics;
