import type { APIRoute } from 'astro';

const pages = [
  { path: '', priority: '1.0' },
  { path: '/software', priority: '0.8' },
  { path: '/descargas', priority: '0.8' },
  { path: '/guias', priority: '0.8' },
  { path: '/herramientas', priority: '0.8' }
];

const baseUrl = 'https://www.codextreme.es';

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => {
  const englishUrl = `${baseUrl}${page.path}`;
  const spanishUrl = `${baseUrl}/es${page.path}`;

  return `  <url>
    <loc>${englishUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${spanishUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}"/>
  </url>
  <url>
    <loc>${spanishUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${englishUrl}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${spanishUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${englishUrl}"/>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
