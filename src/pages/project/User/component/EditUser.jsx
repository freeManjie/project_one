import React, {useEffect} from "react";
import {Form, message, Modal} from "antd";
import {patchRequestData, postRequestData} from "../../../../services/server";
import { Input, InputNumber } from "antd";

const { TextArea } = Input

const EditUser = (props) => {
    const {showModal, setShowModal, editType} = props
    const [form] = Form.useForm()

    useEffect(() => {
        if(!showModal) {
            form.resetFields()
        }
    }, [showModal])

    const onFinish = (values) => {
        let params = {
            ...values,
        }
        if(editType == 'edit') {
            patchRequestData(`services/v1/auth/adminHandle`, params).then(res => {
                if(res) {
                    message.success('编辑成功')
                    setShowModal(false)
                }
            }).catch(err => {
                message.warn(err)
            })
        } else {
            postRequestData(`services/v1/auth/adminHandle`, params).then(res => {
                if(res) {
                    message.success('充值成功')
                    setShowModal(false)
                }
            })
        }
    }

    return (
        <Modal
        visible={showModal}
        onCancel={() => {
            setShowModal(false)
        }}
        onOk={() => {
            form.validateFields().then(values => {
                onFinish(values)
            })
        }}
        footer={null}>
            <Form form={form}>
                {editType == 'edit' ? <>
                    <Form.Item label={'等级'} name={'level'}></Form.Item>
                    <Form.Item label={'状态'} name={'state'}></Form.Item>
                </> :
                <>
                    <Form.Item label={'充值金额'} name={'money'}></Form.Item>
                    <Form.Item label={'备注'} name={'remarks'}>
                        <TextArea />
                    </Form.Item>
                </>}
            </Form>
        </Modal>
    )
}
export default EditUser