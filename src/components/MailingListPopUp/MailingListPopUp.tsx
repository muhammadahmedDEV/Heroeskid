import React, { useState } from "react";
import { Row, Col, Form, Input, Modal, Button } from "antd";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import hero from "../../assets/icons/heros.png";

import "./styles.scss";

import {
  writeUserData,
  updateFiltersData,
  updateUserData,
  getMailListItem,
} from "../../servises/firebase";
import Swal from "sweetalert2";

interface ComponentProps {
  open: boolean;
  handleClose: any;
}

const bc = "mailing-list-popup";
const MailingListPopUp = ({ handleClose, open }: ComponentProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
            customClass: {
              container: 'my-swal'
            },
            title: "Subscribed",
            text: "You have already subscribed to our updates.",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        handleClose();
      });
    } else {

      await updateFiltersData("mailinglist", {
        email: values.email,
        name: `${values.fname} ${values.lname}`
      }).then(async (res) => {
        await updateUserData("mailinglist", res.id);
        form.resetFields();
        Swal.fire({
          customClass: {
            container: 'my-swal'
          },
          title: "Done",
          text: "You have successfully subscribed to our updates.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
      handleClose();
    }
    setLoader(false);
  };

  return (
    <>
      <Dialog
        maxWidth="md"
        // fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"

      >
        <div style={{ width: "100%" }}>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus className="close-Btn">
              ❌
        </Button>
          </DialogActions>


          <DialogContent>
            <DialogContentText>
              <div className={`${bc}_work-container custom-dialog`}>
                <Row style={{ width: "100%" }} gutter={16} justify="center">
                  <Col xs={24} sm={24} md={6} lg={6}>
                    <img
                      className="img"
                      src={hero}
                      alt="Mobile Mockup"
                    //  className={`${bc}_work-container_work-img`}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={18} lg={18}>
                    <DialogTitle id="responsive-dialog-title">
                      {"Want more EHkidsHealth? Great news!"}
                    </DialogTitle>
                    <div className={`${bc}_work-container_work-content`}>
                      <Row style={{ width: "100%" }} gutter={16} justify="center">
                        {/* <TitleTile
                      title="Exclusive updates in your inbox"
                      content="Subscribe today to receive updates available only for our subscribers."
                    /> */}

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <Form.Item>
                            <p className="Textfont">
                              Sign up for community updates and help encourage earlier intervention
                              for better outcomes in kids ages 0-young adults!
                    </p>
                          </Form.Item>
                        </Col>
                      </Row>
                      <div className={`${bc}_work-container_work-content_testimonials`}>
                        <Form
                          form={form}
                          hideRequiredMark
                          onFinish={(values) => handleSubmit(values)}
                        >
                          <Row gutter={16}>
                            <Col xs={24} sm={24} md={8} lg={12}>
                              <Form.Item
                                name="fname"
                                className="Textfont"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your First Name",
                                  },
                                ]}
                                validateTrigger={["onChange", "onBlur"]}
                              >
                                <Input
                                  size="large"
                                  placeholder="First Name"
                                  maxLength={50}
                                  className="Textfont"
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={12}>
                              <Form.Item
                                name="lname"
                                className="Textfont"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Last Name",
                                  },
                                ]}
                                validateTrigger={["onChange", "onBlur"]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Last Name"
                                  maxLength={50}
                                  className="Textfont"
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24}>
                              <Form.Item
                                name="email"
                                className="Textfont"
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
                                  placeholder="Enter your email address"
                                  maxLength={100}
                                  className="Textfont"
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24}>
                              <Form.Item>
                                <Button
                                  className="btn-sub"
                                  style={{
                                    backgroundColor: '#d12c27'
                                  }}
                                  htmlType="submit"
                                  size="large"
                                  loading={loader}

                                >
                                  Sign up
                            </Button>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24}>
                              <Form.Item>
                                <p className="Textfont">*By completing this form you are signing up to receive our emails and can unsubscribe at any time.</p>
                              </Form.Item>
                            </Col>
                            {/* <Col span={24}></Col> */}
                          </Row>
                        </Form>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default MailingListPopUp;
