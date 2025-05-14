import htmlmin from "html-minifier-terser";
import CleanCSS from "clean-css";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("build");
  eleventyConfig.setIncludesDirectory("partials");
  eleventyConfig.setDataDirectory("data");

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.setTemplateFormats(["liquid", "css", "html"]);

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (inputContent) {
      return async () => new CleanCSS({}).minify(inputContent).styles;
    },
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
