import React, { createElement } from 'react';
import { Form, Row, Col, Button, Input, InputNumber, DatePicker, Select } from 'antd';
import { SchemasItem, SchemasProps } from './interfance';
import "./index.less"
const { RangePicker } = DatePicker,
  { Option } = Select,
  formObj: any = {
    "Input": Input,
    "InputNumber": InputNumber,
    "DatePicker": DatePicker,
    "RangePicker": RangePicker,
    "Select": Select,
    "Option": Option,
  },
  AppSelect: React.FC<SchemasItem> = ({ onChange, ...props }) => {
    console.log("AppSelect-render", props)
    const { type, children: { type: childrenType, options = [] } } = props
    const onSelectChange = (e: string | number) => {
      sendValue(e)
    };
    const sendValue = (v: string | number) => {
      if (onChange) onChange(v)
    }
    let children = options.reduce((childrens: any, cur: any, i: number) => {
      childrens.push(createElement(formObj[childrenType], { key: i, value: cur.value }, cur.label))
      return childrens
    }, [])
    return (
      createElement(formObj[type], { ...props.props, onChange: onSelectChange }, children)
    )
  },
  SchemaForm: React.FC<SchemasProps> = (props) => {
    console.log("SchemaForm-render")
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { schemas } = props
    return (
      <Form name="schema_form" form={props.form} onFinish={(v: any) => props.onFinish(v)} onValuesChange={props.onValuesChange} onFieldsChange={props.onFieldsChange}   {...layout} className="app-form">
        <Row>
          {Object.keys(schemas).filter(key => key !== "button").map((name, i) =>
            <Col span={schemas[name].span || 8} key={i}>
              <Form.Item
                name={name}
                label={schemas[name].label}
              >
                {(() => {
                  switch (schemas[name].type) {
                    case 'Select':
                      return <AppSelect {...schemas[name]} />
                    default:
                      return createElement(formObj[schemas[name].type], { ...schemas[name].props }, null)
                  }
                })()}
              </Form.Item>
            </Col>
          )}
          <Col span={4}>
            <Form.Item>
              {schemas["button"].map((item: any, i: number) => {
                switch (item.props.formtype) {
                  case 'submit':
                    return <Button type={item.props.btntype} key={i} className={item.props.className} htmlType="submit">
                      {item.props.btnname}
                    </Button>
                  case 'reset':
                    return <Button type={item.props.btntype} key={i} className={item.props.className} onClick={() => {
                      props.form.resetFields();
                    }}>
                      {item.props.btnname}
                    </Button>
                  default:
                    return null
                }
              })}
            </Form.Item>
          </Col>
        </Row >
      </Form >
    )
  };
export default SchemaForm

