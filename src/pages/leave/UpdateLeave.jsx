import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Button, Form, Input, message, Select } from "antd";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const { Item } = Form;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};
const LeaveTypeOptions = [
    { value: 0, label: "Annual Leave" },
    { value: 1, label: "Sick Leave" },
    { value: 2, label: "Maternity Leave" },
    { value: 3, label: "Paternity Leave" },
    { value: 4, label: "Unpaid Leave" },
  ];
const UpdateLeave = () => {
      const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [form] = Form.useForm();
  const [values, setValues] = useState({
    id: id,
    type: "",
    startDate: "",
    endDate: "",
    reason:'',
    isApproved: null,
    name:""
    

  });

  useEffect(() => {
    axios
      .get(`https://localhost:7185/api/Leave/${id}`)
      .then((res) => {
        setValues({
          ...values,
          type: res.data.type,
          startDate: res.data.lastName,
          endDate: res.data.phone,
          reason: res.data.accountType,
          isApproved: res.data.isApproved,
          name: res.data.departmentId,
          departmentName:res.data.departmentId,
        });
        form.setFieldsValue({
          type: res.data.type,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          reason: res.data.reason,
          isApproved: res.data.isApproved,
          name: res.data.name,
          // departmentName:res.data.departmentId,
        });
      })
      .catch((err) => console.log(err));
  }, [id, form]);
  const accountTypeOptions = [
    { value: 0, label: "Pending" },
    { value: 1, label: "Approval" },
    { value: 2, label: "Reject" },
  ];

  


  // ...
  // Handle form submit
  const onFinish = (formData) => {
    setLoading(true); // Start loading state
    const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic
    const accountType = parseInt(localStorage.getItem("accountType"));

    axios
      .put(`https://localhost:7185/api/Leave/leave/${id}`, formData,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setLoading(false); // Stop loading state
        console.log(res);
        message.success("Update Successfully."); // Display success message

        if (accountType === 0) {
          navigate('/users/admin/leaves'); // Handle successful update for admin
        } else if (accountType === 1) {
          navigate('/users/manager/leaves'); // Handle successful update for manager
        }
        setTimeout(() => {
        
        }, 1000);
      })

      .catch((err) => {
        setLoading(false); // Stop loading state
        console.log("here "+err); // Handle error
      }); // Perform your update logic here
  };
  const [isApproved, setIsApproved] = useState(values.isApproved);



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
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please enter the leave request type",
              },
            ]}
          >
            <Select options={LeaveTypeOptions} disabled />
          </Item>

          <Item
            label="startDatex"
            name="startDate"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text"disabled />
          </Item>

          <Item
            label="endDate"
            name="endDate"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text"  disabled />
          </Item>

<Item
            label="reason"
            name="reason"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text"   disabled/>
          </Item>

          <Item
            label="isApproved"
            name="isApproved"
            rules={[
              { required: true, message: "Please select the account type" },
            ]}
          >
            <Select
              placeholder="Select Account Type"
              onChange={(value) => setIsApproved(value)}
              value={isApproved} // Set the value prop to the account type value from the database
            >
              {accountTypeOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Item>

     
          <Item
            label="name"
            name="name"
            rules={[
              { required: true, message: "Please enter the department name" },
            ]}
          >
            <Input type="text" disabled />
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

export default UpdateLeave;
