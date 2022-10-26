import "./App.css";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Stories from "./sites/Stories";
import { Comment } from "./components/Comment";
import { Story } from "./components/Story";
import { User } from "./components/User";
import { Layout } from "antd";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Layout.Header style={{ paddingLeft: "24px", display: "flex" }}>
          <Navigation></Navigation>;
        </Layout.Header>
        <Layout.Content style={{ marginLeft: "16px", marginRight: "8px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/new" />}></Route>
            <Route
              path="/new"
              element={<Stories storyType={"newstories"}></Stories>}
            ></Route>
            <Route
              path="/top"
              element={<Stories storyType={"topstories"}></Stories>}
            ></Route>
            <Route
              path="/ask"
              element={<Stories storyType={"askstories"}></Stories>}
            ></Route>
            <Route
              path="/show"
              element={<Stories storyType={"showstories"}></Stories>}
            ></Route>
            <Route
              path="/jobs"
              element={<Stories storyType={"jobstories"}></Stories>}
            ></Route>
            <Route
              path="/comments"
              element={<Comment commentID={2921983}></Comment>}
            ></Route>
            <Route path="/user/:userID" element={<User></User>}></Route>
            <Route
              path="/story/:storyID"
              element={<Story isolated={true}></Story>}
            ></Route>
          </Routes>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
