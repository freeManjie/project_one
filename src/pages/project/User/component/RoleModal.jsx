import React, {useEffect} from "react";
import {Form, Input, InputNumber, message, Modal} from "antd";
import {postRequestData} from "../../../../services/server";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

const RoleModal = (props) => {
    const { showModal, setShowModal, actionRef, roleTitle, roleRecord } = props
    const [roleForm] = Form.useForm()
    useEffect(() => {
        roleForm.setFieldsValue({ ...roleRecord })
    },[roleRecord])

    const closeModal = () => {
        setShowModal(false)
        roleForm.resetFields()
        actionRef?.current.reload()
    }

    const onFinish = async (values) => {
        let params = { ...values }
        postRequestData(`services/v1/auth/roleHandle`, params).then(res => {
            if(res) {
                message.success('创建成功')
                closeModal()
            } else {
                message.warn('创建失败')
            }
        })
    }

    return (
        <Modal
        title={roleTitle}
        visible={showModal}
        onCancel={closeModal}
        onOk={() => {
            roleForm.validateFields().then(values => {
                onFinish(values)
            })
        }}
         centered>
            <Form form={ roleForm } {...layout}>
                <Form.Item label={'角色名称'} name={'role_name'}>
                    <Input />
                </Form.Item>
                <Form.Item label={'角色金额倍数'} name={'role_multiple'}>
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RoleModal