import React, {useEffect, useState} from "react";
import Echarts from "@components/Echarts";
import {Col, Divider, Row} from "antd";
import './index.scss'
import {getRequestData} from "../../../services/server";

export const BackHome = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        getRequestData(`services/v1/auth/adminList`).then(res =>{
            if(res.data) {
                setList(res.data)
            }
        })
    }, [])

    const echartsBlock = () => {
        let xData = []
        let yData = []
        list?.map((item) => {
            xData.push(item.date)
            yData.push(item.count)
        })

        const option = {
            title: {
                text: '注册人数',
                // subtext: '纯属虚构',
                left: 'center'
            },
                xAxis: {
                    type: 'category',
                    data: xData,
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: yData,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
        }
        return <div className={'echartsBlock'}>
            <Echarts option={option} />
        </div>
    }

    return (
        <div className={'common-content homePreview'}>
            <div className={'homeContent'}>
            </div>
            <Divider orientation="left" plain>
                <h1 style={{ color: '#03a9f4' }}>AiForu</h1>
            </Divider>
            <div className={'homeFooter'}>
                <div>
                    {echartsBlock()}
                </div>
            </div>
        </div>
    )
}