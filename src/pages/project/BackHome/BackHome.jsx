import React from "react";
import Echarts from "@components/Echarts";
import {Col, Divider, Row} from "antd";
import './index.scss'

function genData(count) {
    // prettier-ignore
    const nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
    const legendData = [];
    const seriesData = [];
    for (var i = 0; i < count; i++) {
        var name =
            Math.random() > 0.65
                ? makeWord(4, 1) + '·' + makeWord(3, 0)
                : makeWord(2, 1);
        legendData.push(name);
        seriesData.push({
            name: name,
            value: Math.round(Math.random() * 100000)
        });
    }
    return {
        legendData: legendData,
        seriesData: seriesData
    };
    function makeWord(max, min) {
        const nameLen = Math.ceil(Math.random() * max + min);
        const name = [];
        for (var i = 0; i < nameLen; i++) {
            name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        }
        return name.join('');
    }
}
export const BackHome = () => {

    const echartsBlock = () => {
        const option = {
            title: {
                text: '消费人数',
                // subtext: '纯属虚构',
                left: 'right'
            },
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
        return <div className={'echartsBlock'}>
            <Echarts option={option} />
        </div>
    }

    const echartsOne = () => {
        const option = {
            title: {
                text: '消费人数',
                // subtext: '纯属虚构',
                left: 'right'
            },
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

        return <div className={'echartsBlock'}>
            <Echarts option={option} />
        </div>
    }

    const echartsTwo = () => {
        const data = genData(50)
        const option = {
            title: {
                text: '项目统计',
                // subtext: '纯属虚构',
                left: 'right'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: data.legendData
            },
            series: [
                {
                    name: '姓名',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: data.seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        return <div className={'echartsBlock'}>
            <Echarts option={option} />
        </div>
    }

    return (
        <div className={'common-content homePreview'}>
            <div className={'homeContent'}>
                <Row style={{ height: '50%' }}>
                    <Col span={12}>
                        <div>
                            {echartsBlock()}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            {echartsOne()}
                        </div>
                    </Col>
                </Row>
                <Row style={{ height: '50%' }}>
                    <Col span={12}>
                        <div className={''}>
                            {echartsTwo()}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={''}>
                            {echartsOne()}
                        </div>
                    </Col>
                </Row>
            </div>
            <Divider orientation="left" plain>
                <h1 style={{ color: '#03a9f4' }}>AiForu</h1>
            </Divider>
            <div className={'homeFooter'}>
            </div>
        </div>
    )
}