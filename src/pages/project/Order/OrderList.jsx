import React, {useRef, useState, useReducer} from "react";
import ProTable from "@ant-design/pro-table";
import {Button, DatePicker, Descriptions} from "antd";
import {getRequestData, postDataRequest} from "../../../services/server";
import CreateOrder from "./component/CreateOrder.jsx";

const { RangePicker } = DatePicker
const OrderList = () => {
    const actionRef = useRef()
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
    const [showOrder, setShowOrder] = useState(false)

    const headerButton = [
        <div>
            <Button onClick={() => setShowOrder(true)} type="primary">创建订单</Button>
            <Button style={{ margin: '0 10px 0 10px' }}>批量创建</Button>
            <Button type="primary" danger>批量删除</Button>
        </div>
    ]

    const columns = [
        {
            title: '课程名称',
            dataIndex: 'courseName',
            order: 5,
        },
        {
            title: '用户',
            dataIndex: 'username',
            hideInSearch: true,
        },
        {
            title: '账号',
            dataIndex: 'account',
            order: 3,
        },
        {
            title: '密码',
            dataIndex: 'password',
            hideInSearch: true,
        },
        {
            title: '课程备注',
            dataIndex: 'courseRemark',
            hideInSearch: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            order: 2,
        },
        {
            title: '进度',
            dataIndex: 'progress',
            hideInSearch: true,
        },
        {
            title: '其他备注',
            dataIndex: 'otherRemark',
            hideInSearch: true,
        },
        {
            title: '完成提醒',
            dataIndex: 'complete',
            hideInSearch: true,
        },
        {
            title: '消费',
            dataIndex: '',
            hideInSearch: true,
        },
        {
            title: '登陆数',
            dataIndex: 'quantity',
            hideInSearch: true,
        },
        {
            title: '添加人',
            dataIndex: '',
            hideInSearch: true,
        },
        {
            title: '添加时间',
            dataIndex: 'addDate',
            renderFormItem: (_, record) => <RangePicker/>,
            order: 1,
        },
        {
            title: '操作',
            key: 'action',
            hideInSearch: true,
        },
    ]

    const getTableList = async (params, sort, filter) => {
        let tableResult = null
        const requestParams = {
            username: 'admin',

        }
        const result = await getRequestData(`api/`,)
        tableResult = {
            success: true,
            data: result || [],
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

    const addProps = {showModal: showOrder, setShowModal: setShowOrder, }

    return (
        <div className={'common-content'}>
            <ProTable
            columns={columns}
            search={{
                span: 4,
                labelWidth: 'auto',
                optionRender: (searchConfig, formProps, dom) => [...dom.reverse()]
            }}
            pagination={{ ...pagination, ...pageSize}}
            // request={(params, sort, filter) => getTableList({ ...params }, sort, filter) }
            headerTitle={headerButton}
            rowSelection={{}}
            options={false}
            tableAlertRender={false}/>

            <CreateOrder { ...addProps } />
        </div>
    )
}

export default  OrderList