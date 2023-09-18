import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Input, message, } from "antd";
import "./department.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

export const DepartmentAdd = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const authToken = localStorage.getItem("token");

      const response = await axios.post('/Department', values, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      // Handle the response as needed
      console.log(response.data);
      if (response.data.message === "A Department with the same name already exists.") {
        message.warning(response.data.message);


      } else {
        message.success(response.data.message);
        setTimeout(() => {
          form.resetFields();
        }, 500);
        navigate("/users/admin/department");

      }

    } catch (error) {
      // Handle any error that occurred during the API request
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Typography
        variant="h6"
        style={{
          margin: "12px",
          textAlign: "center",
          color: "bold",
          fontWeight: "bold",
        }}
      >
        Create new Department
      </Typography>{" "}
      <Box sx={{ mb: "100px", height: "100px" }}>

        <Form form={form} onFinish={onFinish}
          {...formItemLayout}
        >
          <Form.Item
            name="departmentName"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Box>


    </Box>
  );
};
