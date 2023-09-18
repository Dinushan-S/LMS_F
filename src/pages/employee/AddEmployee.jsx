import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";


const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

export default function AddEmployee() {
  const [form] = Form.useForm();
  const method = useForm();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [id, setUserID] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [accountType, setAccountType] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState();
  const [dropdownData, setDropdownData] = useState([]);

  const navigate = useNavigate();
  const fetchDropdownData = async () => {
    try {

      const authToken = localStorage.getItem("token");

      const response = await axios.get("/Department", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      setDropdownData(response.data);
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleSave = () => {
    //e.preventDefault();
    form.validateFields().then(async (values) => {
      const url = "https://localhost:7185/api/Auth";

      // ... (omitted for brevity)
      const selectedDepartmentId = form.getFieldValue("departmentId");

      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        address: address,
        birthday: dob ? dob.format("YYYY-MM-DD") : null,
        accountType: accountType, // Pass the accountType as an integer (1 or 2)
        departmentId: selectedDepartmentId,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result.message);

        if (response.ok) {
          if (result.message === "Email address already exists.") {
            message.warning(result.message);
          } else {
            message.success(result.message);
            navigate(`/users/admin/employee`);
          }
        } else {
          console.error("Failed to register user:", result.message);
          message.error("Failed to register user");
        }
      } catch (error) {
        console.error("Failed to register user:", error);
        message.error("Failed to register user");
      }
    }).catch((info) => {
      console.error("Validate Failed:", info);
    });
  };

  return (
    <Box m="20px">
      <Box display="row" justifyContent="space-between" alignItems="center">
        {/* <Header title={"Add Employee"} subtitle={"Add Employee"}   ></Header> */}
        <Typography
          variant="h6"
          style={{
            margin: "12px",
            textAlign: "center",
            color: "bold",
            fontWeight: "bold",
          }}
        >
          Create new Employee
        </Typography>
        <Box sx={{ mb: "100px" }}>
          <Form
            style={{ width: "100%" }}
            {...formItemLayout}
            form={form}
            name="Add Employees"
            // onFinish={(values) => {
            //   console.log({ values });
            // }}
            scrollToFirstError
          >
            <Form.Item
              name="firstName"
              label="First Name"
              hasFeedback
              rules={[
                {
                  type: "name",
                  message: "The input is not a valid Name!",
                },
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  whitespace: true,
                  min: 3,
                },
              ]}
            >
              <Input
                placeholder="Samuel"
                label="UserName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              hasFeedback
              rules={[
                {
                  type: "name",
                  message: "The input is not a valid Name!",
                },
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  whitespace: true,
                  min: 3,
                },
              ]}
            >
              <Input
                placeholder="David"
                label="UserName"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              hasFeedback
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                placeholder="something@gmail.com"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "Password does not match criteria! (Must have 8 characters, include numbers, simple letters, capital letters)",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  required: true,
                  pattern: /^(?:7|0|(?:\+94))[0-9]{9}$/,
                  message: "Phone number is not valid!",
                },
              ]}
            >
              <Input
                placeholder="0775680041"
                label="Phone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="accountType"
              label="Account Type"
              rules={[
                {
                  required: true,
                  message: "Please select an Account Type!",
                },
              ]}
            >
              <Select
                label="Type"
                placeholder="Select Account Type"
                onChange={(value) => setAccountType(value)}
              >
                <Select.Option value={1}>Manager</Select.Option>
                <Select.Option value={2}>Staff</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="birthday"
              label="Dob"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Birthday!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                picker="date"
                placeholder="Choose Birthday"
                onChange={(date) => setDob(date)}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
                {
                  whitespace: true,
                  min: 3,
                },
              ]}
            >
              <Input
                placeholder="Address"
                label="Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="departmentId"
              label="Department Option"
              rules={[
                {
                  required: true,
                  message: "Please select an option",
                },
              ]}
            >
              <Select placeholder="Select Option">
                {dropdownData.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.departmentName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => handleSave()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </Box>
    </Box>
  );
}
