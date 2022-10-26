import { useEffect, useState } from "react";
import { Story } from "../components/Story";
import { getItems } from "../services/HNService";
import { List, Divider, Pagination } from "antd";

export default function Stories({ storyType }) {
  const [stories, setStories] = useState([]);
  const [storyCount, setStoryCount] = useState(30);

  const handlePageChange = (page, pageSize) => {
    setStoryCount(page * 30);
  };

  useEffect(() => {
    getItems(storyType).then((data) => data && setStories(data));
  }, [storyType]);

  return (
    <div>
      <List>
        {stories.slice(storyCount - 30, storyCount).map((storyID) => (
          <div key={storyID}>
            <Story
              itemID={storyID}
              isolated={false}
              number={stories.indexOf(storyID) + 1}
            ></Story>
            <Divider />
          </div>
        ))}
      </List>
      {stories && stories.length > 0 && (
        <Pagination
          pageSize={30}
          total={stories.length}
          showSizeChanger={false}
          onChange={handlePageChange}
          style={{
            marginLeft: "32px",
            marginTop: "px",
            marginBottom: "16px",
          }}
        ></Pagination>
      )}
    </div>
  );
}
