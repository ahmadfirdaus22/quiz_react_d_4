import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card, Button, Row, Col, Input, Layout, Modal} from "antd";
import Form from "./components/Form/Form";
import { postData, putData, patchData, deleteData } from "./components/services";
const { Search } = Input;

function App() {
  const [posts, setPosts] = useState([]);
  const [num, setNum] = useState(1);
  const [numl, setNuml] = useState(3);
  const [names, setNames] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3004/users?_page=" + num + "&_limit=" + numl + names
      );
      if (res.status == 200) {
        setPosts(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [num, numl, names]);

  const plusNum = () => {
    setNum(num + 1);
  };

  const minNum = () => {
    setNum(num - 1);
  };

  const changeLimit = (e) => {
    setNuml(e.target.value);
  };

  const searchName = (e) => {
    if (e == "" || e == null) {
      setNames(null);
    } else {
      setNames("&name=" + e );
    }
  };
  return (
    <div className="App">
      <Layout style={{ padding: "20px 50px", height: "55vw" }}>
        <Search
          placeholder="Search by name"
          allowClear
          style={{ width: "30vw" }}
          enterButton="Search"
          size="large"
          onSearch={searchName}
        />
        <br />
        <div style={numl >= 7 ? {overflowY:"scroll", overflowX:"hidden"} : null}>
          <Row gutter={[16, 24]}>
            {posts.map((post, index) => (
              <Col span={8}>
                <Card key={index}>
                  <li>{post.age}</li>
                  <li>{post.name}</li>
                  <li>{post.email}</li>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <br />
        <div>
          <Button style={{ width: "33%" }} onClick={minNum}>
            Prev
          </Button>
          <Input
            className="limit"
            type="number"
            onChange={changeLimit}
            defaultValue={3}
            min={1}
            style={{ width: "33%", textAlign: "center" }}
          />
          <Button style={{ width: "33%" }} onClick={plusNum}>
            Next
          </Button>
        </div>
        <br />
        <br />
        <div>
          <Row gutter={[16, 24]}>
            <Col span={6}>
              <Card>
                <h3>Post Request To Json Server</h3>
                <br />
                <Form
                  name={"Add"}
                  action={(e) => {
                    postData(e);
                  }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <h3>Put Request To Json Server</h3>
                <br />
                <Form
                  name={"Put"}
                  type={"UPDATE"}
                  action={(e) => {
                    putData(e);
                  }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <h3>Patch Request To Json Server</h3>
                <br />
                <Form
                  name={"Patch"}
                  type={"UPDATE"}
                  action={(e) => {
                    patchData(e);
                  }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <h3>Delete Request To Json Server</h3>
                <form
                  onSubmit={(e) => {
                    deleteData(e);
                  }}
                >
                  <br />
                  <Input type="number" placeholder="id" className="id" />
                  <br /> <br />
                  <Button htmlType="submit" type="primary" danger block>
                    Delete
                  </Button>
                </form>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    </div>
  );
}

export default App;
