import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts, BlogPost } from '../../content/blog';
import { GetStaticProps } from 'next';

interface BlogIndexProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = blogPosts
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  return { props: { posts } };
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const categories = Array.from(new Set(posts.map(p => p.category)));

  return (
    <>
      <SEOHead
        title="Blog"
        description="Expert insights on lead generation, ECO 4 schemes, housing disrepair claims, life insurance marketing, and digital advertising strategies from the NAASS team."
        keywords="lead generation blog, ECO 4 guide, housing disrepair advice, digital marketing tips UK, PPC advertising insights"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          {/* Hero */}
          <section className="container mx-auto px-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-6">
                <BookOpen className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">Insights &amp; Guides</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">
                NAASS Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Practical guides, industry insights, and expert advice on lead generation, energy efficiency schemes, and digital marketing in the UK.
              </p>
            </motion.div>
          </section>

          {/* Category Filter */}
          <section className="container mx-auto px-4 mb-12">
            <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium border border-orange-100"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>

          {/* Blog Grid */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-lg transition-all h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-orange-500 text-sm font-medium group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Ready to Grow Your Business?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Get a free, no-obligation lead generation quote tailored to your industry and goals.
                </p>
                <Link
                  href="/get-started"
                  className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
