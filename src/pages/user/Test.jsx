import "./edituser.css";
import axios from "axios";
import moment from "moment";

import { useEffect, useState } from "react";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  HomeOutlined,
  UploadOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Button, Form, message, Row, Col } from "antd";
import ImageProfile from "../../Component/sidebar/ImageProfile";


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const Test = () => {

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const id = localStorage.getItem("id");

        const response = await axios.get(
          `/Profile/users/${id}/image`,
          {
            responseType: "arraybuffer", // Set the responseType to arraybuffer to get binary data
          }
        );

        if (response.status === 200) {
          // Convert the binary data to base64-encoded image data using FileReader
          const blob = new Blob([response.data], { type: response.headers["content-type"] });
          const reader = new FileReader();
          reader.onload = () => {
            setImageData(reader.result);
          };
          reader.readAsDataURL(blob);
        }
      } catch (error) {
        console.error(error);
        // Handle errors if necessary
      }
    };

    fetchUserImage();
  }, []);

  const [imageData, setImageData] = useState(""); // Base64-encoded image data
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle file input change
  const handleFileInputChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  // Function to handle the image upload
  const handleImageUpload = async () => {
    try {
      if (!selectedImage) {
        message.error("Please select an image to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("imageFile", selectedImage);

      const id = localStorage.getItem("id");
      const response = await axios.put(
        `/Profile/users/${id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Update the image data in the state when the upload is successful
        console.log("New image data:", response.data.imageData);
        setImageData(response.data.imageData);
        setImageData(URL.createObjectURL(selectedImage));

        message.success("Image uploaded successfully.");
        window.location.reload();
      } else {
        message.error("Failed to upload image.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while uploading the image.");
    }
  };
  const defaultImageSrc = "../../../assets/admin.jpg";


  return (
    <Row gutter={[16, 16]}>
      <ImageProfile imageData={imageData} />

      <Col span={6} style={{ backgroundColor: "white" }}>

        <div className="userShowTop">
          <ImageProfile imageData={imageData} />

        </div>

      </Col>
      <Col span={6} style={{ backgroundColor: "white" }}>
        <div className="userUpdate">
          {/* ... (existing JSX for other form fields) ... */}
          <div className="userUpdateInfo">
            <UploadOutlined className="userShowIcon" />
            <span className="userShowInfoTitle">
              <input type="file" onChange={handleFileInputChange} />
            </span>
          </div>
          <br />
          <Form.Item {...tailFormItemLayout}>

            <Button
              type="primary"
              htmlType="button"
              onClick={handleImageUpload}
              style={{ marginLeft: 8 }}
            >
              Upload Image
            </Button>
          </Form.Item>
        </div>
      </Col>

    </Row>
  );
};

export default Test;