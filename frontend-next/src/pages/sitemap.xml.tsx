import { GetServerSideProps } from 'next';
import { blogPosts } from '../content/blog';

function SitemapXml() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://naass.co.uk';

  const staticPages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services/eco-4', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services/housing-disrepair', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services/life-insurance', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services/google-ppc', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services/social-media', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.7' },
    { loc: '/get-started', changefreq: 'monthly', priority: '0.7' },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
  ];

  const blogPages = blogPosts.map(post => ({
    loc: `/blog/${post.slug}`,
    changefreq: 'monthly' as const,
    priority: '0.6',
    lastmod: post.modifiedDate,
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      'lastmod' in page && page.lastmod
        ? `\n    <lastmod>${page.lastmod}</lastmod>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default SitemapXml;
