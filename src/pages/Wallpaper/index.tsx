
import React, { ReactText, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Tag, Space, Image, Button, Form, Input, Row, Col, DatePicker, Modal } from 'antd';
import styles from './index.less';
import AddImg from './modal/addImg'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const data:ITablecolumn[] = [
  {
    date: '202-02-02',
    source: 'biying',
    id: '990',
    tag: [],
    collection:10,
    fabulous:9,
    src: 'https://cn.bing.com/th?id=OHR.PLNP_ZH-CN8120863549_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=1920&h=1080&rs=1&c=4'

  },
  {
    date: '202-02-02',
    source: 'biying',
    id: '991',
    collection:10,
    fabulous:9,
    tag: [],
    src: 'https://cn.bing.com/th?id=OHR.PLNP_ZH-CN8120863549_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=1920&h=1080&rs=1&c=4'

  },
  {
    date: '202-02-02',
    source: 'biying',
    id: '992',
    collection:10,
    fabulous:9,
    tag: [],
    src: 'https://cn.bing.com/th?id=OHR.PLNP_ZH-CN8120863549_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=1920&h=1080&rs=1&c=4'

  },
  {
    date: '202-02-02',
    source: 'biying',
    id: '993',
    collection:10,
    fabulous:9,
    tag: [],
    src: 'https://cn.bing.com/th?id=OHR.PLNP_ZH-CN8120863549_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=1920&h=1080&rs=1&c=4'

  },
];
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'id',
  },
  {
    title: '来源',
    dataIndex: 'source',
    key: 'id',
  },
  {
    title: '图片',
    dataIndex: 'src',
    key: 'id',
    render: (src: string) => (<Image
      width={200}
      src={src}
    />)
  },
  {
    title: '标签',
    key: 'id',
    dataIndex: 'tag',
    render: (tags: string[]) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    render: (_text: string, record: ITablecolumn) => (
      <Space size="middle">
        <a>收藏数 {record.collection}</a>
        <a>点赞数 {record.fabulous}</a>
        <a onClick={() => deleteRow(record)}>删除</a>
      </Space>
    ),
  },
];
const { confirm } = Modal;
const { RangePicker } = DatePicker;
interface Iform{
  name:string;
  source:string;
  date: string;

}
interface ITableTool{
  onCreate:() => void;
  onBatchDeletion:() =>void
}
interface ITablecolumn{
  id:string;
  date:string;
  source:string;
  tag:string[];
  src:string;
  collection:number; // 收藏数
  fabulous:number; // 点赞数

}
// 表格顶部工具栏
const TableTool:React.FC<ITableTool> = (props) => {
  const [form] = Form.useForm<Iform>();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  // 搜索
  const sreach = (value:Iform) =>{
    console.log(1, value)
  }
  return (<div>

    <div>
      <Form
        form={form}
        className={styles.sreachForm}
        layout="inline"
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={sreach}

      >
        <Row className={styles.Row}>
          <Col span={6}>
            <Form.Item
              label="名称"
              name="name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>

            <Form.Item
              label="来源"
              name="source"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="日期"
              name="date"
            >
             <RangePicker format="YYYY-MM-DD"/>
            </Form.Item>
          </Col>
          <Col span={6} >
          <Form.Item className={styles.sreachSubmit}
          {...tailLayout}>
            <Button type="primary" className={styles['sreach-btn']} htmlType="submit">
              搜索
            </Button>
          </Form.Item>
          </Col>
        </Row>



      </Form>
    </div>
    <div className={styles['action-tool']}>
      <span>壁纸信息</span>
      <div  className={styles['action-btn-box']}>
       <Button type="primary"   className={styles['add-btn']} onClick={() => props.onCreate()}>新增图片</Button>
       <Button type="primary" onClick={() => props.onBatchDeletion()}>批量删除</Button>
      </div>
      
    </div>
  </div>)
}
// 删除行
const deleteRow = (row:ITablecolumn) => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    content: <div>确定删除 {row.id}</div>,
    onOk() {
      console.log('OK');
      console.log('删除单个行', row)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

const Wallpaper: React.FC<{}> = (prop) => {
  const [visible, setVisible] = useState(false) // 添加图片弹窗
  const [selectArr, setSelectArr] = useState<ITablecolumn[]>() // 选择数组
  // 批量删除
  function onBatchDeletion(){
    console.log('批量删除')
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <div>确定删除选中的10项</div>,
      onOk() {
        console.log('OK');
        console.log('确定删除所有', selectArr)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const rowSelection = {
    // 选择行数的回调
    onChange: (_selectedRowKeys:ReactText[], selectedRows:ITablecolumn[]) => {
      console.log( 'selectedRows: ', selectedRows);
      setSelectArr(selectedRows) 
    }
  };
  return (
    <PageContainer>
      <div >
        <div>
        <TableTool onCreate={() => setVisible(true)} onBatchDeletion={() => onBatchDeletion()}/>
        </div>
        <Table rowKey={(record) => record.id} columns={columns} dataSource={data} 
                rowSelection={{
                  ...rowSelection,
                }}/>
      </div>
      <AddImg visible={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}></AddImg>
    </PageContainer>

  );
};

export default Wallpaper

