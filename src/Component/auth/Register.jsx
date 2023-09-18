import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

export default function Register() {
  const [form] = Form.useForm();

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
      const response = await axios.get('/Department');
      setDropdownData(response.data);
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const url = "/Auth";

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
      accountType: 0, // Pass the accountType as an integer (1 or 2)
      departmentId: selectedDepartmentId,
    };

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (result.data.message === "Email address already exists.") {
          message.warning(result.data.message);
        } else {
          message.success(result.data.message);
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.error("Failed to register user:", error);
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
                placeholder="Samuel"
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
              initialValue={0}
              rules={[
                {
                  required: true,
                  message: "Please select an Account Type!",
                },
              ]}
            >
              <Select disabled>
                <Select.Option value={0}>Admin</Select.Option>
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
                onClick={(e) => handleSave(e)}
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
