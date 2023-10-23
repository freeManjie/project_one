import React, {useRef, useState} from "react";
import {Button, Modal, Table} from "antd";
import RoleModal from "./RoleModal.jsx";
import {getRequestData, postDataRequest, postRequestData} from "../../../../services/server";
import ProTable from "@ant-design/pro-table";
import moment from "moment/moment";
export const RoleList = (props) => {
    const { showModal, setShowModal, setRoleList } = props
    const actionRef = useRef()
    const [showRole, setShowRole] = useState(false)
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
    const [roleTitle, setRoleTitle] = useState('')
    const [roleRecord, setRoleRecord] = useState()

    const columns = [
        {
            title: '角色',
            dataIndex: 'role_name',
        },
        {
            title: '角色金额倍数',
            dataIndex: 'role_multiple',
        },
        {
            title: '操作',
            key: 'action',
            hideInSearch: true,
            render: (value, record) => <span className={'opera-span'} onClick={() => editRole(record)}>编辑</span>
        },
    ]

    const editRole = (record) => {
        setRoleTitle('编辑角色')
        setShowRole(true)
        setRoleRecord(record)
    }

    const getRoleList = async (params, sort, filter) => {
        let tableResult = null
        const requestParams = {
            role_name: params.role_name,
            role_multiple: params.role_multiple,
            pageNo: params.current,
            pageSize: params.pageSize,
        }
        const result = await postRequestData(`services/v1/auth/roleList`, requestParams)
        setRoleList(result.data)
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

    const roleProps = { showModal: showRole, setShowModal: setShowRole, actionRef: actionRef, roleTitle, roleRecord }

    return (
        <>
            <Modal
                title={'角色配置'}
                visible={showModal}
                onCancel={() => {
                    setShowModal(false)
                }}
                centered
                footer={null}
                width={1000}>
                <ProTable
                    actionRef={actionRef}
                    columns={ columns }
                    pagination={{ ...pagination, ...pageSize}}
                    search={{
                        // span: 8,
                        labelWidth: 'auto',
                        optionRender: (searchConfig, formProps, dom) => [...dom.reverse(),
                            <Button onClick={() => {
                                setShowRole(true)
                                setRoleTitle('创建角色')
                            }} size={'middle'} type={'primary'} style={{ margin: '0 5px 0 5px' }}>创建角色</Button>]
                    }}
                    rowSelection={false}
                    request={(params, sort, filter) => getRoleList({ ...params }, sort, filter) }
                    tableAlertOptionRender={false}
                    options={ false }/>
            </Modal>

            <RoleModal { ...roleProps } />
        </>
    )
}