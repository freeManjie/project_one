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
import BoxOne from "./component/BoxOne";

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

    useEffect(() => {
        const canvas = document.getElementById("canvas-one");
        const rectCanvas = document.getElementById("rectCanvas")
        const ctxRect = rectCanvas.getContext("2d")
        const ctx = canvas.getContext("2d");
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.moveTo(100,100);
        ctx.lineTo(200,200);
        ctx.lineTo(100,200);
        ctx.strokeStyle = "#3AF4DC"
        ctx.fillStyle = "#1890ff"

        ctx.lineWidth = 3 
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.setLineDash([15, 5]);

        ctx.fill()
        ctx.stroke();

        ctxRect.rect(50, 50, 60, 60)
        ctxRect.fill()

    }, [])

    const listEcharts = {
        option: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
    }

    const echartsOne = {
        option: {
            xAxis: {
                type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        }
    }

    const orderEcharts = {
        option: {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        }
    }

    return (
        <div className={"home-container"}>
            <div className={"container-up"}>
                <BasicWrapper title={"项目统计"} basicStyle={""}>
                    <Echarts option={ listEcharts }></Echarts>
                </BasicWrapper>
                <BasicWrapper title={"订单统计"} basicStyle={""}>
                    <Echarts option={ orderEcharts }></Echarts>
                </BasicWrapper>
                <BasicWrapper title={"消费概览"} basicStyle={"basic-echarts-wrap"}>
                    <Echarts option={ echartsOne }></Echarts>
                </BasicWrapper>
            </div>
            <div className={"container-down"}>
                <BasicWrapper title={"快捷菜单"} basicStyle={""}>
                    <canvas id={"canvas-one"} width={800} height={400} style={{ border: "1px solid #efefef", cursor: "pointer", margin:"0 auto", display: "block" }}>您的浏览器不支持 Canvas</canvas>
                    <canvas id={"rectCanvas"} width={400} height={240}>您的浏览器不支持 Canvas</canvas>
                </BasicWrapper>
            </div>
        </div>
    )
}