import { getUser } from "../services/HNService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Typography } from "antd";

export const User = () => {
  const [user, setUser] = useState({});

  const { userID } = useParams();

  useEffect(() => {
    getUser(userID).then((data) => data && data.id && setUser(data));
  }, [userID]);

  let userDate = new Date(user.created * 1000);

  return (
    <>
      <Typography.Title
        level={6}
        sx={{ fontWeight: "Bold", fontSize: "h6.fontSize" }}
      >
        {user.id}
      </Typography.Title>
      <div>
        <Typography.Text>
          Created: <TimeAgo date={user.created * 1000}></TimeAgo> (
          {userDate.toDateString()})
        </Typography.Text>
      </div>
      <div>
        <Typography.Text>Karma: {user.karma} points</Typography.Text>
      </div>
      {user.about && (
        <div>
          <Typography.Text>
            <span dangerouslySetInnerHTML={{ __html: user.about }}></span>
          </Typography.Text>
        </div>
      )}
    </>
  );
};
