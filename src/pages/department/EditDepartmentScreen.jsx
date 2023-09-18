import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const { Item } = Form;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

const EditDepartmentScreen = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [values, setValues] = useState({
    id: id,
    departmentName: '',
    description: ''
  });

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    axios.get(`/Department/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })
      .then(res => {
        setValues({
          ...values,
          departmentName: res.data.departmentName,
          description: res.data.description
        });
        form.setFieldsValue({
          departmentName: res.data.departmentName,
          description: res.data.description
        });
      })
      .catch(err => console.log(err));
  }, [id, form]);

  // Handle form submit
  const onFinish = (formData) => {
    const authToken = localStorage.getItem("token");

    setLoading(true); // Start loading state
    axios
      .put(`https://localhost:7185/api/Department/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
      .then(res => {
        setLoading(false); // Stop loading state
        console.log(res);
        message.success('Update successful'); // Display success message

        setTimeout(() => {
          navigate('/users/admin/department')// Handle successful update
        }, 1000);
        // Delay navigation by 1 second (1000 milliseconds)
      })

      .catch(err => {
        setLoading(false); // Stop loading state
        console.log(err); // Handle error
      });    // Perform your update logic here
  };

  // Render your edit screen UI
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
        Edit Department
      </Typography>
      <Box sx={{ mb: "100px", height: "100px" }}>
        <Form
          form={form}
          onFinish={onFinish}
          {...formItemLayout}
        >
          <Item
            label="Name"
            name="departmentName"
            rules={[{ required: true, message: 'Please enter the department name' }]}
          >
            <Input type="text" />
          </Item>

          <Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea />
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

export default EditDepartmentScreen;
