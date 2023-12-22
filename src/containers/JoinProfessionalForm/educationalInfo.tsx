import React, { useState } from "react";
import { Button, Row, Col, Input, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

const EducationalInfo = (props: any) => {
  const [educationInputValue, setEducationInputValue] = useState("");
  const { setFieldsValue, getFieldValue } = props.form;
  const edu = getFieldValue("education_background");
  return (
    <Row>
      <Col xs={24} sm={24} md={22} xl={22} xxl={22}>
        <Form.Item
          name="education"
          rules={[
            {
              required: true,
              message: "Please enter your education background",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Input
            onChange={(e) => {
              e.persist();
              setEducationInputValue(e.target.value);
            }}
            maxLength={225}
            size="large"
            placeholder="Degree Completed, School, Year completed"
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.List name="education_background">
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
                          message:
                            "Please enter your education background or delete this field",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        size="large"
                        placeholder="Degree Completed, School, Year completed"
                        onChange={(e) => {
                          e.persist();
                          setEducationInputValue(e.target.value);
                        }}
                        style={{ width: "92%" }}
                        maxLength={225}
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
                    // disabled={!educationInputValue}
                    onClick={() => {
                      add();
                      setEducationInputValue("");
                    }}
                    className="add-btn"
                  >
                    Add Another
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Col>
      <Col xs={24} sm={24} md={22} xl={22} xxl={22}>
        <Form.Item
          name="licensure"
          rules={[
            {
              required: true,
              message: "Please enter your license number",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Input
            onChange={(e) => {
              e.persist();
              setEducationInputValue(e.target.value);
            }}
            maxLength={225}
            size="large"
            placeholder="License Number"
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={22} xl={22} xxl={22}>
        <Form.Item
          name="college"
          rules={[
            {
              required: true,
              message: "Please enter your Professional College",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Input
            onChange={(e) => {
              e.persist();
              setEducationInputValue(e.target.value);
            }}
            maxLength={225}
            size="large"
            placeholder="Professional College"
          />
        </Form.Item>
      </Col>


    </Row>
  );
};
export default EducationalInfo;
