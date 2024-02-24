import config from "@jgarber/eslint-config";

export default [
  { ignores: ["coverage", "dist"] },
  ...config,
  {
    files: ["src/*.js", "test/*.js"],
    languageOptions: {
      globals: {
        document: "readonly",
        HTMLElement: "readonly",
      },
    },
  },
];
