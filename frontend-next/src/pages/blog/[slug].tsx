import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import TableOfContents from '../../components/TableOfContents';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';
import { blogPosts, BlogPost } from '../../content/blog';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const post = blogPosts.find(p => p.slug === params?.slug);
  if (!post) return { notFound: true };

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  if (relatedPosts.length < 2) {
    const moreRelated = blogPosts
      .filter(p => p.slug !== post.slug && !relatedPosts.find(r => r.slug === p.slug))
      .slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...moreRelated);
  }

  return { props: { post, relatedPosts } };
};

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://naass.co.uk/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-xs font-medium">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-orange-50 text-gray-500 hover:text-orange-500 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-orange-50 text-gray-500 hover:text-orange-500 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-orange-50 text-gray-500 hover:text-orange-500 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <button
        onClick={copyLink}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-orange-50 text-gray-500 hover:text-orange-500 transition-colors"
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </button>
      {copied && <span className="text-xs text-orange-500">Copied!</span>}
    </div>
  );
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": { "@type": "Organization", "name": "NAASS" },
    "publisher": {
      "@type": "Organization",
      "name": "NAASS",
      "logo": { "@type": "ImageObject", "url": "https://naass.co.uk/naass-logo.png" },
    },
    "datePublished": post.publishedDate,
    "dateModified": post.modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://naass.co.uk/blog/${post.slug}`,
    },
    "url": `https://naass.co.uk/blog/${post.slug}`,
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.description}
        keywords={post.keywords}
        article={true}
        author={post.author}
        publishedTime={post.publishedDate}
        modifiedTime={post.modifiedDate}
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <article className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs items={breadcrumbs} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between gap-4 mb-10 pb-8 border-b border-gray-100 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium text-sm">{post.author}</p>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <ShareButtons title={post.title} slug={post.slug} />
                </div>
              </motion.div>

              {/* Table of Contents */}
              <TableOfContents content={post.content} />

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
                  prose-li:text-gray-600
                  prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom Share Bar */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <Link href="/blog" className="text-orange-500 text-sm font-medium hover:underline flex items-center gap-1">
                  &larr; Back to Blog
                </Link>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 bg-orange-50 border border-orange-100 rounded-2xl text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Need Quality Leads for Your Business?
                </h3>
                <p className="text-gray-600 mb-6">
                  NAASS delivers pre-qualified, exclusive leads across ECO 4, housing disrepair, life insurance, and more.
                </p>
                <Link
                  href="/get-started"
                  className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="container mx-auto px-4 mt-16">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map(related => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="block group">
                      <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-md transition-all">
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                          {related.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 group-hover:text-orange-500 transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-gray-500 text-sm">{related.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
