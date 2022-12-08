import React from "react";
import { Card, Button, Row, Col, Input } from "antd";
import "./Form.style.css";

const Form = ({ action, type, name }) => {
  return (
    <form
      className="form-container"
      onSubmit={(e) => {
        action(e);
      }}
    >
      {type === "UPDATE" && (
        <Input className="input" placeholder="id" type="number" />
      )}
      <Input placeholder="age" className="input" type="number" />
      <Input placeholder="name" className="input" type="text" />
      <Input placeholder="email" className="input" type="text" />
      <Button htmlType="submit" block type="primary">
        {name}
      </Button>
    </form>
  );
};

export default Form;
