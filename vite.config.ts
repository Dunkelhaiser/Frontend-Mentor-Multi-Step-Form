import { defineConfig } from "vite";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import cssNano from "cssnano";
import postcssPresetEnv from "postcss-preset-env";
import postcssAdvancedVariables from "postcss-advanced-variables";
import postcssExtendRule from "postcss-extend-rule";
import postcssNested from "postcss-nested";

export default defineConfig({
    css: {
        postcss: {
            plugins: [
                postcssImport,
                cssNano,
                autoprefixer,
                postcssPresetEnv({ stage: 1 }),
                postcssNested,
                postcssAdvancedVariables,
                postcssExtendRule,
            ],
        },
    },
});
