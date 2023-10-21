import React, { useState} from 'react'
import ProTable from "@ant-design/pro-table";
import {getRequestData, postRequestData, postDataRequest} from "../../../services/server";
import EditUser from "./component/EditUser.jsx";
import moment from 'moment'
import {Button} from "antd";

const timeFormat = 'YYYY-MM-DD hh:mm:ss'
const dateFormat = 'YYYY-MM-DD'

const User = () => {
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

    //头部按钮
    const adminHeaderButton = [
        <div>
            <Button size={'middle'} type={'primary'} danger>批量删除</Button>
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
            title: '状态',
            dataIndex: 'state',
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'create_at',
            render: (value, record) => <span>{moment(value).format(timeFormat)}</span>,
            hideInSearch: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            hideInSearch: true,
            render: (_, record) => <>
                <span className={''} onClick={() => editUser(record)}>编辑</span>
                <span className={''} onClick={() => userDetail(record)}>详情</span>
            </>,
        },
    ]

    const editUser = (record) => {//编辑用户
        setModalTitle('编辑用户信息')
        setEditType('edit')
        setShowEdit(true)
    }

    const userDetail = (record) => {//用户详情
        setModalTitle('用户详情')
        setShowDetail(true)
    }

    const rechargeUser = () => {
        setModalTitle('用户充值')
        setEditType('recharge')
        setShowEdit(true)
    }

    const getTableList = async (params, sort, filter) => {
        let tableResult = null
        const requestParams = {
            username: params.username,
            state: params.state,
            start_date: params.create_at && moment(params.create_at[0]).format(dateFormat),
            end_date: params.create_at && moment(params.create_at[1]).format(dateFormat),
            pageNo: params.current,
            pageSize: params.pageSize,
        }
        const result = await postDataRequest(`api/v1/auth/adminList`, requestParams)
        tableResult = {
            success: true,
            data: result.data || [],
            total: result.total,
        }
        const paginationData = {
            showSizeChanger: true,
            current: Math.ceil(result?.data / pageSize.pageSize + result?.total / pageSize.pageSize),
            total: result?.total || 0,
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

    const editProps = { showModal: showEdit, setShowModal: setShowEdit, modalTitle, editType }
    const detailProps = { showModal: showDetail, setShowModal: setShowDetail, modalTitle }

    return (
        <>
            <div className={'common-content '}>
                <ProTable
                    columns={ columns }
                    pagination={{ ...pagination, ...pageSize}}
                    search={{
                        span: 8,
                        labelWidth: 'auto',
                        optionRender: (searchConfig, formProps, dom) => [...dom.reverse()]
                    }}
                    // request={(params, sort, filter) => getTableList({ ...params }, sort, filter) }
                    headerTitle={adminHeaderButton}
                    tableAlertOptionRender={false}
                    options={ false }/>
            </div>

            {/* 编辑用户 */}
            {showEdit && <EditUser { ...editProps } />}
            {showDetail && <EditUser { ...detailProps } />}
        </>
    )
}

export default User