// MAIN MODULES
import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Checkbox } from "antd";
import MaskedInput from 'react-text-mask'

// COMPONENTS
import UserAvatar from "../../components/Avatar/Avatar";

// SERVIVES
import { getItemToLocalStorage } from "../../servises/localStorage";

// STYLES
import "../JoinProfessionalForm/styles.scss";

const bc = "join-professional";

const OrgContactPerson = (props: any) => {
  const [imageUrl, setImageUrl] = useState("");
  const [draftData, setDraftData] = useState(
    getItemToLocalStorage("nonPofitData")
  );

  useEffect(() => {
    const { setFieldsValue, getFieldValue } = props.form;
    const id = getFieldValue("id");
    const avatar = getFieldValue("contact_avatar");
    if (id || draftData) {
      setImageUrl(avatar);
    } else {
      setFieldsValue({ contact_avatar: "" });
      setImageUrl("");
    }
  }, []);

  const { setFieldsValue, getFieldValue } = props.form;
  const id = getFieldValue("id");
  return (
    <>
      <Row>
        <Col span={8}>
          <Form.Item
            name="contact_avatar"
            rules={[
              {
                // required: true,
                message: "Please add the picture of contact person ",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <UserAvatar
              preview={imageUrl}
              setFieldValue={setFieldsValue}
              edit={id || draftData ? true : false}
              label="Picture"
            />
          </Form.Item>
          <p>Click to add the picture of contact person</p>
        </Col>
        <Col xs={24} sm={16} md={16} xl={16} xxl={16}>
        <h4>First Name*</h4>
          <Form.Item
            name="contact_first_name"
            rules={[
              {
                required: true,
                message: "Please enter contact person's First Name",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="First Name" maxLength={50} />
          </Form.Item>
        <h4>Last Name*</h4>
          <Form.Item
            name="contact_last_name"
            rules={[
              {
                required: true,
                message: "Please enter contact person's Last Name",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Last Name" maxLength={50} />
          </Form.Item>
          <h4>Job Title*</h4>
          <Form.Item
            name="contact_job_title"
            rules={[
              {
                required: true,
                message: "Please enter contact person's Job Title",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Job Title" maxLength={50} />
          </Form.Item>
        <h4>Contact Email</h4>
          <Form.Item
            name="contact_email"
            rules={[
              {
                type: "email",
                message: "Must be valid Email!",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Contact email" maxLength={100} />
          </Form.Item>
          <Row gutter={[16, 10]}>
            <Col xs={24} sm={16} md={16} xl={16} xxl={16}>
            <h4>Phone Number</h4>
              <Form.Item
                name="contact_phone"
                rules={[
                  // {
                  //   required: true,
                  //   message: "Please enter your Phone Number",
                  // },
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
            <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
            <h4>Extension</h4>
              <Form.Item
                name="contact_extension"
                validateTrigger={["onChange", "onBlur"]}
              >
                <Input size="large" placeholder="Phone Extension" maxLength={20} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="terms_accepted"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
          >
            <Checkbox>
              Accept{" "}
              <a href="/terms-of-use" target="_blank">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" target="_blank">
                {" "}
                Privacy Policy
              </a>
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default OrgContactPerson;
