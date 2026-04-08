import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((heading, i) => {
      const text = heading.textContent || '';
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60);
      tocItems.push({
        id,
        text,
        level: heading.tagName === 'H2' ? 2 : 3,
      });
    });

    setItems(tocItems);

    // Add IDs to actual DOM headings after render
    const timer = setTimeout(() => {
      const pageHeadings = document.querySelectorAll('.prose h2, .prose h3');
      pageHeadings.forEach((heading, i) => {
        if (tocItems[i]) {
          heading.id = tocItems[i].id;
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    const timer = setTimeout(() => {
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100" aria-label="Table of contents">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-orange-500" />
        <span className="font-semibold text-gray-900 text-sm">In this article</span>
      </div>
      <ol className="space-y-1.5">
        {items.filter(item => item.level === 2).map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  history.replaceState(null, '', `#${item.id}`);
                }
              }}
              className={`block text-sm py-1 transition-colors ${
                activeId === item.id
                  ? 'text-orange-500 font-medium'
                  : 'text-gray-500 hover:text-orange-500'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default TableOfContents;
