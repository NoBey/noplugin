/* eslint-disable import/no-extraneous-dependencies */
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default [
  {
    input: "src/index.tsx",
    external:  [] || Object.keys(pkg.dependencies),
    plugins: [
      typescript({
        tsconfig: "./tsconfig.build.json",
      }),
      resolve({
        browser: true
     }),
    commonjs({
        include: /node_modules/,
       }),
    ],
    output: [{ dir: "./dist", format: "cjs", sourcemap: true }],
  },
];
