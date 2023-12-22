// MAIN MODULES
import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Radio,
  Checkbox,
  Select,
  InputNumber,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import WorkTimePicker from "../../components/TimePicker/timePicker";
import ServicePopUp from '../../components/ServicePopUp/ServicePopUp';

const { Option } = Select;
const OrganizationalInfo = (props: any) => {
  const serviceOptions = [
    { label: 'In Home', value: 'In home', description: 'Select if you offer services in home', checked: false },
    { label: 'In School', value: 'In school', description: 'Select if you offer services in school', checked: false },
    { label: 'Online/App Services', value: 'Online', description: 'Select if you offer services online or via a mobile application', checked: false },
    { label: 'At Specific Locations', value: 'Specific', description: 'Select if you offer services at specific locations', checked: false }
  ];
  const { setFieldsValue, getFieldValue } = props.form;
  const geographicAreas: any[] = ["Canada", "USA", 'Global'];
  const [otherField, enableOtherField] = useState(
    // props?.userData?.findUsOther || draftData?.findUsOther ? false : true
    props?.userData?.findUsOther ? false : true
  );
  const [updateNow, setUpdateNow] = useState(true);
  const [updateSevices, setUpdateSevices] = useState(true);
  const [specificService, setSpecificService] = useState(getFieldValue('services').includes("Specific"));
  const [servicesCheck, setServiceCheck] = useState(serviceOptions);
  const [openPopup, setOpenPopup] = useState(false);
  const [locationAdded, setLocationAdded] = useState(false);
  const [locations, setLocations] = useState(getFieldValue('otherServices'));
  const updateCheckbox = () => {
    setUpdateNow(!updateNow)
  }
  const howDidYouFind = [
    "Google search",
    "Word of mouth referral",
    "Social media",
    "Press",
    "One of our pediatric partners",
    "Other",
  ];


  const onChangeServices = (service: any) => {
    setUpdateSevices(!updateSevices)
    service.checked = !service.checked;
    if (service.value == 'Specific') {
      // setSpecificService(service.checked);
      setSpecificService(!specificService);
    }
  };
  const setOtherFieldValue = (event: any) => {
    if (event === "Other") {
      enableOtherField(false);
    } else {
      enableOtherField(true);
    }
  };
  const showPopup = () => {
    //  setPopUp(!popUp);
    setOpenPopup(true);
  };
  const handlePrivacyTile = (): any => {
    setOpenPopup(false);
  };
  const addLocation = (location: string) => {
    setLocations([...locations, location]);
    setFieldsValue({ otherServices: [...locations, location] });
  };
  const removeLocation = (idx: number) => {
    const newLocation = locations.filter((item: any, sidx: any) => sidx !== idx)
    setLocations(newLocation);
    setFieldsValue({ otherServices: newLocation });
  };
  return (
    <>
      <Row gutter={[16, 10]}>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Diagnosis/Area of Concern*</h4>
          <p>
            If you don’t see the Diagnosis/Area of Concern you are looking for, please contact us at <em>info@ehkidshealth.com</em>
          </p>
          <Form.Item
            name="specialities"
            rules={[
              {
                required: true,
                message: "Please enter your Diagnosis/Area of Concern",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select
              size="large"
              id="specialities-dropdown"
              getPopupContainer={(trigger) => trigger.parentNode}
              mode="multiple"
              style={{ width: "100%", maxWidth: "760px" }}
              placeholder="ADHD, Family Mediation, Cerebral Palsy"
              tokenSeparators={[","]}
              showArrow
            >
              {props?.diagnoses?.map((item: any, index: any) => (
                <Option value={item.name} key={`${item.id} ${index}`}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Which of the following does your organization serve?*</h4>
          <Form.Item
            name="works_with"
            rules={[
              {
                required: true,
                message:
                  "Please check if you want to share your email as public.",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={'Families/Caregivers'}>Families/Caregivers</Radio>
              <Radio value={'Professionals'}>Professionals</Radio>
              <Radio value={'Both Families/Caregivers and Professionals'}>Both Families/Caregivers and Professionals</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <h4>Professional types within our organization*</h4>
          <p>
            If you don’t see the Professional type you are looking for, please contact us at <em>info@ehkidshealth.com</em>
          </p>
          <Form.Item
            name="prof_types"
            rules={[
              {
                required: true,
                message: "Please select your Professional types",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select
              getPopupContainer={(trigger) => trigger.parentNode}
              style={{ width: "100%", maxWidth: "760px" }}
              size="large"
              placeholder="Add professional types that are part of the organization"
              showSearch
              mode="multiple"
              allowClear
              showArrow
              dropdownRender={(menu) => (
                <div>
                  {menu}
                </div>
              )}
            >
              {props?.professionalTitle?.map((item: any, index: number) => (
                <Option value={item.type} key={`${item.id} ${index}`}>
                  {item.type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <h4>Geographic Areas Served*</h4>
          <Form.Item
            name="geo_areas"
            rules={[
              {
                required: true,
                message: "Please enter your geographics",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select
              size="large"
              id="geographic-dropdown"
              getPopupContainer={(trigger) => trigger.parentNode}
              mode="multiple"
              style={{ width: "100%", maxWidth: "760px" }}
              placeholder="Add your Geographic area"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                </div>
              )}
            >
              {geographicAreas.map((item: any, index: any) => (
                <Option value={item} key={`${item} ${index}`}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <h4> About Your Service Locations?* </h4>
          <p>Where are your services offered?</p>
          <Form.Item name='otherServices' style={{ display: 'none' }} >
            <Input
              size="large"
              value={locations}
            />
          </Form.Item>
          <Form.Item
            className='mb-10'
            name="services"
            rules={[
              {
                required: true,
                message: "Please add service location",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}>
            <Checkbox.Group style={{ width: "100%", display: "flex", flexDirection: 'column' }}>
              <Row gutter={[20, 20]}>
                {servicesCheck.map((item: any) => {
                  return <Col xs={12} key={item.label}>
                    <Checkbox
                      value={item.value}
                      onClick={() => onChangeServices(item)}>{item.label}</Checkbox>
                    <p>{item.description}</p>
                  </Col>
                })}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <ServicePopUp
            addLocation={addLocation}
            handleClose={handlePrivacyTile}
            form={props.form}
            cities={props.cities}
            open={openPopup} 
            addCity={props.addCity}/>
          <div className="badge">
            {specificService ?
              locations.map((location: any, idx: any) => (
                <span className='badge-item' key={idx}>
                  {location}
                  <span style={{ cursor: 'pointer' }}
                    onClick={() => removeLocation(idx)} >❌</span>
                </span>
              ))
              : ""
            }
          </div>
          {specificService
            ? <Button onClick={showPopup}
              className="ant-btn-primary"
              style={{ borderRadius: "5px" }} >Add Location of Service
          </Button>
            : <Button disabled> Add Location of Service </Button>}
        </Col>


        <Col xs={24} sm={24} md={24} xl={24} xxl={24} style={{ marginTop: '15px' }}>
          <h4>Email used for scheduling appointments</h4>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Must be valid email!",
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
            dependencies={["email"]}
            hasFeedback
            rules={[
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
          <h4>Do you want your email published to the public?</h4>
          <Form.Item
            name="email_public"
          >
            <Radio.Group>
              <Radio value={true}>Yes please.</Radio>
              <Radio value={false}>No I don’t want to receive emails.</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Do you accept insurance?</h4>
          <Form.Item
            name="insurance"
            validateTrigger={["onChange", "onBlur"]}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Do you accept most major insurance plans? </h4>
          <Form.Item
            name="major_insurance"
            validateTrigger={["onChange", "onBlur"]}
          >
            <Radio.Group>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Is your organization looking for volunteers? </h4>
          <Form.Item
            name="need_volunteer"
            validateTrigger={["onChange", "onBlur"]}
          >
            <Radio.Group>
              <Radio value="no">No</Radio>
              <br />
              <Radio value="yes">Yes! Please inquire with contact email</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <h4>Days of Operation</h4>
          <Form.Item
            name="working_days"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter your operation days",
            //   },
            // ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Checkbox.Group style={{ width: "100%", display: "flex", flexDirection: 'column' }}>
              {props.daysOfWeek.map((day: string, index: number) => {
                return <Row gutter={[16, 10]} key={index}>
                  <Col xs={24} sm={24} md={5} xl={5} xxl={5}>
                    <Checkbox value={day} onClick={updateCheckbox}>{day}</Checkbox>
                  </Col>
                  <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
                    <Row gutter={[16, 10]}>
                      <WorkTimePicker day={day}
                        // key={index}
                        form={props.form} />
                    </Row>
                  </Col>
                </Row>
              }
              )}
            </Checkbox.Group>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Average wait times for an initial appointment?* </h4>
          <Row gutter={[16, 10]}>
            <Col xs={24} sm={4} md={4} xl={4} xxl={4}>
              <Form.Item name="wait_time"
                rules={[
                  {
                    required: true,
                    message: "Please add appointments wait time",
                  },
                ]}
                validateTrigger={["onChange", "onBlur"]}>
                <Input type='number' size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
              <Form.Item name="wait_time_unit"
                rules={[
                  {
                    required: true,
                    message: "Please add appointments wait time",
                  },
                ]}
                validateTrigger={["onChange", "onBlur"]}>
                <Radio.Group>
                  <Radio value="Hours">Hours</Radio>
                  <Radio value="Days">Days</Radio>
                  <Radio value="Months">Months</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Organization Video</h4>
          <Form.Item
            name="video"
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
              placeholder="Introduction Video link"
              maxLength={100}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Awards or recognition </h4>
          <Form.Item
            name="awards"
            validateTrigger={["onChange", "onBlur"]}
          >
            <TextArea
              rows={4}
              placeholder="Click + button to add multiple"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.List name="award_list">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.splice(1).map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: fields.length == 0 ? false : true,
                            message: "Please enter your awards",
                          },
                        ]}
                        noStyle
                      >
                        <TextArea
                          rows={4}
                          placeholder="Awards or recognition"
                          style={{ width: "92%" }}
                        />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <CloseCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      className="add-btn"
                    >
                      Add Another
                      {/* <PlusCircleOutlined /> */}
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Stories or testimonials </h4>
          <Form.Item
            name="testimonials"
            validateTrigger={["onChange", "onBlur"]}
          >
            <TextArea
              rows={4}
              placeholder="Click + button to add multiple"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.List name="testimonials_list">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.splice(1).map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: fields.length == 0 ? false : true,
                            message: "Please enter your Testimonials",
                          },
                        ]}
                        noStyle
                      >
                        <TextArea
                          rows={4}
                          placeholder="Stories or Testimonials"
                          style={{ width: "92%" }}
                        />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <CloseCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      className="add-btn"
                    >
                      Add Another
                      {/* <PlusCircleOutlined /> */}
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Col>
        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4>Affiliations </h4>
          <Form.Item
            name="affiliations"
            validateTrigger={["onChange", "onBlur"]}
          >
            <TextArea
              rows={4}
              placeholder="Click + button to add multiple"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.List name="affiliations_list">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.splice(1).map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: fields.length == 0 ? false : true,
                            message: "Please enter your affiliations",
                          },
                        ]}
                        noStyle
                      >
                        <TextArea
                          rows={4}
                          placeholder="Affiliations"
                          style={{ width: "92%" }}
                        />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <CloseCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      className="add-btn"
                    >
                      Add Another
                      {/* <PlusCircleOutlined /> */}
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Col>

        <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
          <h4> Doctor Referral Needed?*</h4>
          <Form.Item
            name="dr_needed"
            rules={[
              {
                required: true,
                message:
                  "Doctor referral needed?",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <br />
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={24}>
          <h4>How did you hear about us?*</h4>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="findUs"
            rules={[
              {
                required: true,
                message: "How did you find us?",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select
              getPopupContainer={(trigger) => trigger.parentNode}
              style={{ width: "100%" }}
              placeholder="How did you find us?"
              size="large"
              onChange={(e) => {
                return setOtherFieldValue(e);
              }}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                </div>
              )}
            >
              {howDidYouFind &&
                howDidYouFind.map((item: any, index: number) => (
                  <Option value={item} key={`${item} ${index}`}>
                    {item}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} xl={12} xxl={12}>
          <Form.Item
            name="findUsOther"
            style={{ display: otherField ? "none" : "block" }}
            rules={[
              {
                required: otherField ? false : true,
                message: "How did you find us?",
              },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input
              size="large"
              placeholder="Other"
              maxLength={100}
              disabled={otherField}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default OrganizationalInfo;
