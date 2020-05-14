import React, { useState, useEffect } from 'react';
import SchemaForm from "@/components/form";
import { SchemasItem, ObjectAny } from "@/components/form/interfance"
import { Form } from 'antd';
import { getOption, getLevelOption } from "@/api/index"
import './index.less'
const schemas: ObjectAny = {
  appinput: {
    label: "input输入框",
    type: "Input", props: {
      placeholder: "测试input输入框",
      allowClear: true,
      autoComplete: "off",
    }
  },
  appselect: {
    label: "Select",
    type: "Select", props: {
      placeholder: "测试Select",
      allowClear: true,
      loading: true
    },
    children: {
      type: "Option",
    }
  },
  appsecselect: {
    label: "secSelect",
    type: "Select", props: {
      placeholder: "测试Select",
      allowClear: true,
    },
    children: {
      type: "Option",
    }
  },
  appinputnumber: {
    label: "InputNumber输入框",
    type: "InputNumber", props: {
      placeholder: "测试InputNumber输入框"
    }
  },
  appdatepicker: {
    label: "DatePicker",
    type: "DatePicker",
    props: {
      placeholder: "测试InputNumber输入框"
    }
  },
  apprangepicker: {
    label: "RangePicker",
    type: "RangePicker", props: {
      placeholder: ["开始日期", "结束日期"]
    }
  },
  button: [{
    label: "",
    type: "Button",
    span: 5,
    props: {
      btnname: "查询",
      className: "reset",
      btntype: "primary",
      formtype: "submit"
    },
  }, {
    label: "",
    type: "Button",
    span: 5,
    props: {
      className: "reset",
      btnname: "重置",
      btntype: "primary",
      formtype: "reset"
    },
  }]
}
const FormDemo: React.FC<SchemasItem> = () => {
  const [state, setOption] = useState(schemas);
  const [form] = Form.useForm();
  useEffect(() => {
    let isDestroyed = false;
    const _getOption = async () => {
      schemas["appselect"].props.loading = true
      const { data: {
        list
      }
      } = await getOption({})
      schemas["appselect"].children.options = list
      schemas["appselect"].props.loading = false
      if (!isDestroyed) {
        setOption((state) => {
          return { ...state }
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
    schemas["appsecselect"].props.loading = true
    const { data: {
      list
    } } = await getLevelOption({ value })
    schemas["appsecselect"].children.options = list
    schemas["appsecselect"].props.loading = false
    setOption((state) => {
      return { ...state }
    })
  }
  const onFinish = (fieldsValue: object) => {
    console.log(fieldsValue, "查询条件")
  };
  const onValuesChange = (curChangeValue: ObjectAny) => {
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