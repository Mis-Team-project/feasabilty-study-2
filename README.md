# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vitejs/tree/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you're looking to extend the ESLint configuration, you can do so by modifying the `eslint.config.js` file. For example, to add a new plugin or a custom rule, you would typically add it to the `plugins` and `rules` sections of your configuration.

Here's an example of how you might add a hypothetical new plugin and a rule:

```javascript
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } }, globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  // Example of adding a new custom rule or plugin configuration
  {
    rules: {
      "no-unused-vars": "warn", // Example: A custom rule setting
      "react/prop-types": "off", // Example: Disabling a rule from a plugin
      // If you had a custom plugin named 'my-custom-plugin'
      // "my-custom-plugin/my-custom-rule": "error",
    },
  },
];
```

Remember to install any new ESLint plugins you add via npm (e.g., `npm install eslint-plugin-my-custom-plugin --save-dev`).
