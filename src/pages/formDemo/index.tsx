import React, { useState, useEffect } from 'react';
import SchemaForm from "@/components/form";
import { SchemasItem } from "@/components/form/interfance"
import { Form } from 'antd';
import { getOption } from "@/api/index"
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
    const _getOption = async () => {
      const { data: {
        list
      }
      } = await getOption({})
      console.log(list)
      state.forEach(v => {
        if (v.name === "appselect") {
          v.children.options = list
        }
      })
      setOption(state)
      console.log(form)
      form.submit()
      // if (cur) {
      //   console.log(list, "list")
      //   cur.children.options = [...list]
      //   setOption(state)
      //   console.log(state, 444)
      //   form.submit()
      // }
    }
    _getOption()
  }, [form, state])

  const onFinish = (fieldsValue: any) => {
    console.log(fieldsValue, 6666)
  };
  return <>
    <SchemaForm schemas={state} onFinish={onFinish} form={form} />
  </>
}

export default FormDemo;