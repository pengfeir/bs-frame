import React, { createElement, useState, useImperativeHandle } from 'react';
import { Form, Row, Col, Button, Input, InputNumber, DatePicker, Select } from 'antd';
import { SchemasItem, Schemas } from './interfance';
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
    console.log("MySelect", "render", props)
    const { type, children: { type: childrenType, options } } = props
    const onSelectChange = (e: string | number) => {
      sendValue(e)
    };
    const sendValue = (v: string | number) => {
      if (onChange) onChange(v)
    }
    let children = options.reduce((childrens: any, cur: any, i: number) => {
      childrens.push(createElement(formObj[childrenType], { key: i, value: cur.value }, cur.name))
      return childrens
    }, [])
    return (
      createElement(formObj[type], { ...props.props, onChange: onSelectChange }, children)
    )
  },
  SchemaForm: React.FC<Schemas> = ({ schemas }, ref) => {
    console.log(ref)
    console.log("SchemaForm", "render", schemas)
    // 此处注意useImperativeHandle方法的的第一个参数是目标元素的ref引用
    const [form] = Form.useForm();
    const onFinish = (fieldsValue: any) => {
      console.log(fieldsValue, form)
    };
    const onFieldsChange = (value: any) => {
      console.log(value, "onFieldsChange")
    }
    //2k屏刚好
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Form name="schema_form" form={form} onFinish={onFinish} onFieldsChange={onFieldsChange} {...layout} className="app-form">
        <Row>
          {schemas.filter(v => v.type !== "Button").map((v: SchemasItem, i: number) =>
            <Col span={v.span || 8} key={i}>
              <Form.Item
                name={v.name}
                label={v.label}
              >
                {(() => {
                  switch (v.type) {
                    case 'Select':
                      return <AppSelect {...v} />
                    default:
                      return createElement(formObj[v.type], { ...v.props }, null)
                  }
                })()}
              </Form.Item>
            </Col>
          )}
          <Col span={4}>
            <Form.Item>
              {schemas.filter(v => v.type === "Button").map((v, i) => {
                switch (v.props.formtype) {
                  case 'submit':
                    return <Button type={v.props.btntype} key={i} {...v.props} htmlType="submit">
                      {v.props.btnname}
                    </Button>
                  case 'reset':
                    return <Button type={v.props.btntype} key={i} {...v.props} onClick={() => {
                      form.resetFields();
                    }}>
                      {v.props.btnname}
                    </Button>
                  default:
                    return null
                }
              })}
            </Form.Item>
          </Col>
        </Row>
      </Form >
    )
  };
export default SchemaForm

