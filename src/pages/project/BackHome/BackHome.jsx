import React from "react";
import Echarts from "@components/Echarts";
import {Col, Row} from "antd";
import './index.scss'
export const BackHome = () => {

    const echartsBlock = () => {
        const option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
        }
        return <Echarts option={option} />
    }

    const echartsOne = () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
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
        };

        return <Echarts option={option}/>
    }

    return (
        <div className={'common-content homePreview'}>
            <div className={'homeContent'}>
                <Row gutter={[48, 48]}>
                    <Col span={12}>
                        <div className={'echarts_one'}>
                            {echartsBlock()}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={''}>
                            {echartsOne()}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={''}>
                            {echartsBlock()}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={''}>
                            {echartsOne()}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={'homeFooter'}></div>
        </div>
    )
}