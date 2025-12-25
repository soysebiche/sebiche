import { GetServerSideProps } from 'next';

export default function Sitemap() {
  return null; // No renderiza nada, solo genera el XML
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://sebiche.vercel.app";
  const staticPages = ["", "#about", "#experience", "#projects", "#contact"].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastmod: new Date().toISOString().split('T')[0],
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${page.url === baseUrl ? '1.0' : '0.8'}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};