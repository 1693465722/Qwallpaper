import React, { useEffect } from "react"
import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

interface IProp {
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
}
interface ICreateForm {
    name:string;
    source:string
}
 const upFileProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const addImg: React.FC<IProp> = (prop) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    let [createForm] =  Form.useForm<ICreateForm>()

    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values:any) => {
        console.log('Success:', values);
        prop.onOk()
    };
    useEffect(() =>{
        if(prop.visible){
            createForm.setFieldsValue({
                name:'',
                source:''
            })
        }
    }, [prop.visible])
    return (
        <div>
            <Modal
                title="新增图片"
                visible={prop.visible}
                onOk={() => createForm.submit()}
                onCancel={prop.onCancel}
                okText="确认"
                cancelText="取消"
            >
                <Form
                    form = {createForm}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{ required: true, message: '请输入名称!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="来源"
                        name="source"
                        rules={[{ required: true, message: '请输入来源!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="图片"
                        name="imgSrc"
                        valuePropName="fileList"
                    >
                    <Upload {...upFileProps}>
                        <Button icon={<UploadOutlined />}>选择图片</Button>
                    </Upload>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}
export default addImg