import React, { useState, useEffect, useRef } from 'react';
import SchemaForm from "@/components/form";
import { SchemasItem } from "@/components/form/interfance"
import './index.less'
const schemas: Array<SchemasItem> = [
  {
    label: "input输入框",
    name: "appinput", type: "Input", props: {
      placeholder: "测试input输入框",
      allowClear: true
    }
  },
  {
    label: "Select",
    name: "appselect", type: "Select", props: {
      placeholder: "测试Select",
      allowClear: true
    },
    children: {
      type: "Option",
      props: {
        value: ""
      },
      options: [
        { name: "name1", value: 1 },
        { name: "name2", value: 2 },
        { name: "name3", value: 3 },
        { name: "name4", value: 4 }
      ]
    }
  },
  {
    label: "InputNumber输入框",
    name: "appinputnumber", type: "InputNumber", props: {
      placeholder: "测试InputNumber输入框"
    }
  },
  {
    label: "DatePicker",
    name: "appdatepicker", type: "DatePicker",
    props: {
      placeholder: "测试InputNumber输入框"
    }
  },
  {
    label: "RangePicker",
    name: "apprangepicker", type: "RangePicker", props: {
      placeholder: "测试DatePicker"
    }
  },
  {
    label: "",
    type: "Button",
    span: 5,
    props: {
      btnname: "查询",
      className: "reset",
      btntype: "primary",
      formtype: "submit"
    },
  },
  {
    label: "",
    type: "Button",
    span: 5,
    props: {
      className: "reset",
      btnname: "重置",
      btntype: "primary",
      formtype: "reset"
    },
  },
]
const FormDemo: React.FC<SchemasItem> = () => {
  const inputEl = useRef(null);
  console.log(inputEl, "inputEl")
  useEffect(() => {
    console.log('useRef')
    console.log(inputEl.current)
  }, [])
  return <>
    <SchemaForm schemas={schemas} />
  </>
}

export default FormDemo;