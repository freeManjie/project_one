import React from "react";

//订单状态
export const orderStatus = {
    complete: { test: '完成', color: '#52c41a' }
}

export const userStatus = {
    0: { text: '管理员', color: '#52c41a' },
    1: { text: '正常', color: '#52c41a' },
    2: { text: '禁用', color: '#ff4d4f' },
}

export const projectStatus = {
    1: { text: '上架', color: '52c41a' },
    0: { text: '未上架', color: '#d9d9d9' }
}

export const getStatusView = (statusMap, status) => {
    return statusMap[status] ?
        <span style={{ color: `${statusMap[status].color}` }} >{statusMap[status].text}</span> : '-'
}

export const getStatusEnum = (statusMap) => {
    const result = {}
    Object.keys(statusMap).map(x => {
        result[x] = { text: <div style={{ color: `${statusMap[x].color}`, fontSize: "1em" }} >{statusMap[x].text}</div> }
    })
    return result
}