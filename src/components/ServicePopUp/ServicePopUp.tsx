import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Modal, Button, Select, Divider } from "antd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  getFbData,
  updateUserData,
  updateFiltersData,
} from "../../servises/firebase";
import {
  setItemToLocalStorage,
  getItemToLocalStorage,
} from "../../servises/localStorage";
import DialogTitle from "@material-ui/core/DialogTitle";
import { PlusOutlined } from "@ant-design/icons";
import "./styles.scss";
const { Option } = Select;
const { TextArea } = Input;
interface ComponentProps {
  open: boolean;
  handleClose: any;
  cities: any;
  addLocation: any;
  form: any;
  addCity: any;
}

const bc = "service-popup";
const ServicePopup = (props: ComponentProps) => {
    const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const clearData = () => {
    setFieldsValue({services_country:"",services_province:"",services_city:""});
  }
  const add = () => {
    if (getFieldValue("services_country") && getFieldValue("services_province") && getFieldValue("services_city")) {
      props.addLocation(`${getFieldValue("services_country")}, ${getFieldValue("services_province")} ${getFieldValue("services_city")}`);
      clearData();
      props.handleClose();

    }
  };
  const selectCountry = [
    "Canada",
    "USA"

  ];
  useEffect(() => {
    setItems(props.cities);

  }, [props.cities]);
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
  
  return (
    <Dialog
      maxWidth="md"
      open={props.open}
      aria-labelledby="responsive-dialog-title"
      className={bc}
    >
      <div className={`${bc}__container`}>
        <Row gutter={[16, 10]}>
          <Col span={18}>
            <DialogTitle id="responsive-dialog-title">
              {"Add Locations"}
            </DialogTitle>
          </Col>
          <Col span={6}>
            <DialogActions>
              <Button onClick={props.handleClose}
                color="primary" autoFocus
                className={`${bc}__close-Btn`}>
                ❌
          </Button>
            </DialogActions>
          </Col>
        </Row>
        <DialogContent style={{padding:"60px 24px"}}>
          <Form
          form={form}
          onFinish={add}>
          <Row gutter={[16, 10]}>
            <Col xs={24}>
              <p className={`x${bc}__Textfont`}>
                Please add the city for your service location. You can continue to add
                multiple locations anytime.
                  </p>
            </Col>
          </Row>
          <Row gutter={[16, 10]}>
            <Col span={8}>
              <h4>Country</h4>
              <Form.Item
                name="services_country"
                   rules={[
              {
                required: true,
                message: "Please add country",
              },
            ]}
                validateTrigger={["onChange", "onBlur"]}
              >
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  style={{ width: "100%" }}
                  placeholder="Select Country"
                  size="large"
                  onChange={(e) => {
                  }}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                    </div>
                  )}
                >
                  {selectCountry &&
                    selectCountry.map((item: any, index: number) => (
                      <Option value={item} key={`${item} ${index}`}>
                        {item}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <h4>Province/State</h4>
              <Form.Item
                name="services_province"
                rules={[
              {
                required: true,
                message: "Please add Province/State",
              },
            ]}
                validateTrigger={["onChange", "onBlur"]}
              >
                <Input
                  size="large"
                  placeholder="Enter Province"
                  maxLength={100}
                  className={`${bc}__Textfont`}
                />
              </Form.Item>
            </Col>
            <Col xs={8} >
              <h4>City</h4>
              <Form.Item
                name="services_city"
                   rules={[
              {
                required: true,
                message: "Please add city",
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
          <Row gutter={[16, 10]}>
            <Col xs={24}>
              <Form.Item
                className={`${bc}__text-center`}>
                <Button
                  className={`${bc}__btn-submit ant-btn-primary`}
                  htmlType="submit"
                  size="large"
                  // style={{backgroundColor:'#39a2cf'}}
                  // onClick={add}
                >
                  Add </Button>
              </Form.Item>
            </Col>
          </Row>
          </Form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
export default ServicePopup;
