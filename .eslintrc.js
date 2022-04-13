module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: ["off", "double"],
    "comma-dangle": ["off", "always"],
    semi: ["off", "always"],
  },
};
