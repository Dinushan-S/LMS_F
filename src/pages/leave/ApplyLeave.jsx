import React, { useState } from "react";
import axios from "axios";
import { Form, Input, DatePicker, Button, message, Select } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const LeaveTypes = {
    AnnualLeave: 0,
    SickLeave: 1,
    MaternityLeave: 2,
    PaternityLeave: 3,
    UnpaidLeave: 4,
  };

  const onFinish = async (values) => {
    setLoading(true);
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token")
    const selectedType = LeaveTypes[values.Type];

    const formData = {
      ...values,
      Type: selectedType,
      StartDate: values.StartDate.format("YYYY-MM-DDTHH:mm:ss"),
      EndDate: values.EndDate.format("YYYY-MM-DDTHH:mm:ss"),
      IsApproved: 0, // Assuming the default value is false
      UserId: id, // Replace with the actual user ID or get it dynamically
    };

    await axios
      .post(`/Leave/applyLeave/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      })
      .then((response) => {
        const accountType = parseInt(localStorage.getItem("accountType"), 10);
        message.success(response.data.message);

        if (accountType === 1) {
          navigate("/users/manager/myLeaves");
        } else {
          navigate("/users/staff/myLeaves");
        }

        setLoading(false);
      })
      .catch((error) => {
        message.error(error.response?.data?.message || "An error occurfvfred");
        setLoading(false);
      });
  };

  // Function to disable dates before today
  const disabledDate = (current) => {
    return current && current < moment().add(1, "days").startOf("day");
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Type"
          name="Type"
          rules={[{ required: true, message: "Please select leave type!" }]}
        >
          {/* Replace with your own options */}
          <Select>
            <Select.Option value="AnnualLeave">Annual Leave</Select.Option>
            <Select.Option value="SickLeave">Sick Leave</Select.Option>
            <Select.Option value="MaternityLeave">Maternity Leave</Select.Option>
            <Select.Option value="PaternityLeave">Paternity Leave</Select.Option>
            <Select.Option value="UnpaidLeave">Unpaid Leave</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="StartDate"
          rules={[{ required: true, message: "Please select start date!" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD " disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="EndDate"
          rules={[{ required: true, message: "Please select end date!" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD" disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          label="Reason"
          name="Reason"
          rules={[{ required: true, message: "Please enter leave reason!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplyLeave;
