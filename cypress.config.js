import { defineConfig } from "cypress";
import {API_URL_WS} from "./src/constants.js";

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:5173/`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
