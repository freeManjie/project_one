import React, {useEffect} from "react";
import {Form, message, Modal, Select} from "antd";
import {patchRequestData, postRequestData} from "../../../../services/server";
import { Input, InputNumber } from "antd";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

const { TextArea } = Input

const EditUser = (props) => {
    const {showModal, setShowModal, editType, modalTitle, userRecord, actionRef } = props
    const [form] = Form.useForm()

    useEffect(() => {
        if(!showModal) {
            form.resetFields()
        }
        console.log(userRecord)
        editType == 'edit' && form.setFieldsValue({ ...userRecord })
    }, [showModal])

    const onFinish = (values) => {
        let params = {
            ...values,
            uid: userRecord?.id,
        }
        if(editType == 'edit') {
            patchRequestData(`services/v1/auth/adminHandle`, params).then(res => {
                if(res) {
                    message.success('编辑成功')
                    actionRef?.current?.reload()
                    setShowModal(false)
                }
            }).catch(err => {
                message.warn(err)
            })
        } else {
            postRequestData(`services/v1/auth/adminHandle`, params).then(res => {
                if(res) {
                    message.success('充值成功')
                    actionRef?.current?.reload()
                    setShowModal(false)
                }
            })
        }
    }

    return (
        <Modal
        title={modalTitle}
        visible={showModal}
        onCancel={() => {
            setShowModal(false)
        }}
        onOk={() => {
            form.validateFields().then(values => {
                onFinish(values)
            })
        }}
        centered
        maskClosable={false}
        >
            <Form form={form} {...layout}>
                {editType == 'edit' ? <>
                    <Form.Item label={'等级'} name={'level'} rules={[{ required: true, message: '请输入等级' }]}>
                        <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label={'状态'} name={'state'} rules={[{ required: true, message: '请选择状态' }]}>
                        <Select>
                            <Option value={0}>管理员</Option>
                            <Option value={1}>正常</Option>
                            <Option value={2}>禁用</Option>
                        </Select>
                    </Form.Item>
                </> :
                <>
                    <Form.Item label={'充值金额'} name={'money'} rules={[{ required: true, message: '请输入充值金额' }]}>
                        <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label={'备注'} name={'remarks'} rules={[{ required: true, message: '请输入充值备注' }]}>
                        <TextArea />
                    </Form.Item>
                </>}
            </Form>
        </Modal>
    )
}
export default EditUser