const { DateTime } = require("luxon");
const yaml = require("js-yaml");
const { HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.addPlugin(HtmlBasePlugin);
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/fonts");

  // Collections
  eleventyConfig.addCollection("pages", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/content/pages/*.md")
      .filter((p) => p.data.published !== false)
      .sort((a, b) => (a.data.nav_order || 99) - (b.data.nav_order || 99))
  );

  eleventyConfig.addCollection("announcements", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/content/announcements/*.md")
      .filter((p) => p.data.published !== false)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("courses", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/content/courses/*.md")
  );

  // Filters
  eleventyConfig.addFilter("dateFormat", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      format || "d. M. yyyy"
    );
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    pathPrefix: "/golfnitra.github.io/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
