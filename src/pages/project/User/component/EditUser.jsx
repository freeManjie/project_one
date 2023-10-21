import React from "react";
import {Modal} from "antd";
import {ProForm, ProFormMoney, ProFormText} from "@ant-design/pro-components";

const EditUser = (props) => {
    const {showModal, setShowModal} = props

    const onFinish = (values) => {
        setShowModal(false)
    }

    return (
        <Modal
        visible={showModal}
        onCancel={() => {
            setShowModal(false)
        }}
        footer={null}>
            <ProForm
            onFinish={async (values) => {
                onFinish(values)
            }}
            onReset={() => {
                setShowModal(false)
            }}>
                <ProFormText
                name={'username'}
                label={'用户昵称'}
                width={'md'}
                placeholder={'请输入用户昵称'}
                rules={[{ required: true, message: '请输入用户昵称'}]}/>

                <ProFormText
                label={'邮箱'}
                name={'mail'}
                width={'md'}
                placeholder={'请输入邮箱'}
                />

                <ProFormMoney
                    label="账户余额"
                    name="money"
                    fieldProps={{ precision: 2 }}
                    customSymbol="💰"/>
            </ProForm>
        </Modal>
    )
}
export default EditUser