import i18n from "eleventy-plugin-i18n";
import { I18nPlugin } from "@11ty/eleventy";
import htmlmin from "html-minifier-terser";
import CleanCSS from "clean-css";

import translations from "./src/data/translations.js";

const pages = ["index", "cases"];

const languages = ["nl", "en"];

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "nl", // Required, this site uses "en"
  });

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("build");
  eleventyConfig.setIncludesDirectory("partials");
  eleventyConfig.setDataDirectory("data");

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/*.txt");

  eleventyConfig.setTemplateFormats(["liquid", "css", "html"]);

  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      "*": "nl",
    },
  });

  languages.forEach((locale) =>
    pages.forEach((page) => {
      eleventyConfig.addTemplate(`${locale}/${page}.liquid`, `{{ content }}`, {
        layout: `${locale}/${page}.liquid`,
        locale,
        pageName: page === "index" ? "" : page,
      });
    })
  );

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    getData: () => ({
      eleventyExcludeFromCollections: true,
    }),
    compile: async function (inputContent) {
      return async () => new CleanCSS({}).minify(inputContent).styles;
    },
  });

  eleventyConfig.addFilter("date", function () {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  });

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strictFilters: false,
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }
    return content;
  });
}
