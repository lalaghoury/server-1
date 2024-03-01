import React from "react";
import "./Blog.scss";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import AppLayout from "../../Layout/Layout";
import BlogCard from "../BlogCard/BlogCard";

const ViewMoreLink = () => {
  return (
    <span className="text-primary">
      <Link to="/blog" className="text-primary links-fix">View more</Link>
    </span>
  )
}

const BlogHeading = () => (
  <div className="common-heading">
    <h1 className="text-black font-48">Blogs</h1>
    <ViewMoreLink />
  </div>
)

const BlogHeading2 = () => (
  <div className="common-heading">
    <h1 className="text-black font-48">Blogs</h1>
  </div>
)

const BlogBreadcrumb = () => (
  <div className="breadcrumb">
    <Breadcrumb
      separator=">"
      items={[
        {
          title: "Home",
          href: "/",
          className: "bold",
        },
        {
          title: "Blogs",
          href: "/blog",
          className: "bold text-primary",
        },
      ]}
    />

  </div>

)

function Blog({ slice }) {
  return (
    <AppLayout>
      <BlogHeading />
      <div className="blog-container">
        <BlogCard slice={slice} />
      </div >
    </AppLayout>
  );
}

<ViewMoreLink />
export { Blog, BlogHeading, BlogHeading2, BlogBreadcrumb };

