import React, { useEffect, useState } from "react"
import Echarts from "@components/Echarts"
import { Button, Col, Divider, Image, Input, Row } from "antd"
import "./index.scss"
import { getRequestData } from "../../../services/server"
import dimension from "../../../assets/images/backHome/dimension.png"
import user from "../../../assets/images/backHome/roleManage.png"
import chart from "../../../assets/images/backHome/chart.png"
import { randomColors } from "../../../utils/utils"
import BasicWrapper from "@components/BasicWrapper"
import BoxOne from "./component/BoxOne"

function compare(property) {
    //对新的数据进行排序
    return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
    }
}

export const BackHome = () => {
    const [list, setList] = useState([])

    let stage, textStage, form, input
    let circles, textPixels, textFormed
    let offsetX, offsetY, text
    let colors = ["#B2949D", "#FFF578", "#FF5F8D", "#37A9CC", "#188EB2"]

    useEffect(() => {
        // getRequestData(`services/v1/auth/adminList`).then(res =>{
        //     if(res.data) {
        //         setList(res.data)
        //     }
        // })
    }, [])

    useEffect(() => {
        // const canvas = document.getElementById("myCanvas")
        // const ctx = canvas.getContext("2d")
        offsetX = (window.innerWidth - 600) / 2
        offsetY = (window.innerHeight - 300) / 2
        // textStage = new createjs.Stage('text')
        // textStage.canvas.width = 600;
        // textStage.canvas.height = 200;

        // stage = new createjs.Stage("stage");
        // stage.canvas.width = window.innerWidth;
        // stage.canvas.height = window.innerHeight;
    }, [])

    const listEcharts = {
        option: {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "Direct",
                    type: "bar",
                    barWidth: "60%",
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
    }

    const echartsOne = {
        option: {
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: "line"
                }
            ]
        }
    }

    const orderEcharts = {
        option: {
            tooltip: {
                trigger: "item"
            },
            legend: {
                type: "scroll",
                orient: "vertical",
                right: 10,
                top: 20,
                bottom: 20
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: ["40%", "70%"],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: "#fff",
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: "center"
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: "bold"
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: "Search Engine" },
                        { value: 735, name: "Direct" },
                        { value: 580, name: "Email" },
                        { value: 484, name: "Union Ads" },
                        { value: 300, name: "Video Ads" }
                    ]
                }
            ]
        }
    }

    return (
        <div className={"home-container"}>
            <Row>
                <div className={"container-up"}>
                    <BasicWrapper title={"项目统计"} basicStyle={""}>
                        <Echarts option={listEcharts}></Echarts>
                    </BasicWrapper>
                    <BasicWrapper title={"订单统计"} basicStyle={""}>
                        <div className="cards">
                            <input type="radio" name="select" id="slide_1" checked />
                            <input type="radio" name="select" id="slide_2" />
                            <input type="radio" name="select" id="slide_3" />
                            <input type="checkbox" id="slideImg" />

                            <div className="slider">
                                <label for="slide_1" className="slide slide_1"></label>
                                <label for="slide_2" className="slide slide_2"></label>
                                <label for="slide_3" className="slide slide_3"></label>
                            </div>

                            <div className="inner_part">
                                <label for="slideImg" className="img">
                                    <img
                                        className="img_1"
                                        src="https://c4.wallpaperflare.com/wallpaper/978/131/617/kiz-kulesi-turkey-istanbul-maiden-s-tower-wallpaper-preview.jpg"
                                    />
                                </label>
                                <div className="content content_1">
                                    <div className="title">İstanbul</div>
                                    <div className="text">
                                        Istanbul, a fascinating city built on
                                        two Continents, divided by the Bosphorus
                                        Strait. This is one of the greatest
                                        cities in the world.
                                    </div>
                                    <button>Read More</button>
                                </div>
                            </div>

                            <div className="inner_part">
                                <label for="slideImg" className="img">
                                    <img
                                        className="img_2"
                                        src="https://c4.wallpaperflare.com/wallpaper/649/96/56/ankara-cityscape-night-night-sky-wallpaper-preview.jpg"
                                    />
                                </label>
                                <div className="content content_2">
                                    <div className="title">Ankara</div>
                                    <div className="text">
                                        Ankara is Turkey's beating heart, second
                                        largest city, located in the Central
                                        Anatolia region and home to the Grand
                                        National Assembly of Turkey.
                                    </div>
                                    <button>Read More</button>
                                </div>
                            </div>

                            <div className="inner_part">
                                <label for="slideImg" className="img">
                                    <img className="img_3" src="https://c4.wallpaperflare.com/wallpaper/620/34/558/turkey-izmir-mountains-wallpaper-preview.jpg" />
                                </label>
                                <div className="content content_3">
                                    <div className="title">İzmir</div>
                                    <div className="text">
                                        Located on the shores of the Aegean Sea,
                                        west of the Anatolian Peninsula, İzmir
                                        is the third-largest city in Turkey.
                                    </div>
                                    <button>Read More</button>
                                </div>
                            </div>
                        </div>
                    </BasicWrapper>
                    <BasicWrapper
                        title={"消费概览"}
                        basicStyle={""}
                    ></BasicWrapper>
                </div>
            </Row>

            <Row>
                <div className={"container-down"}>
                    <BasicWrapper title={"快捷菜单"} basicStyle={""}>
                        {/*                       <canvas id="text" width={500} height={100}></canvas>
                        <canvas id="stage" width={500} height={100}></canvas>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                        >
                            <Input style={{ width: 200, marginRight: 15 }} />
                            <Button>try it</Button>
                        </div> */}
                        <div className="card">
                            <Image
                                className="App-logo"
                                src={chart}
                                preview={false}
                            />
                            <div className="header">
                                <center>
                                    <span className="welcometo">
                                        Welcome to
                                    </span>
                                    <br></br>
                                    <span className="python">AiFour</span>
                                </center>
                            </div>
                            <button className="App-button">
                                Start learning now
                            </button>
                        </div>
                    </BasicWrapper>
                </div>
            </Row>
        </div>
    )
}
