import { mapValues, merge } from "lodash-es";

const i18n = {
  en: {
    nav: {
      home: "home",
      features: "features",
      cases: "cases",
      contact: "Plan a demo",
    },
    test: {
      hi: "Hello",
    },
  },
  nl: {
    nav: {
      home: "home",
      features: "features",
      cases: "cases",
      contact: "Plan een demo",
    },
    test: {
      hi: "Hallo",
    },
  },
};

// Conversion to plugin format
const mapT = (t, l) => {
  if (typeof t === "object") {
    return mapValues(t, (x) => mapT(x, l));
  } else {
    return { [l]: t };
  }
};

const translations = {};

for (const k in i18n) {
  merge(translations, mapT(i18n[k], k));
}

export default translations;
