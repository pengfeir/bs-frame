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
    type: "Input",
    props: {
      placeholder: "测试input输入框",
      allowClear: true,
      autoComplete: "off",
    },
    span: 12
  },
  appselect: {
    label: "Select",
    type: "Select",
    props: {
      placeholder: "测试Select",
      allowClear: true,
      loading: true
    },
    children: {
      type: "Option",
    },
    span: 12
  },
  appsecselect: {
    label: "secSelect",
    type: "Select",
    props: {
      placeholder: "测试Select",
      allowClear: true,
    },
    children: {
      type: "Option",
    },
    span: 12
  },
  appinputnumber: {
    label: "InputNumber输入框",
    type: "InputNumber",
    props: {
      placeholder: "测试InputNumber输入框"
    },
    span: 12
  },
  appdatepicker: {
    label: "DatePicker",
    type: "DatePicker",
    props: {
      placeholder: "测试InputNumber输入框"
    },
    span: 12
  },
  apprangepicker: {
    label: "RangePicker",
    type: "RangePicker",
    props: {
      placeholder: ["开始日期", "结束日期"]
    },
    span: 12
  },
  button: [{
    btnname: "保存",
    className: "reset",
    btntype: "primary",
    formtype: "submit"
  },
  {
    span: 12,
    className: "reset",
    btnname: "重置",
    btntype: "primary",
    formtype: "reset"
  }]
}
const QueryForm: React.FC = () => {
  const [querState, setQuerySchemas] = useState(querySchemas);
  const [form] = Form.useForm();
  useEffect(() => {
    let isDestroyed = false;
    const _getOption = async () => {
      querySchemas["appselect"].props.loading = true
      const { data: {
        list
      }
      } = await getOption({})
      querySchemas["appselect"].children.options = list
      querySchemas["appselect"].props.loading = false
      if (!isDestroyed) {
        setQuerySchemas((state) => {
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
    querySchemas["appsecselect"].props.loading = true
    const { data: {
      list
    } } = await getLevelOption({ value })
    querySchemas["appsecselect"].children.options = list
    querySchemas["appsecselect"].props.loading = false
    setQuerySchemas((state) => {
      return { ...state }
    })
  }
  const onQueryFinish = (fieldsValue: object) => {
    console.log(fieldsValue, "查询表单")
  };
  const onValuesChange = (curChangeValue: ObjectAny) => {
    if (curChangeValue.hasOwnProperty("appselect")) {
      form.setFieldsValue({ appsecselect: null })
      querySchemas["appsecselect"].props.value = ""
      _getLevelOption(curChangeValue["appselect"])
    }
  }
  return <>
    <Title level={3}>查询表单</Title>
    <SchemaForm schemas={querState} onFinish={onQueryFinish} onValuesChange={onValuesChange} form={form} />
  </>
}
const editSchemas: ObjectAny = {
  editinput: {
    label: "input输入框",
    type: "Input",
    props: {
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
    type: "Select",
    props: {
      placeholder: "测试Select",
      allowClear: true,
      loading: true,
    },
    children: {
      type: "Option",
    }
  },
  editnumber: {
    label: "InputNumber输入框",
    type: "InputNumber",
    props: {
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
    type: "RangePicker",
    props: {
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
    btnname: "保存",
    className: "reset",
    btntype: "primary",
    formtype: "submit"
  },
  {
    span: 12,
    className: "reset",
    btnname: "重置",
    btntype: "primary",
    formtype: "reset"
  }]
}
const EditForm: React.FC = () => {
  const [editState, setEditSchemas] = useState(editSchemas);
  const [form] = Form.useForm();
  useEffect(() => {
    let isDestroyed = false;
    const _getOption = async () => {
      editSchemas["editselect"].props.loading = true
      const { data: {
        list
      }
      } = await getOption({})
      editSchemas["editselect"].children.options = list
      editSchemas["editselect"].props.value = 1
      editSchemas["editselect"].props.loading = false
      if (!isDestroyed) {
        setEditSchemas((state) => {
          console.log(state, "state")
          return { ...state }
        })
      }
    }
    const _getFormInfo = async () => {
      _getOption()
      const { data: {
        editData
      }
      } = await getFormInfo({})
      form.setFieldsValue({ ...editData, editdatepicker: moment(editData.editdatepicker, 'YYYY-MM-DD'), editrangepicker: [moment(editData.editdatepicker, 'YYYY-MM-DD'), moment(editData.editdatepicker, 'YYYY-MM-DD')] })
      form.submit()
    }
    _getFormInfo()
    return () => {
      isDestroyed = true;
    }
  }, [form])
  const onEditFinish = (fieldsValue: object) => {
    console.log(fieldsValue, "查询条件")
  };
  const onValuesChange = (curChangeValue: ObjectAny) => {
    if (curChangeValue.hasOwnProperty("editselect")) {
    }
  }
  return <>
    <Title level={3}>编辑表单</Title>
    <SchemaForm schemas={editState} onFinish={onEditFinish} onValuesChange={onValuesChange} form={form} />
  </>
}
const FormDemo: React.FC = () => {
  return <>
    <QueryForm />
    <EditForm />
  </>
}
export default FormDemo;