import React, { useEffect, useState } from 'react';
import './BlogDetails.scss';
import { useFunctions } from '../../context/FunctionsSupply';
import { Breadcrumb, Button, Card } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CalendarOutlined, CommentOutlined, EditOutlined } from '@ant-design/icons';
import CommentsSection from '../CommentsSection/CommentsSection';
import { useAuth } from '../../context/AuthContext';
import AppLayout from '../../Layout/Layout';

function BlogDetails() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { blog_id } = useParams();
  const { getAllBlogs, getSingleBlog } = useFunctions();
  const [loading, setLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllBlogs()
      .then(data => setAllBlogs(data))
      .catch(error => console.error(error))
    getSingleBlog(blog_id)
      .then(data => setBlog(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

  }, [blog_id, getAllBlogs, getSingleBlog]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(blog)

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <AppLayout>
      <div className="blog-details">
        <div className="blog-details-head">
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
                  title: "Blog",
                  href: "/blog",
                  className: "bold text-primary",
                },
                {
                  title: blog.title,
                  href: "#",
                  className: "bold text-primary",
                }
              ]}
            />
          </div>
          <div className="blog-details-heading" style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            <h1>{blog.title}</h1>
            <p id="slogan"><i>{blog.slogan}</i></p>

          </div>
          <div className="blog-details-user">
            <span className="blog-details-user-card">
              <img src={blog.user.userimage} alt="userimage" style={{ marginRight: 10, width: 40, borderRadius: '50%' }} />
              <h4>
                <Link className="links-fix text-black" to={`/user/${blog.user._id}`}>
                  {blog.user.username}
                </Link>
              </h4>
            </span>
            <span className="blog-details-user-card">
              <CalendarOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
              <i>{blog.category.categoryname}</i>
            </span>
            <span className="blog-details-user-card">
              <CommentOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
              {blog.comments.length} Comments
            </span>
            <span className="blog-details-user-card">
              {blog.user._id === auth?.user?._id && <div className='edit-button'>
                <Button className="disable-hover bold"
                  style={{ margin: 0 }}
                  onClick={() => navigate(`/blog/edit/${blog._id}`)}>
                  <EditOutlined style={{ padding: 0 }} />Edit
                </Button>
              </div>}
            </span>
          </div>
        </div>
        <div className="blog-details-body">
          <div className="blog-left">
            <div className="blog-left-image">
              <img src={blog.image} alt={blog.title} />
            </div>
            <div className="blog-left-text">
              <div className="body-left-text-second">
                <p>{blog.description}</p>
                <p>{blog.content}</p>
              </div>
            </div>
            <div className="blog-comments">
              {
                auth?.user ? <CommentsSection Id={blog_id} used={"Blog"} /> :
                  <div className="tac">Please login to comment <Button className="disable-hover" type="primary" onClick={() => navigate('/login')}>Login</Button></div>
              }
            </div>
          </div>
          <div className="blog-right">
            <div className="blog-right-recent-recipes">
              <h2 style={{ marginBottom: 10 }}>Recent Blogs </h2>
              <div>
                {allBlogs && allBlogs?.slice(0, 3).map((recentBlog) => (
                  <Card
                    key={recentBlog._id}
                    hoverable
                    style={{ width: `100%`, marginBottom: 10 }}
                    cover={<img alt={recentBlog.title} src={recentBlog.image} />}
                  >
                    <center><strong style={{ marginBottom: 5 }}>{recentBlog.title}</strong></center>
                    <a href={`/blog/${recentBlog._id}`} className="links-fix text-black">
                      <Button className="disable-hover" type="primary" block>
                        View Blog
                      </Button>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default BlogDetails;
