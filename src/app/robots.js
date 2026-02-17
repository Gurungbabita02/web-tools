export default function robots() {
  const baseUrl = "https://yourwebsite.com"; // REPLACE with your actual url domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
