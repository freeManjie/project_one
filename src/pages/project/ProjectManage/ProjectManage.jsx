import React, { useState, useRef, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import {getRequestData, postRequestData} from "../../../services/server";

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
    })
    const [pageSize, setPageSize] = useState({ pageSize: 50, pageNum: 1 })

    const columns = [
        {
            title: '序号',
            dataIndex: '',
            hideInSearch: true,
            width: 52,
        },
        {
            title: '网站',
            dataIndex: '',
            hideInSearch: true,
        },
        {
            title: '项目名称',
            dataIndex: 'projectName',
        },
        {
            title: '单价',
            dataIndex: 'unitPrice',
            hideInSearch: true,
        },
        {
            title: '视频',
            dataIndex: 'video',
            hideInSearch: true,
        },
        {
            title: '考试',
            dataIndex: 'test',
            hideInSearch: true,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            hideInSearch: true,
            render: (_, record) => <>
                <span className={''}>上架</span>
                <span className={''} onClick={() => detailProject(record)}>详情</span>
            </>
        },
    ]

    const projectOn = async (record) => {

    }

    const detailProject = (record) => {

    }

    const getTableList = async (params, sort, filter) => {
        let tableResult = null
        const requestParams = {
            username: params.username,
            state: params.state,
            pageNo: params.current,
            pageSize: params.pageSize,
        }
        const result = await postRequestData(`services/v1/project/projectList`, requestParams).then(res => {

        })
        tableResult = {
            success: true,
            data: result || [],
            total: result.total,
        }
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
                pagination={{...pagination, ...pageSize}}
                tableAlertRender={false}/>
        </div>
    )
}

export default ProjectManage