import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Select, Divider, Radio, Button, Upload, Modal } from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import UserAvatar from "../../components/Avatar/Avatar";
import {
  getFbData,
  updateUserData,
  updateFiltersData,
  base_URL,
} from "../../servises/firebase";
import {
  setItemToLocalStorage,
  getItemToLocalStorage,
} from "../../servises/localStorage";
import "../JoinProfessionalForm/styles.scss";
import Compressor from "compressorjs";
import MaskedInput from "react-text-mask";
import Swal from "sweetalert2";

const { Option } = Select;
const { TextArea } = Input;
const bc = "join-professional";

let index = 0;

const OrgPersonalProfile = (props: any) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [draftData, setDraftData] = useState(
    getItemToLocalStorage("nonPofitData")
  );
  const [orgType, setOrgType] = useState(["Hospital", "Non-Profit", 'Community Clinic', 'Organization', 'School', 'Camp', 'Technology', 'Pediatric Product']);
  const { setFieldsValue, getFieldValue } = props.form;
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [bannerFileList, setBannerFileList] = useState([])
  const [imgUrl, setImgUrl] = useState("");
  const id = getFieldValue("id");
  useEffect(() => {
    setItems(props.cities);
  }, [props.cities]);
  useEffect(() => {
    const avatar = getFieldValue("avatar");
    if (id || draftData) {
      setImageUrl(avatar);
    } else {
      setFieldsValue({ avatar: "" });
      setImageUrl("");
    }
    // Banner image
    if (props.banner) {
      const data = props?.banner && {
        url: props.banner,
        uid: 1,
        name: "banner",
        status: "done",
      };
      data ? setBannerFileList([data]) : setBannerFileList([])
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
        let localList = getItemToLocalStorage("citiesIds")
        if (localList) {
          props.addCity(localList);
        }
        else {
          await fetch(`${base_URL}/GetIdandName`)  // complete list cities, org, prof
            .then(response => response.json())
            .then(data => {
              if (data) {
                // organization ids list => data[0]
                setItemToLocalStorage("orgIds", data[0]);

                // cities ids list => data[1]
                props.addCity(data[1]);
                setItemToLocalStorage("cities", data[1]);

                // professionals (users) ids list => data[2]
                setItemToLocalStorage("usersIds", data[2]);
              }
            })
        }
      });
      const newItem = [...items, { name: name }];
      setItems(newItem);
      setName("");
    } else {
      setItems(items);
      setName("");
    }
  };
  const ImageHandler = (event: any, index: number): any => {
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

    if (event.file) {
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
              setBannerFileList([{ ...event.file, url: imgUrl }, , ...bannerFileList.slice(-1)]);
              setImgUrl(src);
              setFieldsValue({ banner: src });
            };
            img.src = fileLoadedEvent.target.result;
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error: any) => reject(error);
    });
  }


  const updateBanner = async (event: any): Promise<any> => {
    if (event.file) {
      if (event.file.size) {
        if (event.file.size < 5416800) {
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
                    setBannerFileList([{ ...event.file, url: src }, ...bannerFileList.slice(-1)]);
                    setImgUrl(src);
                    setFieldsValue({ banner: src });
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
      setFieldsValue({ banner: bannerFileList });
    }
  };

  const handleBannerRemove = (e: any) => {
    setBannerFileList([])
  }
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  };
  const handleCancel = () => setPreviewVisible(false);

  return (
    <>
      <Row gutter={[16, 10]}>
        <Col xs={12} sm={12} md={12} xl={12} xxl={12} >
          <Form.Item
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please add the logo of your organization",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <UserAvatar
              preview={imageUrl}
              setFieldValue={setFieldsValue}
              edit={id || draftData ? true : false}
              label="Organization Logo"
            />
          </Form.Item>
          <p>Click to add the logo of your organization</p>
        </Col>
        <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
          <Form.Item
            name="pictures"
            rules={[
              {
                required: true,
                message: "Office pictures required!",
              },
              () => ({
                validator(rule, value) {
                  if (
                    props.fileList?.length === 1 &&
                    props.fileList?.length < 2
                  ) {
                    return Promise.reject("Select at-least 2 office pictures.");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            validateTrigger={["onBlur"]}
          >

            <Upload
              listType="picture-card"
              fileList={props.fileList}
              onChange={(e) => {
                props.firstImageSelectedHandler(e);
              }}
              beforeUpload={() => false}
              style={{ margin: "20px 0" }}
              onPreview={handlePreview}
              onRemove={props.handleRemove}
            >
              {props.fileList.length < 6 && (
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
          <h4 style={{ marginBottom: 20 }}>
            Upload up to 6 organization photos (5MB/Photo)
          </h4>
          <p style={{ marginTop: "-21px" }}>
            Suggested images include the outside of your office, inside of your
            office, and/or company logo.
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 10]}>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Name of Organization*</h4>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your organization name",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input
              size="large"
              placeholder="Name of your organization"
              maxLength={100}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Tagline*</h4>
          <Form.Item
            name="tagline"
            rules={[
              {
                required: true,
                message: "Please enter your tagline.",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input
              size="large"
              maxLength={60}
              placeholder="Tagline or brief description"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Address 1</h4>
          <Form.Item name="address" validateTrigger={["onChange", "onBlur"]}>
            <Input maxLength={225} size="large" placeholder="Address" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Address 2</h4>
          <Form.Item name="addresses" validateTrigger={["onChange", "onBlur"]}>
            <Input maxLength={225} size="large" placeholder="Address" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Row gutter={16}>
            <Col xs={24} sm={7} md={7} xl={7} xxl={7}>
              <h4>Country*</h4>
              <Form.Item name="country">
                {/* <Select defaultValue="Canada" size="large"> */}
                <Select size="large">
                  <Option value="Canada">Canada</Option>
                  <Option value="USA">USA</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={10} md={10} xl={10} xxl={10}>
              <h4>City*</h4>
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
            <Col xs={24} sm={7} md={7} xl={7} xxl={7}>
              <h4>Province/State*</h4>
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
                <Input
                  size="large"
                  placeholder="Province/State"
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          </Row>
          <h4>Postal Code/Zip Code*</h4>
          <Form.Item
            name="postal_code"
            rules={[
              {
                required: true,
                message: "Please enter your postal code",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Postal code" maxLength={20} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> About the Organization </h4>
          <Form.Item name="about" validateTrigger={["onChange", "onBlur"]}>
            <TextArea
              rows={4}
              placeholder="I.e. History, Mission statement, Services offered"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Professional Statement* </h4>
          <Form.Item
            name="prof_statement"
            rules={[
              {
                required: true,
                message: "Please enter your professional statement",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <TextArea
              rows={4}
              placeholder="Professional statement to caregivers"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Organization Twitter Username </h4>
          <Form.Item
            name="twitter"
            rules={[
              {
                pattern: /@([A-Za-z0-9_]{1,15})/,
                message: "Must be valid username. @username",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="@username" maxLength={100} />
          </Form.Item>
        </Col>

        {/* <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
          <h4>Do you have multiple locations?</h4>
          <Form.Item
            name='multiple_loc'
          >
            <Radio.Group>
              <Radio value={true}>Yes.</Radio>
              <Radio value={false}>No.</Radio>
            </Radio.Group>
          </Form.Item>
        </Col> */}
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Languages Spoken?*</h4>
          <p>
            If you don’t see the Language you are looking for, please contact us
            at <em>info@ehkidshealth.com</em>
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
        </Col>
        <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
          <h4>Organization Type*</h4>
          <Form.Item
            name="org_type"
            rules={[
              {
                required: true,
                message: "Please select your organization Type",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select
              getPopupContainer={(trigger) => trigger.parentNode}
              style={{ width: "100%" }}
              placeholder="Organization Type"
              size="large"
              showSearch
            >
              {orgType &&
                orgType.map((item: any, index: number) => (
                  <Option value={item} key={`${item} ${index}`}>
                    {item}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
          <h4>Department/Subgroup Name</h4>
          <Form.Item
            name="sub_group"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter your sub group",
            //   },
            // ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input
              size="large"
              placeholder="Department/Subgroup"
              maxLength={100}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
          <h4>Phone Number</h4>
          <Form.Item
            name="phone"
            rules={[
              // {
              //   required: true,
              //   message: "Please enter your phone number",
              // },
              {
                pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                message: "Enter valid number: 123-1234",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <MaskedInput
              mask={[
                "(",
                /[1-9]/,
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              placeholder="Phone Number"
              guide={false}
              className="phone_input"
            />
            {/* <Input size="large" placeholder="Phone Number" maxLength={20} /> */}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <h4>Organization Website*</h4>
          <Form.Item
            name="site"
            rules={[
              {
                required: true,
                message: "Please enter your Website",
              },
              {
                pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                message: "Must be valid Url. http://www.google.com",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input size="large" placeholder="Website" maxLength={50} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <h4>Fundraising URL</h4>
          <Form.Item
            name="fund_link"
            rules={[
              {
                pattern: /^(http|https):/,
                message: "Enter valid URL with http ot https",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input
              size="large"
              placeholder="Enter the complete URL"
              maxLength={100}
            />
          </Form.Item>
        </Col>

        <Row gutter={[16, 10]}>
          <Col xs={11} sm={8} md={8} xl={8} xxl={8}
            style={{ marginLeft: "5px" }}
          >
            <Form.Item name="banner">
              <Upload
                fileList={bannerFileList}
                listType="picture-card"
                onChange={(e) => updateBanner(e)}
                beforeUpload={() => false}
                style={{ margin: "20px 0" }}
                onPreview={handlePreview}
                multiple={false}
                onRemove={handleBannerRemove}
              >
                {bannerFileList.length < 1 && (
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
          <Col xs={12} sm={15} md={15} xl={15} xxl={15}
            style={{ marginTop: "25px" }}
          >
            <h4 style={{ marginBottom: 20 }}>Upload Banner - 375 x 375 Pixels</h4>
          </Col>
        </Row>
      </Row>
    </>
  );
};
export default OrgPersonalProfile;
