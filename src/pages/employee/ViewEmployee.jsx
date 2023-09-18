import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Form, Input } from "antd";
import { useState } from "react";


const { Item } = Form;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const ViewEmployee = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState({});


  useEffect(() => {
    const authToken = localStorage.getItem('token');

    axios
      .get(`/Auth/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setData(res.data);
        form.setFieldsValue({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
          accountType: res.data.accountType,
          address: res.data.address,
          departmentName: res.data.departmentName,
        });
      })
      .catch((err) => console.log(err));
  }, [id, form]);
  return (
    <Box m="20px">
      <Typography
        variant="h6"
        style={{
          margin: "12px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        View Employee
      </Typography>
      <Box sx={{ mb: "100px", height: "100px" }}>
        <Form form={form} {...formItemLayout}>
          <Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input
              type="text"
              disabled
              style={{ color: "green", fontWeight: "bold" }}
            />
          </Item>

          <Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input
              type="text"
              disabled
              style={{ color: "green", fontWeight: "bold" }}
            />
          </Item>

          <Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input
              type="text"
              disabled
              style={{ color: "green", fontWeight: "bold" }}
            />
          </Item>

          <Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input
              type="text"
              disabled
              style={{ color: "green", fontWeight: "bold" }}
            />
          </Item>

          <Item
            label="Account Type"
            name="accountType"
            rules={[
              { required: true, message: "Please select the account type" },
            ]}
          >
            <Input
              type="text"
              disabled
              style={{ color: "green", fontWeight: "bold" }}
            />
          </Item>

          <Item
            label="address"
            name="address"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input
              type="text"
              disabled
              style={{ color: "green", fontWeight: "bold" }}
            />
          </Item>

          <Item
            label="Department Name"
            name="departmentName"
            rules={[
              { required: true, message: "Please select the department name" },
            ]}
          >
            <Input
              type="text"
              disabled
              style={{ color: "green", fontWeight: "bold" }}
            />
          </Item>

        </Form>
      </Box>
    </Box>
  );
};

export default ViewEmployee;
