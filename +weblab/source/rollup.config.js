import typescript from "@rollup/plugin-typescript";
import styles from "@ironkinoko/rollup-plugin-styles";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import uglify from "@lopatnov/rollup-plugin-uglify";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    assetFileNames: "[name]-[hash][extname]",
  },
  plugins: [
    resolve(),
    commonjs(),
    styles(),
    typescript({
      compilerOptions: {
        lib: ["es5", "es6", "dom"],
        target: "es6",
        resolveJsonModule: true,
        allowSyntheticDefaultImports: true,
      },
    }),
    //uglify(),
  ],
};
