import React, {useEffect, useRef, useState} from 'react'
import ProTable from "@ant-design/pro-table";
import {getRequestData, deleteRequestData, postDataRequest} from "../../../services/server";
import EditUser from "./component/EditUser.jsx";
import moment from 'moment'
import {Button, DatePicker, Descriptions, message, Modal, Select, Form} from "antd";
import {userStatus, getStatusView, projectStatus} from "../../../utils/status";
import {RoleList} from "./component/RoleList.jsx";

const dateFormat = 'YYYY-MM-DD'

const User = () => {
    const actionRef = useRef()
    const [showEdit, setShowEdit] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [showDetail, setShowDetail] = useState(false)
    const [pagination, setPagination] = useState({
        showSizeChanger: true,
        current: 1,
        total: 0,
        size: 'default',
        showQuickJumper: true,
        showTotal: () => {
            return `共 0 条记录 第 0 页`
        },
    })
    const [pageSize, setPageSize] = useState({ pageSize: 50, pageNum: 1 })
    const [editType, setEditType] = useState('')
    const [userRecord, setUserRecord] = useState()
    const [selectedRowKeys, setSelectedRowKeys] = useState([])//勾选用户id
    const [showRole, setShowRole] = useState(false)
    const [showRecharge, setShowRecharge] = useState(false)

    useEffect(() => {

    }, [])

    //头部按钮
    const adminHeaderButton = [
        <div>
            <Button onClick={() => deleteUser(selectedRowKeys, 1)} size={'middle'} disabled={selectedRowKeys.length ? false : true} type={'primary'} danger>批量删除</Button>
            <Button onClick={() => setShowRole(true)} size={'middle'} type={'primary'} style={{ margin: '0 5px 0 5px' }}>角色配置</Button>
            <Button size={'middle'} disabled={selectedRowKeys.length ? false : true} type={'primary'} style={{ margin: '0 5px 0 5px' }}>批量设置角色</Button>
        </div>
    ]

    const columns = [
        {
            title: '用户姓名',
            dataIndex: 'name',
            hideInSearch: true,
        },
        {
            title: '账号',
            dataIndex: 'username',
            // hideInSearch: true,
            order: 1,
            filedProps: {
                placeholder: '请输入用户昵称'
            }
        },
        {
            title: '邮箱',
            dataIndex: 'mail',
            hideInSearch: true,
        },
        {
            title: '余额(元)',
            dataIndex: 'money',
            hideInSearch: true,
        },
        {
            title: '等级',
            dataIndex: 'level',
            hideInSearch: true,
        },
        {
            title: '角色',
            dataIndex: 'role_name',
            hideInSearch: true,
        },
        {
            title: '角色金额倍数',
            dataIndex: 'role_multiple',
            hideInSearch: true,
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: (value, record) => <span>{getStatusView(userStatus, value)}</span>,
            renderFormItem: () => (
                <Select style={{ width: '100%' }} placeholder='请选择状态' allowClear>
                    {Object.keys(userStatus).map((x, index) => <Option key={index} value={x}>{userStatus[x].text}</Option>)}
                </Select>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'create_at',
            // valueType: 'dateRange',
            render: (value, record) => <span>{value}</span>,
            renderFormItem: () => <DatePicker.RangePicker />
            // hideInSearch: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            hideInSearch: true,
            render: (_, record) => <>
                <span className={'opera-span'} onClick={() => editUser(record)}>编辑</span>
                <span className={'opera-span'} style={{ color: 'yellowgreen' }} onClick={() => rechargeUser(record)}>充值</span>
                <span className={'opera-span'} style={{ color: 'red' }} onClick={() => deleteUser([record.id], 0)}>删除</span>
                <span className={'opera-span'} onClick={() => userDetail(record)}>详情</span>
            </>,
        },
    ]

    const editUser = (record) => {//编辑用户
        const name = <span style={{ color: '#03a9f4' }}>{record.name}</span>
        setModalTitle(`编辑用户${record.name}`)
        setEditType('edit')
        setShowEdit(true)
        setUserRecord(record)
    }

    const detailModal = (record) => {
        Modal.success({
            title: '用户详情',
            content: ''
        });
    }

    const userDetail = async (record) => {//用户详情
        getRequestData(`services/v1/auth/adminHandle?uid=${record.id}`).then(res => {
            if(res) {
                detailModal(res.data)
            }
        })
    }
    //批量配置用户角色

    const rechargeUser = (record) => {
        setModalTitle('用户充值')
        setEditType('recharge')
        setShowRecharge(true)
        setUserRecord(record)
    }

    const rowSelection = {
        type: "checkbox",
        selectedRowKeys,
        preserveSelectedRowKeys: true,
        onChange: (record, selected, selectedRows, nativeEvent) => {
            setSelectedRowKeys(record)
        },
    }

    //删除/批量删除用户
    const deleteUser = async (ids, type) => {
        let params = {
            ids: ids
        }
        deleteRequestData(`services/v1/auth/adminHandle`, params).then(res => {
            if(res) {
                actionRef?.current?.reload()
                message.success('删除成功')
            } else {
                message.warn('删除失败')
            }
        })
    }

    const getTableList = async (params, sort, filter) => {
        let tableResult = null
        const requestParams = {
            username: params.username,
            state: params.state && Number(params.state),
            name: params.name,
            start_date: params.create_at && moment(params.create_at[0]).format(dateFormat),
            end_date: params.create_at && moment(params.create_at[1]).format(dateFormat),
            pageNo: params.current,
            pageSize: params.pageSize,
        }
        const result = await postDataRequest(`api/v1/auth/adminList`, requestParams)
        tableResult = {
            success: true,
            data: result.data || [],
            total: result.meta.total,
        }
        const paginationData = {
            showSizeChanger: true,
            current: Math.ceil(result?.data / pageSize.pageSize + result.meta.total / pageSize.pageSize),
            total: result.meta.total || 0,
            size: 'default',
            showQuickJumper: true,
            showTotal: (total, range) => (<span>{`共${total}条记录 第${Math.ceil(range[0] / pageSize.pageSize) || 0} 页`}</span>),
            onShowSizeChange: (current, size) => {
                setPageSize({ pageSize: size })
            },
        }
        setPagination(paginationData)
        return tableResult
    }

    const editProps = { showModal: showEdit, setShowModal: setShowEdit, modalTitle, editType, userRecord, actionRef: actionRef }
    const roleProps = { showModal: showRole, setShowModal: setShowRole }
    const rechargeProps = { showModal: showRecharge, setShowModal: setShowRecharge, modalTitle, editType, userRecord, actionRef: actionRef }

    return (
        <>
            <div className={'common-content '}>
                <ProTable
                    rowKey={record => record.id}
                    actionRef={actionRef}
                    columns={columns}
                    pagination={{ ...pagination, ...pageSize}}
                    search={{
                        span: 6,
                        labelWidth: 'auto',
                        optionRender: (searchConfig, formProps, dom) => [...dom.reverse()]
                    }}
                    rowSelection={rowSelection}
                    request={(params, sort, filter) => getTableList({ ...params }, sort, filter) }
                    headerTitle={adminHeaderButton}
                    tableAlertOptionRender={false}
                    options={ false }/>
            </div>

            <Modal>
                <Form>
                    <Form.Item label={'角色'} name={''}>
                        <Select></Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 编辑用户 */}
            {showEdit && <EditUser { ...editProps } />}
            {showRecharge && <EditUser { ...rechargeProps } />}
            <RoleList { ...roleProps } />
        </>
    )
}

export default User