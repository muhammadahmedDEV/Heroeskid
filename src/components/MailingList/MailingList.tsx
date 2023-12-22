// MAIN MODULES
import React, { useState } from "react";
import { Row, Col, Form, Input, Modal, Button } from "antd";

// STYLES
import "./styles.scss";

// COMPONENTS
import TitleTile from "../TitleTile";

// TEAM IMAGES
import hero from "../../assets/icons/heros.png";
import {
  writeUserData,
  updateFiltersData,
  updateUserData,
  getMailListItem,
} from "../../servises/firebase";
import Swal from "sweetalert2";
const bc = "mailing-list";
const Heading = () => {
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    setLoader(true);

    const querySnapshot = await getMailListItem({
      table: "mailinglist",
      email: values.email,
    });

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach(async (doc: any) => {
        const newDoc: any = doc.data();
        if (newDoc && newDoc.email) {
          Swal.fire({
            title: "Subscribed",
            text: "You have already subscribed to our updates.",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });
    } else {
      await updateFiltersData("mailinglist", {
        email: values.email,
        name: values.name,
      }).then(async (res) => {
        await updateUserData("mailinglist", res.id);
        form.resetFields();
        Swal.fire({
          title: "Done",
          text: "You have successfully subscribed to our updates.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
    }
    setLoader(false);
  };

  return (
    <div className={`${bc}_work-container`}>
      <Row>
        <Col span={24}>
          <h1 className={`${bc}_work-container_title`}>NewsLetter</h1>
        </Col>
        <Row style={{ width: "100%" }} gutter={16} justify="center">
          <Col sm={24} md={16} xl={16} xxl={16}>
            <div className={`${bc}_work-container_work-content`}>
              <Row style={{ width: "100%" }} gutter={16} justify="center">
                {/* <TitleTile
                  title="Exclusive updates in your inbox"
                  content="Subscribe today to receive updates available only for our subscribers."
                /> */}
                <p className={`${bc}_work-container_work-content_content`}>
                  Subscribe today to receive updates available only for our
                  subscribers.
                </p>
              </Row>
              <div className={`${bc}_work-container_work-content_testimonials`}>
                <Form
                  form={form}
                  hideRequiredMark
                  onFinish={(values) => handleSubmit(values)}
                >
                  <Row gutter={[16, 10]}>
                    <Col xs={24} sm={8} md={8} xl={8} xxl={8}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your Name",
                          },
                        ]}
                        validateTrigger={["onChange", "onBlur"]}
                      >
                        <Input
                          size="large"
                          placeholder="Your full name"
                          maxLength={50}
                        />
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
                          placeholder="Your email address"
                          maxLength={100}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={4} md={4} xl={4} xxl={4}>
                      <Form.Item>
                        <Button
                          className="btn-submit"
                          type="primary"
                          htmlType="submit"
                          size="large"
                          loading={loader}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Col span={24}></Col> */}
                </Form>
              </div>
            </div>
          </Col>
          <Col sm={12} md={8} xl={8} xxl={8}>
            <img
              src={hero}
              alt="Mobile Mockup"
              className={`${bc}_work-container_work-img`}
              loading='lazy'
            />
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Heading;
