/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const js = require("@eslint/js");
const ts = require("typescript-eslint");
const tailwind = require("eslint-plugin-tailwindcss");

module.exports = [
  {
    ignores: [".next/*", "node_modules/*", "tailwind.config.ts"],
  },
  // add eslint built-in
  js.configs.recommended,
  // add typescript-eslint flat config simply
  // if you would like use more another configuration,
  // see the section: https://typescript-eslint.io/getting-started#details
  ...ts.configs.recommended,
  ...tailwind.configs["flat/recommended"],
];
