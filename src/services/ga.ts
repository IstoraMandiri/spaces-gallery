import ReactGA from "react-ga";

const STAGE = process.env.NODE_ENV;
const PUBLIC_CODE = process.env.NEXT_PUBLIC_GA_CODE as string;

ReactGA.initialize(PUBLIC_CODE);
const isProduction = STAGE === "production";

const actions = {
  set: (params = {}) => {
    if (isProduction) {
      ReactGA.set(params);
    } else {
      console.log(`Google Analytics || Set: ${JSON.stringify(params)}`);
    }
  },
  pageview: (page: string) => {
    if (isProduction) {
      ReactGA.pageview(page);
    } else {
      console.log(`Google Analytics || Page View: ${page}`);
    }
  },
};

export default actions;
