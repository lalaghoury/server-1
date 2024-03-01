import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UserProfilePage.scss";
import { useFunctions } from "../../context/FunctionsSupply";
import { useAccount } from "../../context/AccountContext";
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  Upload,
  message,
  Tabs,
  Row,
  Col,
  Card,
  Modal,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAddRecipe } from "../../context/AddRecipeContext";
import axios from "axios";
import { BellFilled } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import Meta from "antd/es/card/Meta";
import AppLayout from "../../Layout/Layout";

function UserProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { getUser, timePassed } = useFunctions();
  const { user_id } = useParams();
  const { handleSignout } = useAccount();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [fullname, setFullname] = useState("");
  const { auth, setAuth } = useAuth();
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const {
    beforeUpload,
    handleUpload,
    recipe_imageurl,
    showImage,
    setShowImage,
  } = useAddRecipe();
  const [followingCount, setFollowingCount] = useState(0);
  const { TabPane } = Tabs;

  const confirmUnsubscribe = () => {
    Modal.confirm({
      title: "Are you sure you want to unsubscribe from the newsletter?",
      content: "You will stop receiving our latest news and updates.",
      onOk() {
        handleUnsubscribe();
      },
      onCancel() {
        console.log("Unsubscribe cancelled");
      },
    });
  };

  const confirmUpdate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !email || !bio || !fullname) {
      return message.error("All fields are required", 3);
    }

    if (!emailRegex.test(email)) return message.error("Invalid email", 3);

    if (
      username === user.username &&
      email === user.email &&
      bio === user.bio &&
      fullname === user.fullname
    ) {
      return message.error("No changes made", 3);
    }
    Modal.confirm({
      title: "Confirm Update",
      content: "Are you sure you want to update your credentials?",
      onOk: handleUserCredentialsUpdate,
      onCancel() {
        console.log("Cancel update");
      },
    });
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post("/api/newsletter/unsubscribe");
      const data = response.data;
      if (data.success) {
        message.success(data.message);
        const updatedUser = { ...auth.user, newsletter: false };
        setAuth((previousAuth) => ({
          ...previousAuth,
          user: updatedUser,
          token: data.token,
        }));
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: updatedUser })
        );
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.error(error);
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUser(user_id);
      if (data) {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setBio(data.bio);
        setFullname(data.fullname);
        setAlreadyFollowing(data.followers?.includes(auth.user._id));
        setFollowingCount(data.followers?.length);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [getUser, user_id, auth.user._id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleUserCredentialsUpdate = async () => {
    try {
      const response = await axios.put(`/api/user/${user_id}`, {
        username,
        email,
        bio,
        fullname,
      });
      if (response.data.success) {
        console.log(`User Updated Successfully`, response.data.user);
        setAuth((previousAuth) => ({
          ...previousAuth,
          user: response.data.user,
        }));
        fetchUser();
        message.success(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      message.error(error.response.data.message, 3);
    }
  };

  const handleUserImageChange = async () => {
    try {
      const response = await axios.put(`/api/user/${user_id}`, {
        userbigimage: recipe_imageurl,
        userimage: recipe_imageurl,
      });
      if (response.data.success) {
        console.log(`Recipe Image Changed Successfully`, response.data.user);
        setAuth((previousAuth) => ({
          ...previousAuth,
          user: response.data.user,
        }));
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: {
              ...auth.user,
              userimage: response.data.user.userimage,
              userbigimage: response.data.user.userbigimage,
            },
          })
        );
        fetchUser();
        setShowImage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollowChange = async (Id, action) => {
    const endpoint = action === "follow" ? "follow" : "unfollow";
    try {
      const response = await axios.put(`/api/user/${user_id}/${endpoint}`, {
        Id,
      });
      if (response.data.success) {
        message.success(response.data.message);
        setAlreadyFollowing(response.data.following);
        setFollowingCount(response.data.followingCount);
      }
    } catch (error) {
      console.log(error.response.data.message);
      message.error(error.response.data.message, 3);
    }
  };

  const isCurrentUser = auth?.user?._id === user?._id;

  if (loading || !user.username)
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );

  if (!user) return <h1>Loading...</h1>;

  const formattedTime = timePassed(user.createdAt);
  let timeUnit;
  if (formattedTime.includes("minute")) {
    timeUnit = "minute(s)";
  } else if (formattedTime.includes("hour")) {
    timeUnit = "hour(s)";
  } else if (formattedTime.includes("day")) {
    timeUnit = "day(s)";
  } else if (formattedTime.includes("month")) {
    timeUnit = "month(s)";
  } else if (formattedTime.includes("year")) {
    timeUnit = "year(s)";
  }

  const timeValue = formattedTime.split(" ")[0];

  return (
    <AppLayout>
      <div className="user-profile-page">
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
                title: "Profile",
                href: "/recipe",
                className: "bold",
              },
            ]}
          />
        </div>

        <div className="profile-head">
          <div className="user-image">
            <span className="rotate">
              <img
                width="70"
                height="70"
                src="https://img.icons8.com/dotty/70/chef-hat.png"
                alt="chef-hat"
              />
            </span>
            {showImage ? (
              <img
                className="rounded"
                src={recipe_imageurl}
                alt={user.username}
              />
            ) : (
              <img
                className="rounded"
                src={user.userbigimage}
                alt={user.username}
              />
            )}
            <span style={{ marginTop: "10px" }}>
              <center>
                <h2>
                  {user.username
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </h2>
              </center>
            </span>
          </div>

          <span
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              gap: 15,
            }}
          >
            {isCurrentUser ? (
              <Form>
                <Form.Item name="recipe_imageurl">
                  <Upload
                    beforeUpload={beforeUpload}
                    onChange={handleUpload}
                    showUploadList={false}
                  >
                    <Button
                      style={{ display: "flex", alignItems: "center" }}
                      className="disable-hover text-primary bold"
                    >
                      Edit Profile Picture{" "}
                      <BellFilled style={{ marginLeft: "5px" }} />
                    </Button>
                  </Upload>
                </Form.Item>
                {showImage && (
                  <center>
                    {" "}
                    <Button onClick={handleUserImageChange}>Save</Button>
                  </center>
                )}
              </Form>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                <h1>
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)}
                </h1>
                <div>
                  <Button
                    onClick={() =>
                      handleFollowChange(
                        user._id,
                        alreadyFollowing ? "unfollow" : "follow"
                      )
                    }
                    className="disable-hover bold text-primary"
                  >
                    {alreadyFollowing ? "Unfollow" : "Follow"}
                  </Button>
                </div>
              </div>
            )}
          </span>

          <div className="profile-head-details">
            <span className="details-user-card">
              <h4>Followers</h4>
              <h3>{followingCount}</h3>
            </span>{" "}
            <hr />
            <span className="details-user-card">
              <h4>Experience</h4>
              <h3>{`${timeValue} ${timeUnit}`}</h3>
            </span>{" "}
            <hr />
            <span className="details-user-card">
              <h4>Recipes</h4>
              <h3>{user.recipes.length}</h3>
            </span>
          </div>

          {isCurrentUser && (
            <div>
              <p style={{ textAlign: "left" }}>{user.bio}</p>
            </div>
          )}
        </div>

        <Divider />

        {isCurrentUser ? (
          <div className="profile-details">
            <div className="user-form">
              <Form
                size="small"
                layout="vertical"
                initialValues={{
                  username: user.username,
                  email: user.email,
                  bio: user.bio,
                  fullname: user.fullname,
                }}
                scrollToFirstError={true}
              >
                <div className="user-form-wrap">
                  <Form.Item
                    label="Name"
                    style={{ opacity: 0.7 }}
                    name="fullname"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="Enter Your Full Name"
                      style={{ padding: 8 }}
                      className="antd-form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Username"
                    name="username"
                    style={{ opacity: 0.7 }}
                    rules={[
                      { required: true, message: "Please enter your username" },
                    ]}
                  >
                    <Input
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter Your Username"
                      style={{ padding: 8 }}
                      className="antd-form-input"
                    />
                  </Form.Item>
                </div>

                <div className="user-form-wrap">
                  <Form.Item
                    label="Email"
                    name="email"
                    style={{ opacity: 0.7 }}
                    rules={[
                      {
                        type: "email",
                        message: "The input is not a valid email!",
                      },
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      style={{ padding: 8 }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    style={{ opacity: 0.7 }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                    ]}
                  >
                    <Button
                      style={{
                        marginTop: 5,
                        padding: 15,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="disable-hover text-primary bold"
                      onClick={() =>
                        navigate(`/user/${user_id}/change-password`)
                      }
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </div>

                <div className="user-form-wrap">
                  <Form.Item
                    label="User Bio"
                    name="bio"
                    style={{ opacity: 0.7 }}
                    rules={[
                      { required: true, message: "Please enter your bio" },
                    ]}
                  >
                    <TextArea
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Hello welcome to my page , I hope you enjoy the recipes I created"
                      style={{ padding: 8 }}
                      // className="antd-form-input"
                    />
                  </Form.Item>
                </div>
              </Form>
              {user &&
                (username !== user.username ||
                  email !== user.email ||
                  bio !== user.bio ||
                  fullname !== user.fullname) && (
                  <center>
                    <Button
                      className="bold text-black bg-secondary disable-hover-sec"
                      onClick={fetchUser}
                    >
                      Cancel
                    </Button>
                  </center>
                )}
            </div>

            <div className="user-plan">
              <div className="user-plan-div">
                <span className="s1">
                  <h3>My Recipes</h3>
                  <span>
                    <img
                      width="70"
                      height="70"
                      src="https://img.icons8.com/dotty/70/chef-hat.png"
                      alt="chef-hat"
                    />
                  </span>
                </span>
                <span className="s2">
                  <p>
                    These are the recipes{" "}
                    <strong>
                      {user && user.username
                        ? user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)
                        : "User"}
                    </strong>{" "}
                    has created
                  </p>
                  <span>
                    <Link
                      className="links-fix text-primary bold"
                      to="/my-recipes"
                    >
                      Show & manage
                    </Link>
                  </span>
                </span>
              </div>
              <div className="user-plan-div">
                <span className="s1">
                  <h3>Favourite Recipes</h3>
                  <span>
                    <img
                      width="70"
                      height="70"
                      src="https://img.icons8.com/dotty/70/chef-hat.png"
                      alt="chef-hat"
                    />
                  </span>
                </span>
                <span className="s2">
                  <p>
                    The recipes that{" "}
                    <strong>
                      {user && user.username
                        ? user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)
                        : "User"}
                    </strong>{" "}
                    have saved.
                  </p>
                  <span>
                    <Link
                      className="links-fix text-primary bold"
                      to="/saved-recipes"
                    >
                      Show & manage
                    </Link>
                  </span>
                </span>
              </div>
              <div className="user-plan-div">
                <span className="s1">
                  <h3>My Cookbook</h3>
                  <span>
                    <img
                      width="70"
                      height="70"
                      src="https://img.icons8.com/dotty/70/chef-hat.png"
                      alt="chef-hat"
                    />
                  </span>
                </span>
                <span className="s2">
                  <p>
                    The Cookbooks that{" "}
                    <strong>
                      {user && user.username
                        ? user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)
                        : "User"}
                    </strong>{" "}
                    has made.
                  </p>
                  <span>
                    <Link
                      className="links-fix text-primary bold"
                      to="/user/cookbook"
                    >
                      Show & manage
                    </Link>
                  </span>
                </span>
              </div>
              <div className="user-plan-div">
                <span className="s1">
                  <h3>My Plan</h3>
                  <span>
                    <img
                      width="70"
                      height="70"
                      src="https://img.icons8.com/dotty/70/chef-hat.png"
                      alt="chef-hat"
                    />
                  </span>
                </span>
                <span className="s2">
                  <p>Recipes</p>
                  <span className="text-primary bold">Show & manage</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Tabs defaultActiveKey="1" className="text-primary bold">
              <TabPane
                tab="My Recipes"
                key="1"
                className="text-primary bold"
                style={{ fontSize: 20, color: "black" }}
              >
                {/* Component or code to display user's recipes */}
                {user && user.recipes && user.recipes.length > 0 ? (
                  <Row gutter={16}>
                    {user.recipes.map((recipe, index) => (
                      <Col span={8} key={index}>
                        <Card
                          hoverable
                          style={{ width: 300 }}
                          cover={
                            <div style={{ height: 200, overflow: "hidden" }}>
                              <img
                                alt={recipe.recipe_title}
                                src={recipe.recipe_imageurl}
                                style={{ width: "100%", height: "200px" }}
                              />
                            </div>
                          }
                        >
                          <Meta
                            title={recipe.recipe_title}
                            description={
                              recipe.recipe_description.length > 30
                                ? recipe.recipe_description.substring(0, 30) +
                                  "..."
                                : recipe.recipe_description
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No recipes found.</p>
                )}
              </TabPane>
              <TabPane
                tab="Collections"
                className="text-primary bold"
                key="2"
                style={{ fontSize: 20, color: "black" }}
              >
                {/* Component or code to display user's collections */}
                {user && user.recipes && user.recipes.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {["New Collection", "My Cookbook", "My Recipes"]
                      .slice(0, 3)
                      .map((collectionName) => {
                        const collectionRecipes = user.recipes.filter(
                          (recipe) =>
                            recipe.recipe_collection === collectionName
                        );
                        const coverImage =
                          collectionRecipes.length > 0
                            ? collectionRecipes[0].recipe_imageurl
                            : "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/05/Chicken-Salad-5.jpg";
                        const onCardClick = () => {
                          navigate(`/recipe?collection=${collectionName}`);
                        };

                        return (
                          <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={8}
                            key={collectionName}
                            onClick={onCardClick}
                          >
                            <Card
                              hoverable
                              title={collectionName}
                              style={{ width: "100%", cursor: "pointer" }}
                              cover={
                                <img
                                  alt={collectionName}
                                  src={coverImage}
                                  style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                  }}
                                />
                              }
                            >
                              <Meta
                                description={
                                  <div>
                                    <strong>
                                      {collectionRecipes.length} Recipe(s)
                                    </strong>
                                  </div>
                                }
                              />
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                ) : (
                  <p>No collections found.</p>
                )}
              </TabPane>
            </Tabs>
          </div>
        )}

        {isCurrentUser && (
          <div className="user-newsletter">
            <Divider />
            {auth?.user?.newsletter && (
              <>
                {" "}
                <h3>Newsletter</h3>
                <span className="news-text">
                  <p>You are currently subscribed to our newsletter.</p>
                  <Button
                    onClick={confirmUnsubscribe}
                    className="btn-primary-medium disable-hover bold"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "3rem",
                    }}
                  >
                    Unsubscribe
                  </Button>
                </span>
              </>
            )}
            <div className="user-newsletter-buttons">
              <Button
                onClick={confirmUpdate}
                className="user-btn disable-hover bold"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  handleSignout();
                  setTimeout(() => navigate("/login"), 500);
                }}
                className="user-btn text-grey bold disable-hover-sec"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default UserProfilePage;
