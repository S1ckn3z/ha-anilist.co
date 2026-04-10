import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/card/anilist-card.ts",
  output: [
    {
      file: "custom_components/anilist/www/anilist-card.js",
      format: "es",
      sourcemap: false,
    },
    {
      file: "www/anilist-card/anilist-card.js",
      format: "es",
      sourcemap: false,
    },
  ],
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};
