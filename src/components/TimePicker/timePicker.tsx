import { Col, Form, TimePicker } from 'antd';
import React from 'react';

interface ComponentProps {
day: string,
// key: number,
form: any
}
const WorkTimePicker = (({day, form}: ComponentProps) => {
    const {getFieldValue} = form
    const working_days = getFieldValue('working_days')
    return <>
     <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
                <Form.Item
                  name={`${day}_start_time`}
                  dependencies={["working_days"]}
                  rules={[
                    {
                      required: working_days?.includes(day) ?  true : false,
                      message: "Please enter your working Hours",
                    }
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <TimePicker
                    getPopupContainer={(trigger) => trigger}
                    use12Hours
                    format="h:mm A"
                    minuteStep={30}
                    size="large"
                    style={{ width: "100%", maxHeight: "40px" }}
                    placeholder="Start time"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12} xxl={12}>
                <Form.Item
                name={`${day}_end_time`}
                dependencies={["working_days"]}
                rules={[
                  {
                    required: working_days?.includes(day) ?  true : false,
                    message: "Please enter your working Hours",
                  }
                ]}
                validateTrigger={["onChange", "onBlur"]}
                >
                  <TimePicker
                    getPopupContainer={( trigger:any ) => trigger}
                    use12Hours
                    minuteStep={30}
                    format="h:mm A"
                    size="large"
                    style={{ width: "100%", maxHeight: "40px" }}
                    placeholder="End time"
                  />
                </Form.Item>
              </Col>

    </>
})

export default WorkTimePicker;

