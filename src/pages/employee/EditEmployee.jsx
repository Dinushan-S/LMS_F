import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Button, Form, Input, message, Select } from "antd";
import { useState } from "react";

const { Item } = Form;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

const EditEmployee = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [values, setValues] = useState({
    id: id,
    firstName: "",
    lastName: "",
    phone: "",
    accountType: null,
    address: "",
    departmentId: null,
  });

  useEffect(() => {
    axios
      .get(`/Auth/${id}`)
      .then((res) => {
        setValues({
          ...values,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          accountType: res.data.accountType,
          address: res.data.address,
          departmentId: res.data.departmentId,
        });
        form.setFieldsValue({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
          accountType: res.data.accountType,
          address: res.data.address,
          departmentId: res.data.departmentId,
        });
      })
      .catch((err) => console.log(err));
  }, [id, form]);

  const accountTypeOptions = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Manager" },
    { value: 2, label: "Staff" },
  ];




  // ...
  // Handle form submit
  const onFinish = (formData) => {
    setLoading(true); // Start loading state
    axios
      .put(`/Auth/${id}`, formData)
      .then((res) => {
        setLoading(false); // Stop loading state
        console.log(res);
        message.success("Update Successfully."); // Display success message

        // setTimeout(() => {
        navigate('/users/admin/department')// Handle successful update
        // }, 1000);
        // Delay navigation by 1 second (1000 milliseconds)
      })

      .catch((err) => {
        setLoading(false); // Stop loading state
        console.log("here " + err); // Handle error
      }); // Perform your update logic here
  };
  const [accountTypes, setAccountType] = useState(values.accountType);

  const [departmentNames, setDepartmentNames] = useState([]);

  useEffect(() => {
    const fetchDepartmentNames = async () => {
      try {
        const response = await axios.get(
          "/Department"
        );
        setDepartmentNames(response.data);
        console.log(response.data.map((d) => d.departmentName));
      } catch (error) {
        console.error("Error fetching department names:", error);
        setDepartmentNames([]);
      }
    };

    fetchDepartmentNames();
  }, []);

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
        Edit Employee
      </Typography>
      <Box sx={{ mb: "100px", height: "100px" }}>
        <Form form={form} onFinish={onFinish} {...formItemLayout}>
          <Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text" />
          </Item>

          <Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text" />
          </Item>

          <Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text" />
          </Item>

          <Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text" />
          </Item>

          <Item
            label="Account Type"
            name="accountType"
            rules={[
              { required: true, message: "Please select the account type" },
            ]}
          >
            <Select
              placeholder="Select Account Type"
              onChange={(value) => setAccountType(value)}
              value={accountTypes} // Set the value prop to the account type value from the database
            >
              {accountTypeOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Item>

          <Item
            label="address"
            name="address"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text" />
          </Item>

          <Item
            label="Department Name"
            name="departmentId"
            rules={[
              { required: true, message: "Please select the department name" },
            ]}
          >
            <Select
              placeholder="Select department"
              onChange={(value) => setValues({ ...values, departmentId: value })}
              value={values.departmentId}
            >
              {departmentNames.map((department) => (
                <Select.Option key={department.id} value={department.id}>
                  {department.departmentName}
                </Select.Option>
              ))}
            </Select>
          </Item>



          <Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Item>
        </Form>
      </Box>
    </Box>
  );
};

export default EditEmployee;
