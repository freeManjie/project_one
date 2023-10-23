import React, { useState, useRef, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import {getRequestData, postRequestData, putRequestData} from "../../../services/server";
import {getStatusView, projectStatus} from "../../../utils/status";
import {message, Select} from "antd";

const ProjectManage = () => {
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
        onShowSizeChange:() =>{}
    })
    const [pageSize, setPageSize] = useState({ pageSize: 50, pageNum: 1 })

    const columns = [
        {
            title: '序号',
            dataIndex: '',
            hideInSearch: true,
            render: (_, record, index) => <span>{(pageSize.pageNum - 1) * pageSize.pageSize + (index + 1)}</span>,
            width: 52,
        },
        {
            title: '网站',
            dataIndex: 'url',
            render: (value) => <a onClick={() =>{ window.open(value) }}>{value}</a>,
            hideInSearch: true,
        },
        {
            title: '项目名称',
            dataIndex: 'name',
            render: (value) => <span className={'opera-span'} onClick={() => detailProject(record)}>{value}</span>
        },
        {
            title: '单价',
            dataIndex: 'price',
            width: 52,
            hideInSearch: true,
        },
        {
            title: '视频',
            dataIndex: 'video',
            width: 52,
            hideInSearch: true,
        },
        {
            title: '考试',
            dataIndex: 'test',
            width: 52,
            hideInSearch: true,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true,
            onCell: () => {
                return {
                    style: {
                        wordBreak: 'break-word'
                    }
                }
            },
        },
        {
            title: '状态',
            dataIndex: 'state',
            // hideInSearch: true,
            width: 60,
            render: (value) => <span>{getStatusView(projectStatus, value)}</span>,
            renderFormItem: () => (
                <Select style={{ width: '100%' }} placeholder='请选择状态' allowClear>
                    {Object.keys(projectStatus).map((x, index) => <Option key={index} value={x}>{projectStatus[x].text}</Option>)}
                </Select>
            ),
        },
        {
            title: '操作',
            dataIndex: 'action',
            hideInSearch: true,
            width: 100,
            render: (_, record) => <>
                <span onClick={() => projectOn(record)} className={'opera-span'}>{record.state ? '下架' : '上架'}</span>
                <span className={'opera-span'} onClick={() => detailProject(record)}>详情</span>
            </>
        },
    ]

    const projectOn = async (record) => {
        let params = {
            ids: [record.id],
            type: !record.state ? 1 : 0
        }
        await putRequestData(`services/v1/project/projectRefreshHandle`, params).then(res => {
            if(res) {
                actionRef?.current?.reload()
                message.success('')
            }
        })
    }

    const detailProject = (record) => {

    }

    const getTableList = async (params, sort, filter) => {
        let tableResult = null
        const requestParams = {
            name: params.name,
            state: params.state,
            pageNo: params.current,
            pageSize: params.pageSize,
        }
        const result = await postRequestData(`services/v1/project/projectRefreshHandle`, requestParams)
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
                setPageSize({ pageSize: size, pageNum: current })
            },
        }
        setPagination(paginationData)
        return tableResult
    }

    return (
        <div className={'common-content'}>
            <ProTable
                actionRef={actionRef}
                columns={columns}
                options={false}
                search={{
                    // span: 8,
                    labelWidth: 'auto',
                    optionRender: (searchConfig, formProps, dom) => [...dom.reverse()]
                }}
                scroll={{ y: 800 }}
                request={(params, sort, filter) => getTableList({ ...params }, sort, filter) }
                pagination={{...pagination, ...pageSize}}
                tableAlertRender={false}/>
        </div>
    )
}

export default ProjectManage