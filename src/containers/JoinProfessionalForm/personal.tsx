import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Select, Divider, Radio, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserAvatar from "../../components/Avatar/Avatar";
import {
  getFbData,
  updateUserData,
  updateFiltersData,
} from "../../servises/firebase";
import {
  setItemToLocalStorage,
  getItemToLocalStorage,
} from "../../servises/localStorage";
import "./styles.scss";
import "./styles.css";
import MaskedInput from "react-text-mask";

const { Option } = Select;
const { TextArea } = Input;
const bc = "join-professional";

const PersonalProfile = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [draftData, setDraftData] = useState(getItemToLocalStorage("formData"));
  const { setFieldsValue, getFieldValue } = props.form;

  useEffect(() => {
    setItems(props.cities);
  }, [props.cities]);

  useEffect(() => {
    const id = getFieldValue("id");
    const avatar = getFieldValue("avatar");
    const email_public = getFieldValue("email_public");
    if (id || draftData) {
      setImageUrl(avatar);
    } else {
      setFieldsValue({ avatar: "" });
      setImageUrl("");
    }
  }, []);
  const onNameChange = (event: any) => {
    setName(event.target.value);
  };
  const addItem = async () => {
    const cityExist = items.filter((item) => {
      return item.name && item.name.toUpperCase() === name.trim().toUpperCase();
    });
    if (!cityExist.length && name.trim() !== "") {
      await updateFiltersData("cities", {
        name: name.trim(),
        description: "",
        member_count: 0,
        photo: "",
      }).then(async (res) => {
        await updateUserData("cities", res.id);
        await getFbData("cities")
          .then((querySnapshot) => {
            const cities: any = [];
            querySnapshot.forEach((doc: any) => {
              cities.push(doc.data());
            });
            props.addCity(cities);
            setItemToLocalStorage("cities", cities);
          })
          .catch((e) => {
            // Error stored in  state
            setError(e);
          });
      });
      const newItem = [...items, { name: name }];
      setItems(newItem);
      setName("");
    } else {
      setItems(items);
      setName("");
    }
  };

  const id = getFieldValue("id");
  return (
    <>
      <Row gutter={[16, 10]}>
        <Col span={12}>
          <Form.Item
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please add your profile photo",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <UserAvatar
              preview={imageUrl}
              setFieldValue={setFieldsValue}
              edit={id || draftData ? true : false}
              label="Profile Photo"
            />
          </Form.Item>
          <p>Please enter a photo of yourself</p>
        </Col>
      </Row>
      <Row gutter={[16, 10]}>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please enter your First Name",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input className="ant-picker-input" size="large" placeholder="First Name" maxLength={50} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please enter your Last Name",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Last Name" maxLength={50} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your Email",
              },
              {
                type: "email",
                message: "Must be valid Email!",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input
              size="large"
              placeholder="Add email used for scheduling appointments"
              maxLength={100}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="confirm"
            // label="Confirm Password"
            dependencies={["email"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your email!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("email") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two emails that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input size="large" placeholder="Confirm Email" maxLength={100} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Share your email address as public for appointments</h4>
          <Form.Item
            name="email_public"
            rules={[
              {
                required: true,
                message:
                  "Please check if you want to share your email as public.",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Yes please.</Radio>
              <Radio value={false}>No I don’t want to receive emails.</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your Phone Number",
              },
              {
                pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                message: "Enter valid number: 123-1234",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <MaskedInput
                 mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                 placeholder="Phone Number"
                 guide={false}
                 className='phone_input'
              />
            {/* <Input size="large" placeholder="Phone Number" maxLength={20} /> */}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="business_name"
            rules={[
              {
                required: true,
                message: "Please enter your Business name",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Business Name" maxLength={100} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Address" maxLength={150} />
          </Form.Item>
        </Col>
              <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <Form.Item name="address2" >
            <Input size="large" placeholder="Address" maxLength={150} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Row gutter={16}>
            <Col xs={24} sm={7} md={7} xl={7} xxl={7}>
              <Form.Item name="country">
                {/* <Select defaultValue="Canada" size="large"> */}
                <Select size="large">
                  <Option value="Canada">Canada</Option>
                  <Option value="USA">USA</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={7} md={7} xl={7} xxl={7}>
              <Form.Item
                name="province"
                rules={[
                  {
                    required: true,
                    message: "Please select your province/state",
                  },
                ]}
                validateTrigger={["onChange", "onBlur"]}
              >
                <Input size="large" placeholder="Province/State" maxLength={100} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={10} md={10} xl={10} xxl={10}>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please select your city",
                  },
                ]}
                validateTrigger={["onChange", "onBlur"]}
              >
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  style={{ width: "100%" }}
                  placeholder="Select City"
                  size="large"
                  showSearch
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          padding: 8,
                        }}
                      >
                        <Input
                          style={{ flex: "auto" }}
                          value={name}
                          onChange={onNameChange}
                          maxLength={50}
                        />
                        <a
                          style={{
                            flex: "none",
                            padding: "8px",
                            display: "block",
                            cursor: "pointer",
                          }}
                          onClick={addItem}
                        >
                          <PlusOutlined /> Add new City
                        </a>
                      </div>
                    </div>
                  )}
                >
                  {items &&
                    items.map((item: any, index: number) => (
                      <Option value={item.name} key={`${item.id} ${index}`}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="postal_code"
            rules={[
              {
                required: true,
                message: "Please enter your Postal code",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Postal code" maxLength={20} />
          </Form.Item>
          {/* <Col xs={24} sm={24} md={24} xl={24} xxl={24}> */}
         <p>
            If you don’t see the Language you are looking for, please contact us at <em>info@ehkidshealth.com</em>
          </p>
          <Form.Item
            name="languages"
            rules={[
              {
                required: true,
                message: "Please enter your languages",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select
              size="large"
              id="languages-dropdown"
              getPopupContainer={(trigger) => trigger.parentNode}
              mode="multiple"
              style={{ width: "100%", maxWidth: "760px" }}
              placeholder="Languages spoken"
              tokenSeparators={[","]}
              // showArrow
            >
              {props.languages &&
                props.languages.map((item: any, index: any) => (
                  <Option value={item.name} key={`${item.id} ${index}`}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          {/* </Col> */}
          <Form.Item
            name="bio"
            rules={[
              {
                required: true,
                message: "Please enter Message to Caregivers",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <TextArea
              rows={4}
              placeholder="Tell us about yourself: how do you approach your work with families/ patients/clients, how you feel about your job and why you love what you do?  What else should a family know about you and your practice?"
            />
          </Form.Item>
        </Col>
     
      </Row>
    </>
  );
};
export default PersonalProfile;
