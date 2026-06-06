module.exports = {
  layout: "post.njk",
  permalink: "/blog/{{ page.fileSlug }}/",
  eleventyComputed: {
    description: (data) => data.description || data.excerpt || "",
    canonical: (data) => `https://www.expresshrsolutions.com${data.page.url}`,
    ogType: () => "article",
    ogImage: (data) =>
      data.ogImage ||
      (data.featured_image && !data.featured_image.includes('placeholder')
        ? data.featured_image
        : "https://www.expresshrsolutions.com/assets/og-image.jpg"),
  },
};
