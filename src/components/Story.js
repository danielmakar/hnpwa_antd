import { getItem } from "../services/HNService";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, List, Divider } from "antd";
import urlParse from "url-parse";
import TimeAgo from "react-timeago";
import { Comment } from "./Comment";

export const Story = ({ itemID, isolated, number }) => {
  const [story, setStory] = useState({});

  const { storyID } = useParams();

  useEffect(() => {
    itemID
      ? getItem(itemID).then((data) => data && data.id && setStory(data))
      : getItem(storyID).then((data) => data && data.id && setStory(data));
  }, [itemID, storyID]);

  const getStoryTitle = () => {
    return story.url ? (
      <>
        <Typography.Link
          href={story.url}
          style={{
            textDecoration: "none",
            color: "black",
            "&:hover": { textDecoration: "underline" },
            fontSize: "16px",
          }}
        >
          {story.title} ({urlParse(story.url).hostname})
        </Typography.Link>
      </>
    ) : (
      <Link to={`/${story.type}/${story.id}`} className="link">
        <Typography.Text style={{ fontSize: "16px" }}>
          {story.title}
        </Typography.Text>
      </Link>
    );
  };

  const getStoryData = () => {
    if (story.type === "job") {
      return (
        <>
          <Typography.Paragraph>
            <TimeAgo date={story.time * 1000}></TimeAgo>
          </Typography.Paragraph>
        </>
      );
    }

    return (
      <>
        <Typography.Paragraph>
          {story.score} points by{" "}
          <Link to={`/user/${story.by}`} className="link bold">
            {story.by}
          </Link>{" "}
          <TimeAgo date={story.time * 1000}></TimeAgo> |{" "}
          <Link to={`/story/${story.id}`} className="link bold">
            {story.descendants === 1
              ? `${story.descendants} comment`
              : `${story.descendants} comments`}
          </Link>
        </Typography.Paragraph>
      </>
    );
  };

  const getStoryText = () => {
    return (
      isolated &&
      story.text && (
        <Typography.Text>
          <span dangerouslySetInnerHTML={{ __html: story.text }}></span>
        </Typography.Text>
      )
    );
  };

  const getStoryNumber = () => {
    return (
      !isolated && (
        <Typography.Title
          level={5}
          style={{ alignSelf: "center", marginRight: "16px" }}
        >
          {number}.
        </Typography.Title>
      )
    );
  };

  const getStoryComments = () => {
    return (
      isolated &&
      story.kids &&
      story.kids.map((kid) => (
        <Comment key={kid} commentID={kid} level={0}></Comment>
      ))
    );
  };

  return (
    <List>
      <div style={{ display: "flex" }}>
        {getStoryNumber()}
        <div style={{ marginBottom: "-16px" }}>
          {getStoryTitle()}
          {getStoryData()}
          {getStoryText()}
        </div>
      </div>
      {isolated && <Divider />}
      {getStoryComments()}
    </List>
  );
};
