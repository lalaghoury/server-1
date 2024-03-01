import React, { useEffect, useState } from "react";
import './BlogCard.scss'
import { Link, useNavigate } from "react-router-dom";
import { Card, } from "antd";
import { useFunctions } from "../../context/FunctionsSupply";

const BlogCard = ({ slice }) => {
    const { getAllBlogs } = useFunctions();
    const [allBlogs, setAllBlogs] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBlogs()
            .then(setAllBlogs)
            .catch(setError);
    }, [getAllBlogs]);

    if (error) {
        return <div>Error fetching blogs: {error.message}</div>;
    }
    return (
        <div className="blog-posts">
            {slice && slice !== 0 ? (
                <>
                    {allBlogs && allBlogs.slice(0, slice).map((blog) => (
                        <Card hoverable onClick={() => navigate(`/blog/${blog._id}`)} key={blog._id} className="blog-card" bodyStyle={{ padding: 0 }}>
                            <div className="blog-card-img">
                                <img src={blog.image} alt={blog.title} />
                            </div>
                            <Card.Meta
                                title={
                                    <Link className="links-fix text-black" to={`/blog/${blog._id}`}>
                                        {blog.title}
                                    </Link>
                                }
                                description={blog.description.length > 30 ? blog.description.substring(0, 30) + '...' : blog.description} />
                        </Card>
                    ))}
                </>
            ) : (
                <>
                    {allBlogs && allBlogs.map((blog) => (
                        <Card key={blog._id} bodyStyle={{ padding: 5 }} className="blog-card" hoverable onClick={() => navigate(`/blog/${blog._id}`)}>
                            <div className="blog-card-img">
                                <img src={blog.image} alt={blog.title} />
                            </div>
                            <Card.Meta
                                title={
                                    <Link className="links-fix text-black" to={`/blog/${blog._id}`} >
                                        {blog.title}
                                    </Link>
                                }
                                description={blog.slogan}
                            />
                        </Card>
                    ))}
                </>
            )}
        </div>
    )
}

export default BlogCard
