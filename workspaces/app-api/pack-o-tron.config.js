"use strict";

const { App } = require("pack-o-tron");

module.exports = {
  createApps(ctx, mode) {
    return App.fromPreset(ctx, mode, "server");
  }
};
