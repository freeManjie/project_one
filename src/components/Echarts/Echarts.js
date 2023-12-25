import React from "react";
import ECharts from 'echarts-for-react'
import * as echarts from 'echarts'

const Echarts = (props) => {
    const { option, style, onEvents } = props.option
    return (
        <ECharts option={option} style={style} onEvents={onEvents}></ECharts>
    )
}

export default Echarts