"use strict";

module.exports = api => {
  api.cache(false);

  return {
    presets: ["react-app"]
  };
};
