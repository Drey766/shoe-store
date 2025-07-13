// File: app/blog/[id]/page.tsx
import blogsJson from '@/app/data/blogs.json';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '@/app/styles/Blog.module.css'
import CheckoutHeader from '@/app/components/CheckoutHeader';
import Newsletter from '@/app/components/Newsletter';

interface Blog {
  id: string | number;
  title: string;
  content: string;
  image: string;
}

interface BlogDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  // Await the params to get the ID
  const { id } = await params;
  
  const blogs: Blog[] = blogsJson as Blog[];
  
  // Find the blog by ID
  const blog = blogs.find(blog => blog.id.toString() === id);
  
  // If blog not found, show 404
  if (!blog) {
    notFound();
  }

  // Helper function to transform image paths
  const getImagePath = (imagePath: string): string => {
    if (imagePath.startsWith('@/public')) {
      return imagePath.replace('@/public', '');
    }
    return imagePath;
  };

  return (
    <main className={styles.blogDetail}>
      <CheckoutHeader title='Blog' link='/blog' linkTitle='Blog' />
      <div className={styles.blogDetailContainer}>
        {/* Back button */}
        <div className={styles.blogDetailBackContainer}>
          <Link href="/" className={styles.blogDetailBack}>
            ← Back to blogs
          </Link>
        </div>
        
        {/* Blog content */}
        <article className={styles.blogDetailArticle}>
          <div className={styles.blogDetailHeader}>
            <h1 className={styles.blogDetailTitle}>{blog.title}</h1>
          </div>
          
          <div className={styles.blogDetailImageContainer}>
            <Image
              src={getImagePath(blog.image)}
              alt={blog.title}
              width={446}
              height={500}
              className={styles.blogDetailImage}
              priority
            />
          </div>
          
          <div className={styles.blogDetailContent}>
            <p>{blog.content}</p>
          </div>
        </article>
      </div>
      <Newsletter />
    </main>
  );
}

// Generate static paths for better SEO and performance
export async function generateStaticParams() {
  const blogs: Blog[] = blogsJson as Blog[];
  
  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailProps) {
  const { id } = await params;
  const blogs: Blog[] = blogsJson as Blog[];
  const blog = blogs.find(blog => blog.id.toString() === id);
  
  if (!blog) {
    return {
      title: 'Blog not found',
    };
  }
  
  return {
    title: blog.title,
    description: blog.content.substring(0, 160),
  };
}