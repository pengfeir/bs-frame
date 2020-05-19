import React, { useState, useEffect } from 'react';
import SchemaForm from "@/components/form";
import { ObjectAny } from "@/components/form/interfance"
import { Form, Typography } from 'antd';
import { getOption, getLevelOption, getFormInfo } from "@/api/index"
import './index.less'
import moment from 'moment';
const { Title } = Typography
const querySchemas: ObjectAny = {
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
const editSchemas: ObjectAny = {
  editinput: {
    label: "input输入框",
    type: "Input", props: {
      placeholder: "测试input输入框",
      allowClear: true,
      autoComplete: "off",
    },
    rules: [
      {
        required: true,
        message: '输入数字',
      },
    ]
  },
  editselect: {
    label: "Select",
    type: "Select", props: {
      placeholder: "测试Select",
      allowClear: true,
      loading: true
    },
    rules: [
      {
        required: true,
        message: '选择类型',
      }
    ],
    children: {
      type: "Option",
    }
  },
  editnumber: {
    label: "InputNumber输入框",
    type: "InputNumber", props: {
      placeholder: "测试InputNumber输入框"
    },
    rules: [
      {
        required: true,
        message: '输入数字',
      }
    ],
  },
  editdatepicker: {
    label: "DatePicker",
    type: "DatePicker",
    props: {
      placeholder: "测试InputNumber输入框"
    },
    rules: [
      {
        required: true,
        message: '选择时间',
      }
    ],
  },
  editrangepicker: {
    label: "RangePicker",
    type: "RangePicker", props: {
      placeholder: ["开始日期", "结束日期"]
    },
    rules: [
      {
        required: true,
        message: '选择日期',
      }
    ],
  },
  button: [{
    label: "",
    type: "Button",
    span: 12,
    props: {
      btnname: "保存",
      className: "reset",
      btntype: "primary",
      formtype: "submit"
    },
  }, {
    label: "",
    type: "Button",
    span: 12,
    props: {
      className: "reset",
      btnname: "重置",
      btntype: "primary",
      formtype: "reset"
    },
  }]
}
const FormDemo: React.FC = () => {
  const [querState, setQuerySchemas] = useState(querySchemas);
  const [editState, setEditSchemas] = useState(editSchemas);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  useEffect(() => {
    let isDestroyed = false;
    const _getOption = async () => {
      querySchemas["appselect"].props.loading = true
      editSchemas["editselect"].props.loading = true
      const { data: {
        list
      }
      } = await getOption({})
      querySchemas["appselect"].children.options = list
      querySchemas["appselect"].props.loading = false
      editSchemas["editselect"].children.options = list
      editSchemas["editselect"].props.loading = false
      if (!isDestroyed) {
        setQuerySchemas((state) => {
          return { ...state }
        })
        setEditSchemas((state) => {
          return { ...state }
        })
        form.submit()
      }
    }
    const _getFormInfo = async () => {
      _getOption()
      const { data: {
        editData
      }
      } = await getFormInfo({})
      form1.setFieldsValue({ ...editData, editdatepicker: moment(editData.editdatepicker, 'YYYY-MM-DD'), editrangepicker: [moment(editData.editdatepicker, 'YYYY-MM-DD'), moment(editData.editdatepicker, 'YYYY-MM-DD')] })
    }
    _getFormInfo()
    return () => {
      isDestroyed = true;
    }
  }, [form, form1])
  const _getLevelOption = async (value: object) => {
    querySchemas["appsecselect"].props.loading = true
    const { data: {
      list
    } } = await getLevelOption({ value })
    querySchemas["appsecselect"].children.options = list
    querySchemas["appsecselect"].props.loading = false
    setQuerySchemas((state) => {
      return { ...state }
    })
    setEditSchemas((state) => {
      return { ...state }
    })
  }
  const onQueryFinish = (fieldsValue: object) => {
    console.log(fieldsValue, "查询条件")
  };
  const onEditFinish = (fieldsValue: object) => {
    console.log(fieldsValue, "查询条件")
  };
  const onValuesChange = (curChangeValue: ObjectAny) => {
    if (curChangeValue.hasOwnProperty("appselect")) {
      form.setFieldsValue({ appsecselect: null })
      _getLevelOption(curChangeValue["appselect"])
    }
  }
  return <>
    <Title level={3}>查询表单</Title>
    <SchemaForm schemas={querState} onFinish={onQueryFinish} onValuesChange={onValuesChange} form={form} />
    <Title level={3}>编辑表单</Title>
    <SchemaForm schemas={editState} onFinish={onEditFinish} onValuesChange={onValuesChange} form={form1} />
  </>
}

export default FormDemo;