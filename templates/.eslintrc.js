/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "react/no-unescaped-entities": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
