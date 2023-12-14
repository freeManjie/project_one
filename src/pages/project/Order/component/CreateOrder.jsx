import React, {useEffect, useState} from "react";
import {Form, Input, Modal, Row, Select, Col, message} from "antd";
import {postRequestData} from "../../../../services/server";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

const { TextArea } = Input
const CreateOrder = (props) => {
    const { showModal, setShowModal } = props
    const [orderForm] = Form.useForm()
    const [projectList, setProjectList] = useState([])

    useEffect(() => {
        if(showModal) {
            getProjectList()
        }
    }, [showModal])

    const getProjectList = () => {
        let params = {
            pageNo: 1,
            pageSize: 50
        }
        postRequestData(`services/v1/project/userProjectList`, params).then(res => {
            if(res) {
                setProjectList(res.data)
            }
        })
    }

    const closeModal = () => {
        setShowModal(false)
        orderForm.resetFields()
    }

    const onFinish = (values) => {
        let params = {
            ...values
        }
        postRequestData(`services/v1/project/userProjectHandle`, params).then(res => {
            if(res.code == 0) {
                message.success('下单成功')
                closeModal()
            } else if(res.code == -1) {
                message.warning(res.message)
            }
        })
    }

    return (
        <>
            <Modal
            title={'添加订单'}
            visible={showModal}
            onCancel={closeModal}
            onOk={() => {
                orderForm.validateFields().then(values => {
                   onFinish(values)
                })
            }}
            width={1200}
            centered>
                <Form form={orderForm} {...layout}>
                    <Row>
                        <Col span={12}>
                            <Form.Item label={'课程名称'} name={'id'}>
                                <Select>
                                    {projectList?.map(item => <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'账号'} name={'buy_username'}>
                                <Input style={{}}/>
                            </Form.Item>
                            <Form.Item label={'密码'} name={'buy_password'}>
                                <Input style={{}}/>
                            </Form.Item>
                            {<Form.Item label={'课程备注'} name={'course_remark'}>
                                <TextArea rows={4}/>
                            </Form.Item>}
                            {<Form.Item label={'其他备注'} name={'remark'}>
                                <TextArea/>
                            </Form.Item>}
                        </Col>
                        <Col span={12}></Col>
                    </Row>

                </Form>
            </Modal>
        </>
    )
}

export default CreateOrder