import { Menu, Drawer, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MenuOutlined } from "@ant-design/icons";

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 787px)" });

  return (
    <>
      {isMobile && (
        <Button
          type="text"
          onClick={handleOpen}
          style={{ alignSelf: "center" }}
        >
          <MenuOutlined style={{ color: "white", fontSize: "16px" }} />
        </Button>
      )}
      <div style={{ paddingRight: "16px" }}>
        <Typography.Text style={{ color: "white", fontSize: "16px" }}>
          Hacker News
        </Typography.Text>
      </div>
      {!isMobile && (
        <Menu
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={["New"]}
          style={{ width: 500 }}
        >
          <Menu.Item key="New">
            <Link to="/new">New</Link>
          </Menu.Item>
          <Menu.Item key="Top">
            <Link to="/top">Top</Link>
          </Menu.Item>
          <Menu.Item key="Show">
            <Link to="/show">Show</Link>
          </Menu.Item>
          <Menu.Item key="Ask">
            <Link to="/ask">Ask</Link>
          </Menu.Item>
          <Menu.Item key="Jobs">
            <Link to="/jobs">Jobs</Link>
          </Menu.Item>
        </Menu>
      )}
      {isMobile && (
        <Drawer
          visible={open}
          placement="left"
          className="drawer"
          onClose={handleOpen}
          title="Hacker News"
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={["0"]}
            onClick={handleOpen}
          >
            <Menu.Item key="New">
              <Link to="/new">New</Link>
            </Menu.Item>
            <Menu.Item key="Top">
              <Link to="/top">Top</Link>
            </Menu.Item>
            <Menu.Item key="Show">
              <Link to="/show">Show</Link>
            </Menu.Item>
            <Menu.Item key="Ask">
              <Link to="/ask">Ask</Link>
            </Menu.Item>
            <Menu.Item key="Jobs">
              <Link to="/jobs">Jobs</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      )}
    </>
  );
};
