import React, {useEffect, useState} from "react";
import Echarts from "@components/Echarts";
import {Col, Divider, Image, Row} from "antd";
import './index.scss'
import {getRequestData} from "../../../services/server";
import dimension from "../../../assets/images/backHome/dimension.png"
import user from "../../../assets/images/backHome/roleManage.png"
import chart from "../../../assets/images/backHome/chart.png"
import form from "../../../assets/images/backHome/form.png"

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
        return <div>
            <Echarts option={option}/>
        </div>
    }

    return (
        <div className={'common-content homePreview'}>
            <div className={'homeContent'}>
                <div className={'headerTop'}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <div className={'box-item'}>
                                <Image className={'box-img'} src={dimension} preview={false}/>
                                <h1>项目管理</h1>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={'box-item'}>
                                <Image src={form} preview={false}/>
                                <h1>订单管理</h1>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={'box-item'}>
                                <Image src={chart} preview={false}/>
                                <h1>消费记录</h1>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={'box-item'}>
                                <Image src={user} preview={false}/>
                                <h1>用户列表</h1>
                            </div>
                        </Col>
                    </Row>
                </div>

                <Divider orientation="left" plain>
                    <h1 style={{color: '#03a9f4'}}>AiForu</h1>
                </Divider>
            </div>

            <div className={'homeFooter'}>
                <div className={'box-echarts'}>
                    {echartsBlock()}
                </div>
                {/*<div className={'box-echarts'}>*/}
                {/*    {echartsBlock()}*/}
                {/*</div>*/}
            </div>
        </div>
    )
}