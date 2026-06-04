module.exports = function(eleventyConfig) {

  // ── Passthrough: copy these folders/files unchanged to _site/
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("admin");

  // ── Collections
  // Blog posts: all markdown in /blog/posts/, newest first
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("blog/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // ── Filters
  // Return up to 3 posts with featured: true, newest first
  eleventyConfig.addFilter("featuredPosts", function(posts) {
    return posts.filter(p => p.data.featured === true).slice(0, 3);
  });

  // "Jun 2025" — for blog cards
  eleventyConfig.addFilter("monthYear", function(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short", year: "numeric"
    });
  });

  // "June 1, 2025" — for post header
  eleventyConfig.addFilter("fullDate", function(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric"
    });
  });

  // Estimate reading time from rendered HTML content
  eleventyConfig.addFilter("readTime", function(content) {
    const text = String(content).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const words = text.split(" ").filter(w => w.length > 0).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: false
  };
};
