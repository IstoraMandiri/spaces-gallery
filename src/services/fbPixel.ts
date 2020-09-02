import ReactPixel from "react-facebook-pixel";

const STAGE = process.env.NODE_ENV;
const PIXEL_CODE = process.env.NEXT_PUBLIC_PIXEL_CODE as string;

const options = {
  autoConfig: true,
  debug: false,
};

ReactPixel.init(PIXEL_CODE, undefined, options);
const isProduction = STAGE === "production";

const actions = {
  track: (event: string, data?: any) => {
    if (isProduction) {
      ReactPixel.track(event, data);
    } else {
      console.log(`Facebook Pixel || Track: ${event} - ${data}`);
    }
  },
  trackCustom: (event: string, data?: any) => {
    if (isProduction) {
      ReactPixel.trackCustom(event, data);
    } else {
      console.log(`Facebook Pixel || Track Custom: ${event} - ${data}`);
    }
  },
  pageview: () => {
    if (isProduction) {
      ReactPixel.pageView();
    } else {
      console.log("Facebook Pixel || Pageview");
    }
  },
};

export default actions;
