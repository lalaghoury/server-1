import React, { useState } from "react";
import { Button } from "antd";
import "./comments.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useFunctions } from "../../context/FunctionsSupply";
import { useAuth } from "../../context/AuthContext";

const Comments = ({ comments, onUpdateComments, used }) => {
  const { timePassed } = useFunctions();
  const [showInput, setShowInput] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const { auth } = useAuth();
  const userId = auth.user._id;

  const handleReply = async (commentId) => {
    try {
      const newComment = {
        content: commentBody,
        author: userId,
        model: used,
      };
      await axios.post(`/api/comments/${commentId}/reply`, newComment);
      onUpdateComments();
      setCommentBody("");
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      onUpdateComments(); // Fetch updated comments after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error here
    }
  };

  const handleUpdate = async (commentId) => {
    try {
      await axios.put(`/api/comments/${commentId}`, {
        content: commentBody,
        updatedAt: new Date(),
      });
      onUpdateComments(); // Fetch updated comments after update
    } catch (error) {
      console.error("Error updating comment:", error);
      // Handle error here
    }
  };

  return (
    <div>
      <div className={`${comments.content && "comment-container"}`}>
        <div style={{ display: "flex", gap: 10 }}>
          <span>
            <img
              src={comments.author.userimage}
              alt="img"
              style={{ width: 40, borderRadius: "50%" }}
            />
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ display: "flex", gap: 10, alignSelf: "flex-start" }}>
              <span style={{ fontWeight: "600" }}>
                <Link
                  style={{ alignSelf: "flex-start" }}
                  className="links-fix text-black"
                  to={`/user/${comments.author._id}`}
                >
                  {comments.author.username}
                </Link>
              </span>
              <span>
                <span>
                  {comments.updatedAt
                    ? `edited ${timePassed(comments.updatedAt)}`
                    : timePassed(comments.createdAt)}
                </span>
              </span>
            </span>
            <span style={{ fontWeight: "400" }}>
              <p>{comments.content}</p>
            </span>
            {showInput && (
              <TextArea
                type="text"
                placeholder="Reply"
                className="input"
                autoFocus
                onPressEnter={() => handleReply(comments._id)}
                onChange={(e) => setCommentBody(e.target.value)}
                autoSize={{ minRows: 0, maxRows: 100 }}
                style={{ width: "100%", padding: 20 }}
              />
            )}
            {showEdit && (
              <TextArea
                type="text"
                className="input"
                autoFocus
                onPressEnter={() => handleUpdate(comments._id)}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                autoSize={{ minRows: 0, maxRows: 100 }}
                style={{ width: "100%", padding: 20 }}
              />
            )}
            {showInput && (
              <div>
                <Button
                  className="button"
                  onClick={() => handleReply(comments._id)}
                >
                  Reply
                </Button>
                <Button
                  className="button"
                  onClick={() => {
                    setShowInput(false);
                    setCommentBody("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
            {showEdit && (
              <div>
                <Button
                  className="button"
                  onClick={() => {
                    handleUpdate(comments._id);
                    setShowEdit(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  className="button"
                  onClick={() => {
                    setShowEdit(false);
                    setCommentBody(comments.content);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
            {!showInput && !showEdit && comments.content && (
              <div>
                <Button className="button" onClick={() => setShowInput(true)}>
                  Reply
                </Button>
                {comments.author._id === userId && (
                  <Button
                    className="button"
                    onClick={() => {
                      setShowEdit(true);
                      setCommentBody(comments.content);
                    }}
                  >
                    Edit
                  </Button>
                )}
                {comments.author._id === userId && (
                  <Button
                    className="button"
                    onClick={() => handleDelete(comments._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </span>
        </div>
      </div>
      <div style={{ paddingLeft: 30 }}>
        {comments?.replies?.map((comment) => (
          <Comments
            key={comment._id}
            comments={comment}
            onUpdateComments={onUpdateComments}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
