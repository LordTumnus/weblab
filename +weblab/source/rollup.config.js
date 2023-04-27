import typescript from "@rollup/plugin-typescript";
import styles from "@ironkinoko/rollup-plugin-styles";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from 'svelte-preprocess';
import uglify from "@lopatnov/rollup-plugin-uglify";


export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    assetFileNames: "[name]-[hash][extname]",
    inlineDynamicImports: true,
    sourcemap: true,
  },
  
  plugins: [
    svelte({
      preprocess: autoPreprocess(), 
      compilerOptions: {
        accessors: true,
      }
    }),
    resolve(),
    commonjs(),
    styles(),
    typescript({
      sourceMap: true,
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
