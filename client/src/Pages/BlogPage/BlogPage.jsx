import React from 'react'
import './BlogPage.scss'
import { BlogBreadcrumb, BlogHeading2 } from '../../components/Blog/Blog'
import AppLayout from '../../Layout/Layout'
import BlogCard from '../../components/BlogCard/BlogCard'
function BlogPage() {
    return (
        <AppLayout>
            <div className="blog-page">
                <div className="blog-page-heading">
                    <BlogBreadcrumb />
                    <BlogHeading2 />
                </div>
                <div className="blog-page-body">
                    <BlogCard />
                </div>
            </div>
        </AppLayout>

    )
}

export default BlogPage
