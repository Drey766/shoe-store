'use client'
import blogsJson from '@/app/data/blogs.json';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import './Blogs.css';

interface Blog {
  id: string | number;
  title: string;
  content: string;
  image: string;
}

export default function Blog() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  // Helper function to transform image paths
  const getImagePath = (imagePath: string): string => {
    if (imagePath.startsWith('@/public')) {
      return imagePath.replace('@/public', '');
    }
    return imagePath;
  };

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number = 100): string => {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
  };

  // Type the blogs data
  const blogs: Blog[] = blogsJson as Blog[];

  return (
    <section className="blog">
      <span className='blogTitle'>Our latest blog</span>
      <div className="blogsContainer">
        <Carousel
          swipeable={false}
          draggable={true}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          transitionDuration={2000}
          containerClass="products-carousel"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType="desktop"
          dotListClass="custom-dot-list-style"
          itemClass="blogCarouselItem"
          arrows={true}
          className="blog__carousel">
          {blogs.map((blog: Blog, index: number) => (
            <div key={blog.id || index} className="blog__item">
              <Image
                src={getImagePath(blog.image)}
                alt={blog.title}
                width={406}
                height={450}
                className="blog__image"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="blog__text">
                <h2 className="blog__title">{blog.title}</h2>
                <p className="blog__description">
                  {truncateContent(blog.content)}
                </p>
                <Link href={`/blog/${blog.id}`} className="blog__link">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}