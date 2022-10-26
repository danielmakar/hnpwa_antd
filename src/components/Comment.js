import { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import { getItem } from "../services/HNService";
import { Link } from "react-router-dom";
import { List, Typography, Divider } from "antd";

export const Comment = ({ commentID, level }) => {
  const [comment, setComment] = useState({});
  //const [parentStory, setParentStory] = useState({});

  useEffect(() => {
    getItem(commentID).then((data) => data && data.id && setComment(data));
    // getCommentParent(commentID).then(
    //   (data) => data && data.id && setParentStory(data)
    // );
  }, [commentID]);

  const getCommentHeader = () => {
    return (
      <Typography.Text>
        <Link to={`/user/${comment.by}`} className="link bold">
          {comment.by}
        </Link>{" "}
        <TimeAgo date={comment.time * 1000}></TimeAgo>
      </Typography.Text>
    );
  };

  const getCommentText = () => {
    return (
      <Typography.Paragraph>
        <span dangerouslySetInnerHTML={{ __html: comment.text }}></span>
      </Typography.Paragraph>
    );
  };

  return (
    !comment.deleted && (
      <>
        <List itemLayout="horizontal" size="small">
          <div className={`comment-level-${level}`}>
            {getCommentHeader()}
            {getCommentText()}
            <Divider />
          </div>
          {comment.kids
            ? comment.kids.map((child) => (
                <Comment
                  key={child}
                  commentID={child}
                  level={level + 1}
                ></Comment>
              ))
            : null}
        </List>
      </>
    )
  );
};
