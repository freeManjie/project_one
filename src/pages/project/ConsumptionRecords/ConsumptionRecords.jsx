import React, {useRef, useState} from 'react'
import ProTable from "@ant-design/pro-table";
import moment from "moment/moment";
import {postDataRequest} from "@server/server";
const ConsumptionRecords = () => {
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

    const columns = [
        {

        }
    ]

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

    return (
        <div className={'common-content'}>
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
                rowSelection={false}
                request={(params, sort, filter) => getTableList({ ...params }, sort, filter) }
                // headerTitle={adminHeaderButton}
                tableAlertOptionRender={false}
                options={ false }/>
        </div>
    )
}
export default ConsumptionRecords