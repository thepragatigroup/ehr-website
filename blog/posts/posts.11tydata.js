module.exports = {
  layout: "post.njk",
  permalink: "/blog/{{ page.fileSlug }}/",
  eleventyComputed: {
    description: (data) => data.description || data.excerpt || "",
    canonical: (data) => `https://www.expresshrsolutions.com${data.page.url}`,
    ogType: () => "article",
    ogImage: (data) =>
      data.ogImage ||
      data.featured_image ||
      "https://express-hr-solutions-pi.vercel.app/assets/og-image.jpg",
  },
};
