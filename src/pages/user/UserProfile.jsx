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

export default function UserProfile() {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [address, setAddress] = useState("");

  const [imageData, setImageData] = useState(""); // Base64-encoded image data
  const [selectedImage, setSelectedImage] = useState(null);



  useEffect(() => {

    const fetchUserImage = async () => {
      try {
        const id = localStorage.getItem("id");
        const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic

        const response = await axios.get(
          `/Profile/users/${id}/image`,
          {
            responseType: "arraybuffer",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
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
        } else {
          // Handle non-successful responses (e.g., status code other than 200)
          console.error("Failed to fetch user image:", response.status);
          // Handle specific error scenarios if necessary
        }
      } catch (error) {
        // Handle network errors, request cancellations, or other errors
        console.error("Failed to fetch user image:", error.message);
        // Handle specific error scenarios if necessary
      }
    };


    fetchUserImage();
  }, []);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const id = localStorage.getItem("id");
        const authToken = localStorage.getItem("token");

        const response = await axios.get(
          `/Auth/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
        );
        const userData = response.data;
        // setImageData(userData.imageData); // Assuming the API returns the image data as a base64-encoded string
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setUserID(userData.id);
        setEmail(userData.email);
        setPhone(userData.phone);
        setBirthday(userData.birthday);
        setAddress(userData.address);

        setIsLoading(false); // Set isLoading to false once data is fetched
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Set isLoading to false even if there's an error

      }
    };

    fetchUserDetails();
  }, []);


  const handleFormSubmit = (values) => {
    const { oldPassword, password, confirm } = values;
    const id = localStorage.getItem("id");
    const authToken = localStorage.getItem("token");

    // Make an API request to change the password
    axios
      .put(`/Profile/${id}/changePassword`, {
        oldPassword: oldPassword,
        newPassword: confirm,
      },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,

          }
        })
      .then((response) => {
        if (response.data.message === "Password changed successfully") {
          message.success(response.data.message);
        } else if (response.data.message === "Incorrect old password") {
          message.error(response.data.message);
        } else {
          // Handle other response messages if needed
          message.info(response.data.message);
        }
        // Handle successful password change
      })
      .catch((error) => {
        // Handle error
        message.error(error.response);
      });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const id = localStorage.getItem("id");
    const url = `/Profile/${id}`;

    const data = {
      Id: id,
      firstName: firstName,
      lastName: lastName,
      Phone: phone,
      birthday: birthday ? moment(birthday).format("YYYY-MM-DD") : null,
      Address: address,

    };
    const authToken = localStorage.getItem("token");

    try {
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,

        }
      });
      const dt = response.data;
      console.log(dt.message);
      message.success(dt.message);
    } catch (error) {
      console.error(error);
      message.error("Failed to update user details.");
    }
  };


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
      const authToken = localStorage.getItem("token");

      const response = await axios.put(
        `/Profile/users/${id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,

          },
        }
      );

      if (response.status === 200) {
        // Update the image data in the state when the upload is successful
        console.log("New image data:", response.data.imageData);
        setImageData(response.data.imageData);
        setImageData(URL.createObjectURL(selectedImage));
        window.location.reload();

        message.success("Image uploaded successfully.");
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
    <>


      <Row gutter={[16, 16]}>
        <Col span={6} style={{ backgroundColor: "white" }}>

          <div className="userShowTop">
            {imageData ? (
              // If imageData exists, display the user's profile image
              <img src={imageData} alt="User Profile" className="userShowImage" />
            ) : (
              // If imageData is not available, display the default image
              <img src={defaultImageSrc} alt="Default Profile" className="userShowImage" />
            )}
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
        <Col span={12}>
          <div className="userUpdate">
            <span className="userUpdateTitle"> Password</span>
            <Form
              {...formItemLayout}
              name="edit-password"
              onFinish={handleFormSubmit}
              scrollToFirstError
            >
              <Form.Item
                name="oldPassword"
                label="Old Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  {
                    required: true,

                    message:
                      "Password does not match criteria! (Must have 8 characters, include numbers, simple letters, capital letters)",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
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

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="userShow">

            <div className="userShowBottom">
              <span className="userShowTitle">Details</span>
              <div className="userShowInfo">
                <UserOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label htmlFor="">{firstName}</label>
                </span>
              </div>
              <div className="userShowInfo"  >
                <UserOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label htmlFor="">{lastName}</label>
                </span>
              </div>
              <div className="userShowInfo">
                <CalendarOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label placeholder="not set yet">{birthday}</label>
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label htmlFor="">{email}</label>
                </span>
              </div>
              <div className="userShowInfo">
                <PhoneOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label htmlFor="">{phone}</label>
                </span>
              </div>
              <div className="userShowInfo">
                <HomeOutlined className="userShowIcon" />
                <span className="userShowInfoTitle" placeholder="not set yet">
                  <label placeholder="not set yet">{address}</label>
                </span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit Details</span>
            <br />
            <Form
              {...formItemLayout}
              form={form}
              name="editProfile"
              onFinish={(values) => {
                console.log({ values });
              }}
              scrollToFirstError
            >

              <Form.Item
                name="firstName"
                label="FirstName"
                hasFeedback
                rules={[
                  {
                    type: "FirstName",
                    message: "The input is not valid Name!",
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
                  placeholder="Jon"
                  value={firstName}
                  label="FirstName"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="LastNamer"
                hasFeedback
                rules={[
                  {
                    type: "LastNamer",
                    message: "The input is not valid Name!",
                  },
                  {
                    required: true,
                    message: "Please input your LastNamer!",
                  },
                  {
                    whitespace: true,
                    min: 3,
                  },
                ]}
              >
                <Input
                  placeholder="Jon"
                  label="LastName"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                  {
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

              {/* <Form.Item
                name="dob"
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
              </Form.Item> */}

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
                name="dob"
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
                  value={birthday ? moment(birthday) : null}
                  onChange={(date) =>
                    setBirthday(date ? date.format("YYYY-MM-DD") : null)
                  }
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={(e) => handleSave(e)}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>


      </Row>


    </>
  );
}
