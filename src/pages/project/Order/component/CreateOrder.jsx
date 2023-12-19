import React, {useEffect, useState} from "react";
import {Form, Input, Modal, Row, Select, Col, message, Card, Checkbox, Descriptions} from "antd";
import {postRequestData} from "@server/server";
import "./index.scss"

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const { TextArea } = Input

const orderConfigOptions = [
    {
        label: '提交后不立即运行',
        value: '1',
    },
    {
        label: '完成或异常时推送消息',
        value: '2',
    },
]
const CreateOrder = (props) => {
    const { showModal, setShowModal } = props
    const [orderForm] = Form.useForm()
    const [projectList, setProjectList] = useState([])
    const [checkValues, setCheckValues] = useState([])

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

    const selectCurse = (item) => {
        console.info(item)
    }

    const saveConfig = () =>{

    }

    const checkoutChange = (checkValue) =>{
        setCheckValues(checkValue)
    }

    return (
        <>
            <Modal
            title={'添加订单'}
            open={showModal}
            onCancel={closeModal}
            onOk={() => {
                orderForm.validateFields().then(values => {
                   onFinish(values)
                })
            }}
            width={1200}
            centered>
                <Row>
                    <Col span={12}>
                        <Form form={orderForm} {...layout}>
                            <Form.Item label={'课程名称'} name={'id'}>
                                <Select onSelect={ selectCurse }>
                                    {projectList?.map(item => <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'账号'} name={'buy_username'}>
                                <Input style={{}} allowClear/>
                            </Form.Item>
                            <Form.Item label={'密码'} name={'buy_password'}>
                                <Input style={{}} allowClear/>
                            </Form.Item>
                            {<Form.Item label={'课程备注'} name={'course_remark'}>
                                <TextArea rows={4} allowClear/>
                            </Form.Item>}
                            {<Form.Item label={'其他备注'} name={'remark'}>
                                <TextArea rows={2} allowClear/>
                            </Form.Item>}
                        </Form>
                    </Col>
                    <Col span={12}>
                        <div className={"config-wrap"}>
                            <div className={"config-check"}>
                                <Card title={"配置项目"} extra={<a onClick={ saveConfig }>保存配置</a>}>
                                    <Checkbox.Group options={ orderConfigOptions } onChange={ checkoutChange } />
                                </Card>
                            </div>
                            <div className={"config-des"}>
                                <Descriptions bordered column={1}>
                                    <Descriptions.Item label={"备注方式"} contentStyle={{ color: 'orange' }}>{}</Descriptions.Item>
                                    <Descriptions.Item label={"单价"} contentStyle={{ color: '' }}>{}</Descriptions.Item>
                                    <Descriptions.Item label={"地址"} contentStyle={{ color: '' }}>{}</Descriptions.Item>
                                    <Descriptions.Item label={"视频/考试"}>{}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default CreateOrder