import React, { useState, useEffect } from 'react';
import SchemaForm from "@/components/form";
import { SchemasItem } from "@/components/form/interfance"
import { Form } from 'antd';
import { getOption, getLevelOption } from "@/api/index"
import './index.less'
const schemas: Array<SchemasItem> = [
  {
    label: "input输入框",
    name: "appinput", type: "Input", props: {
      placeholder: "测试input输入框",
      allowClear: true,
      autoComplete: "off",
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
      ]
    }
  },
  {
    label: "secSelect",
    name: "appsecselect", type: "Select", props: {
      placeholder: "测试Select",
      allowClear: true,
    },
    children: {
      type: "Option",
      props: {
        value: ""
      },
      options: [
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
      placeholder: ["开始日期", "结束日期"]
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
  const [state, setOption] = useState(schemas);
  const [form] = Form.useForm();
  useEffect(() => {
    let isDestroyed = false;
    const _getOption = async () => {
      const { data: {
        list
      }
      } = await getOption({})
      schemas.forEach(v => {
        if (v.name === "appselect") {
          v.children.options = list
        }
      })
      if (!isDestroyed) {
        setOption((state) => {
          return [...state]
        })
        form.submit()
      }
    }
    _getOption()
    return () => {
      isDestroyed = true;
    }
  }, [form])
  const _getLevelOption = async (value: object) => {
    const { data: {
      list
    } } = await getLevelOption({ value })
    schemas.forEach(v => {
      if (v.name === "appsecselect") {
        v.children.options = list
      }
    })
    setOption((state) => {
      return [...state]
    })
  }
  const onFinish = (fieldsValue: object) => {
    console.log(fieldsValue, "查询条件")
  };
  const onValuesChange = (curChangeValue: any) => {
    console.log("onValuesChange", curChangeValue)
    if (curChangeValue.hasOwnProperty("appselect")) {
      form.setFieldsValue({ appsecselect: null })
      _getLevelOption(curChangeValue["appselect"])
    }
  }
  return <>
    <SchemaForm schemas={state} onFinish={onFinish} onValuesChange={onValuesChange} form={form} />
  </>
}

export default FormDemo;