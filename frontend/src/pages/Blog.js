import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/blog.scss';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Cloud Computing Trends 2024",
      excerpt: "Explore the latest trends in cloud computing and how they're shaping the future of business technology.",
      date: "April 2, 2024",
      category: "Cloud",
      tags: ["Cloud", "Technology", "Innovation"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      author: "Aaron Beyer"
    },
    {
      id: 2,
      title: "DevOps Best Practices",
      excerpt: "Learn about the essential DevOps practices that can transform your development workflow.",
      date: "April 1, 2024",
      category: "DevOps",
      tags: ["DevOps", "CI/CD", "Automation"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Alex Dupuy"
    },
    {
      id: 3,
      title: "Infrastructure as Code",
      excerpt: "Discover how Infrastructure as Code is revolutionizing cloud infrastructure management.",
      date: "March 31, 2024",
      category: "Cloud",
      tags: ["IaC", "Cloud", "Automation"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Andriy Duyko"
    }
  ];

  return (
    <>
      <ScrollToTop />
      <div className="hero_area sub_pages">
        <Header />
        
        <section className="blog_section">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>
                Our <span>Blog</span>
              </h2>
              <p>Insights and updates from our team of experts</p>
            </div>

            <div className="blog_grid">
              {blogPosts.map(post => (
                <div key={post.id} className="blog_box">
                  <div className="img-box">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="detail-box">
                    <div className="blog_meta">
                      <span className="date">{post.date}</span>
                      <span className="author">By {post.author}</span>
                    </div>
                    <h5>{post.title}</h5>
                    <p>{post.excerpt}</p>
                    <div className="blog_tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                    <Link to={`/blog/${post.id}`} className="read_more">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog; 