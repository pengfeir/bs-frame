import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { getTableData } from "@/api/index"
interface tableType {
  pageSize: number,
  pageNumber: number,
  total: number,
  data: [],

}
interface queryTable {
  pageNumber: number,
  [propName: string
  ]: any;
}
const FormDemo: React.FC = () => {
  const [dialog, setDialog] = useState(false)
  const handleclick = (text: any, record: any, index: any, e: any) => {
    setDialog(true)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text: any, record: any, index: any) => <Button type="link" key={record.key} onClick={(e) => handleclick(text, record, index, e)}>hahah</Button>,
    },
  ];
  let initObj: tableType
  initObj = {
    pageSize: 10,
    pageNumber: 1,
    total: 0,
    data: [],
  }
  const [tableObj, setTableData] = useState(initObj);
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState({ pageNumber: 1 })
  const _getTableData = async (val: queryTable) => {
    setLoading(true)
    let { data } = await getTableData(val)
    console.log(data)
    setTableData(data)
    setLoading(false)
  }
  useEffect(() => {
    console.log("useEffect", useEffect)
    _getTableData(query)
  }, [query])
  const onChange = (val: any) => {
    setQuery({ ...val })
  }
  return <>
    <Modal
      title="Basic Modal"
      visible={dialog}
      onOk={() => setDialog(false)}
      onCancel={() => setDialog(false)}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
    <Table columns={columns} dataSource={tableObj.data} pagination={{ pageSize: tableObj.pageSize, total: tableObj.total }} scroll={{ y: 540 }} onChange={onChange} loading={loading} />,
  </>
}
export default FormDemo;