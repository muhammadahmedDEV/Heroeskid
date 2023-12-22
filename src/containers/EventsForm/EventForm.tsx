import { PlusOutlined } from "@ant-design/icons";
import { CircularProgress } from "@material-ui/core";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  DatePicker,
  TimePicker,
  Upload,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import Compressor from "compressorjs";
import moment from "moment";
import { updateFiltersData } from "../../servises/firebase";
import Swal from "sweetalert2";
import {
  setItemToLocalStorage,
  getItemToLocalStorage,
} from "../../servises/localStorage";
const bc = "event-form";
interface ComponentProps {
  user: any;
  onClose: any;
  showDrawer: any;
  visibleDrawer: boolean;
}

const EventForm = (props: any) => {
  const INITIAL_STATE = {
    title: "",
    eventPicture: "",
    contact: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    details: "",
    url: "",
  };
  const [loader] = useState(false);
  const [eventFileList, setEventFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;

  const id = getFieldValue("id");
  const [draftData, setDraftData] = useState(
    getItemToLocalStorage("nonPofitData")
  );
  useEffect(() => {
    // Banner image
    if (props.eventPicture) {
      const data = props?.eventPicture && {
        url: props.eventPicture,
        uid: 1,
        name: "eventPicture",
        status: "done",
      };
      data ? setEventFileList([data]) : setEventFileList([]);
    }
  }, []);
  // const ImageHandler = (event: any, index: number): any => {
  //   const maxDimention = 500;
  //   let quality = 1;
  //   if (event.file.size > 15016800) {
  //     quality = 0.005;
  //   } else if (event.file.size > 13016800) {
  //     quality = 0.1;
  //   } else if (event.file.size > 5016800 && event.file.size < 13016800) {
  //     quality = 0.2;
  //   } else if (event.file.size > 1016800 && event.file.size < 5016800) {
  //     quality = 0.3;
  //   } else {
  //     quality = 0.4;
  //   }
  //   if (event.file) {
  //     const fileObj = event.file;
  //     // tslint:disable-next-line: no-unused-expression
  //     new Compressor(fileObj, {
  //       quality,
  //       success(result) {
  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");
  //         const reader = new FileReader();
  //         reader.onload = (fileLoadedEvent: any) => {
  //           const img = new Image();
  //           img.onload = async () => {
  //             const largerDimention = Math.max(img.width, img.height);
  //             let factor = 1;
  //             if (largerDimention > maxDimention) {
  //               factor = largerDimention / maxDimention;
  //             }
  //             const width = img.width / factor;
  //             const height = img.height / factor;
  //             canvas.width = width;
  //             canvas.height = height;
  //             ctx.drawImage(img, 0, 0, width, height);
  //             const src = canvas.toDataURL("image/jpeg", 0.7);
  //             setImgUrl(src);
  //             setFieldsValue({ eventPicture: src });
  //           };
  //           img.src = fileLoadedEvent.target.result;
  //         };
  //         reader.readAsDataURL(result);
  //       },
  //       error(err) {
  //         console.log(err.message);
  //       },
  //     });
  //   }
  // };
  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const updateEvent = async (event: any): Promise<any> => {
    if (event.file) {
      if (event.file.size) {
        if (event.file.size < 5216800) {
          if (event.file.type === "image/jpeg" || event.file.type === "image/png") {
            const maxDimention = 500;
            let quality = 1;
            if (event.file.size > 15016800) {
              quality = 0.005;
            } else if (event.file.size > 13016800) {
              quality = 0.1;
            } else if (event.file.size > 5016800 && event.file.size < 13016800) {
              quality = 0.2;
            } else if (event.file.size > 1016800 && event.file.size < 5016800) {
              quality = 0.3;
            } else {
              quality = 0.4;
            }
            const fileObj = event.file;
            // tslint:disable-next-line: no-unused-expression
            new Compressor(fileObj, {
              quality,
              success(result) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const reader = new FileReader();
                reader.onload = (fileLoadedEvent: any) => {
                  const img = new Image();
                  img.onload = async () => {
                    const largerDimention = Math.max(img.width, img.height);
                    let factor = 1;
                    if (largerDimention > maxDimention) {
                      factor = largerDimention / maxDimention;
                    }
                    const width = img.width / factor;
                    const height = img.height / factor;
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    const src = canvas.toDataURL("image/jpeg", 0.7);
                    setEventFileList([{ ...event.file, url: src }, ...eventFileList.slice(-1)]);
                    setImgUrl(src);
                    setFieldsValue({ eventPicture: src });
                  };
                  img.src = fileLoadedEvent.target.result;
                };
                reader.readAsDataURL(result);
              },
              error(err) {
                console.log(err.message);
              },
            });
          } else {
            // setBannerFileList(bannerFileList);
          }
        } else {
          Swal.fire({
            title: "Maximum size exceeded",
            text: "Please select image of maximum 5 MB",
            icon: "info",
            confirmButtonText: "Ok",
          });
        }
      }
    } else {
      setFieldsValue({ eventPicture: eventFileList });
    }

  };
  const handleEventRemove = (e: any) => {
    setEventFileList([]);
  };
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleCancel = () => setPreviewVisible(false);
  const handleSubmit = async (ref: any, values: any) => {
    const { starTime, endTime, eventPicture, date, ...rest } = values;
    const picture = getFieldValue("eventPicture"); // Image url after converted to base64 and compression
    const payload = {
      ...rest,
      eventPicture: picture ?? "", // if picture is null or undefined, it stores empty string ''
      startTime: values.startTime && moment(values.startTime).format("h:mm A"),
      endTime: values.endTime && moment(values.endTime).format("h:mm A"),
      date: moment(values.date).format("MM/DD/YYYY"),
      createdBy: props?.user?.id,
    };
    updateFiltersData("events", payload).then((res) => {
      props.onClose();
    });
  };

  return (
    <div>
      {loader ? (
        <div className={`${bc}__loader`}>
          <CircularProgress />
        </div>
      ) : (
          <>
            <Drawer
              title="Add Event"
              width={"60%"}
              onClose={props.onClose}
              visible={props.visibleDrawer}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <Form
                layout="vertical"
                initialValues={INITIAL_STATE}
                onFinish={(values) => handleSubmit("/organizations", values)}
              >
                <Row gutter={12}>
                  <Col xs={24} sm={24} md={24} xl={8} xxl={8}>
                    <Form.Item
                      name="title"
                      label="Event Title"
                      rules={[
                        {
                          required: true,
                          message: "Please enter event title",
                        },
                      ]}
                    >
                      <Input placeholder="Event Title" />
                    </Form.Item>
                  </Col>


                  <Col xs={24} sm={24} md={24} xl={8} xxl={8}>
                    <Form.Item name="contact" label="Event Contact">
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={8} xxl={8}>
                    <Form.Item
                      name="url"
                      label="Url"
                      rules={[
                        { required: true, message: "Please enter url" },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Event URL"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={8} xxl={8}>
                    <Form.Item
                      name="eventPicture"
                      label="Event Picture - 670x260 pixels"
                    >
                      <Upload
                        listType="picture-card"
                        accept=".png, .jpg, .jpeg, .gif, .tiff"
                        onChange={(e) => updateEvent(e)}
                        beforeUpload={() => false}
                        style={{ margin: "20px 0" }}
                        onPreview={handlePreview}
                        multiple={false}
                        onRemove={handleEventRemove}
                      >
                        {eventFileList.length < 1 && (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                      <Modal
                        visible={previewVisible}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="Office Image"
                          style={{ width: "100%" }}
                          src={previewImage}
                        />
                      </Modal>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={8} xxl={8}>
                    <Form.Item name="location" label="Location">
                      <Input placeholder="Location" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={8} xxl={8}>
                    <Form.Item
                      name="date"
                      label="Date"
                      rules={[
                        { required: true, message: "Please choose the date" },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
                    <Form.Item name="startTime" label="Start Time">
                      <TimePicker
                        getPopupContainer={(trigger) => trigger}
                        use12Hours
                        format="h:mm A"
                        minuteStep={30}
                        size="large"
                        style={{ width: "100%", maxHeight: "40px" }}
                        placeholder="Start time"
                        renderExtraFooter={null}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
                    <Form.Item name="endTime" label="End Time">
                      <TimePicker
                        getPopupContainer={(trigger) => trigger}
                        use12Hours
                        format="h:mm A"
                        minuteStep={30}
                        size="large"
                        style={{ width: "100%", maxHeight: "40px" }}
                        placeholder="End time"
                        renderExtraFooter={null}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                    <Form.Item name="details" label="Event Details">
                      <Input.TextArea rows={4} placeholder="Event Details" />
                    </Form.Item>
                  </Col>
                </Row>
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Button onClick={props.onClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </div>
              </Form>
            </Drawer>
          </>
        )}
    </div>
  );
};
export default EventForm;
