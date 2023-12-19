import React, {useEffect, useState} from "react";
import Echarts from "@components/Echarts";
import {Col, Divider, Image, Row} from "antd";
import './index.scss'
import {getRequestData} from "../../../services/server";
import dimension from "../../../assets/images/backHome/dimension.png"
import user from "../../../assets/images/backHome/roleManage.png"
import chart from "../../../assets/images/backHome/chart.png"
import form from "../../../assets/images/backHome/form.png"
import {randomColors} from "../../../utils/utils";
import BasicWrapper from "@components/BasicWrapper";

function compare(property) {//对新的数据进行排序
    return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
    }
}

export const BackHome = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        // getRequestData(`services/v1/auth/adminList`).then(res =>{
        //     if(res.data) {
        //         setList(res.data)
        //     }
        // })
    }, [])

    return (
        <div className={"home-container"}>
            <div className={"container-up"}>
                <BasicWrapper title={"快捷菜单"}>
                </BasicWrapper>
                <BasicWrapper title={"快捷菜单"}>
                </BasicWrapper>
                <BasicWrapper title={"快捷菜单"}>
                </BasicWrapper>
            </div>
            <div className={"container-down"}>
                <BasicWrapper title={"快捷菜单"}>
                </BasicWrapper>
                <BasicWrapper title={"快捷菜单"}>
                </BasicWrapper>
                <BasicWrapper title={"快捷菜单"}>
                </BasicWrapper>
            </div>
        </div>
    )
}