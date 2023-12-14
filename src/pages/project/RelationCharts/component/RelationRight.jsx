import { randomColors } from "@utils/utils"
import React, { useEffect, useRef } from "react"
import RelationGraph from "relation-graph/react"
import "./index.scss"
import { Checkbox } from "antd"

const staticJsonData = {
    rootId: "2",
    nodes: [
        { id: "1", text: "节点-1", myicon: "el-icon-star-on" },
        { id: "2", text: "节点-2", myicon: "el-icon-setting" },
        { id: "3", text: "节点-3", myicon: "el-icon-setting" },
        { id: "4", text: "节点-4", myicon: "el-icon-star-on" },
        { id: "6", text: "节点-6", myicon: "el-icon-setting" },
        { id: "7", text: "节点-7", myicon: "el-icon-setting" },
        { id: "8", text: "节点-8", myicon: "el-icon-star-on" },
        { id: "9", text: "节点-9", myicon: "el-icon-headset" },
        { id: "71", text: "节点-71", myicon: "el-icon-headset" },
        { id: "72", text: "节点-72", myicon: "el-icon-s-tools" },
        { id: "73", text: "节点-73", myicon: "el-icon-star-on" },
        { id: "81", text: "节点-81", myicon: "el-icon-s-promotion" },
        { id: "82", text: "节点-82", myicon: "el-icon-s-promotion" },
        { id: "83", text: "节点-83", myicon: "el-icon-star-on" },
        { id: "84", text: "节点-84", myicon: "el-icon-s-promotion" },
        { id: "85", text: "节点-85", myicon: "el-icon-sunny" },
        { id: "91", text: "节点-91", myicon: "el-icon-sunny" },
        { id: "92", text: "节点-82", myicon: "el-icon-sunny" },
        { id: "5", text: "节点-5", myicon: "el-icon-sunny" }
    ],
    lines: [
        { from: "7", to: "71", text: "投资" },
        { from: "7", to: "72", text: "投资" },
        { from: "7", to: "73", text: "投资" },
        { from: "8", to: "81", text: "投资" },
        { from: "8", to: "82", text: "投资" },
        { from: "8", to: "83", text: "投资" },
        { from: "8", to: "84", text: "投资" },
        { from: "8", to: "85", text: "投资" },
        { from: "9", to: "91", text: "投资" },
        { from: "9", to: "92", text: "投资" },
        { from: "1", to: "2", text: "投资" },
        { from: "3", to: "1", text: "高管" },
        { from: "4", to: "2", text: "高管" },
        { from: "6", to: "2", text: "高管" },
        { from: "7", to: "2", text: "高管" },
        { from: "8", to: "2", text: "高管" },
        { from: "9", to: "2", text: "高管" },
        { from: "1", to: "5", text: "投资" }
    ]
}

const NodeSlot = ({ node }) => {
    return (
        <div
            style={{
                paddingTop: "20px",
                zIndex: 555,
                textAlign: "center",
                overflow: "hidden"
            }}
        >
            <span>{node.text}</span>
        </div>
    )
}

//数据处理
function formatData(data) {
    const nodes = []
    const lines = []
    const randomColor = randomColors()
    data.forEach((d) => {
        const { start, end, relation } = d
        const s = {
            id: start.people_id || start.org_id,
            text: start.name,
            color: randomColor,
            data: { ...start }
        }

        const e = {
            id: end.people_id || end.org_id,
            text: end.name,
            color: randomColor,
            data: { ...end }
        }
        const l = {
            from: s.id,
            to: e.id,
            text: relation.relation
        }
        nodes.push(s, e)
        lines.push(l)
    })
    return { nodes, lines }
}

const RelationRight = (props) => {
    const { relationData } = props
    const graphRef = useRef(RelationGraph)

    useEffect(() => {
        //首次加载图谱
        showGraph()
    }, [])

    const showGraph = async () => {
        let clickNodeId = {}
        // if (relationData.length <= 0) {
        //     return false
        // }
        // const { nodes, lines } = formatData(relationData)

        // const graphJsonData = {
        //     rootId: relationData[0].start.people_id || relationData.start.org_id,
        //     nodes: nodes,
        //     lines: lines
        // }
        await graphRef.current.setJsonData(staticJsonData, (graphInstance) => {
            // 图谱加载完成后，要做的
        })
    }

    const options = {
        zoomToFitWhenRefresh: false,
        defaultNodeBorderWidth: 0,
        defaultNodeColor: "rgba(238, 178, 94, 1)",
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        debug: false,
        showDebugPanel: false,
        defaultLineShape: 1,
        useAnimationWhenRefresh: true,
        defaultLineMarker: {
            markerWidth: 12,
            markerHeight: 12,
            refX: 10,
            refY: 6,
            data: "M2,2 L10,6 L2,10 L6,6 L2,2"
        },
        allowAutoLayoutIfSupport: true,
        layouts: [
            {
                label: "中心",
                layoutName: "force",
                layoutClassName: "seeks-layout-force",
            }
        ],
        defaultJunctionPoint: "border"
    }

    //点击节点
    const onNodeClick = (nodeObject, $event) => {
        function high() {
            const allLinks = graphRef.current?.getLinks()

            allLinks.forEach((link) => {
                // 还原所有样式
                link.relations.forEach((line) => {
                    if (line.data.orignColor) {
                        line.color = line.data.orignColor
                    }
                    if (line.data.orignFontColor) {
                        line.fontColor = line.data.orignColor
                    }
                    if (line.data.orignLineWidth) {
                        line.lineWidth = line.data.orignLineWidth
                    }
                })
            })
            // 让与{nodeObject}相关的所有连线高亮
            const curNodeLinks = allLinks.filter(
                (link) =>
                    link.fromNode === nodeObject || link.toNode === nodeObject
            )

            curNodeLinks.forEach((link) => {
                link.relations.forEach((line) => {
                    line.data.orignColor = line.color
                    line.data.orignFontColor = line.fontColor || line.color
                    line.data.orignLineWidth = line.lineWidth || 1
                    line.color = "#ff0000"
                    line.fontColor = "#ff0000"
                    line.lineWidth = 3
                })
            })
        }
        high()
        graphRef.current.getInstance().dataUpdated()
    }

    //点击线
    const onLineClick = (line, _link, _e) => {
        console.log(
            "onLineClick:",
            line.text,
            line.from,
            line.to,
            line,
            _link,
            _e
        )
    }

    //点击画布
    const onCanvasClick = (event) => {
        // console.log(graphRef)
        // const graphInstance = graphRef.current.getInstance()
        // graphInstance.clearChecked()
    }

    const graphPlug = ({ relationGraph }) => {
        return (
            <div
                slot="graph-plug"
                style={{
                    top: 0,
                    left: 10,
                    position: "absolute",
                    color: "#ffffff",
                    fontSize: "15px",
                    // width: "600px",
                    // border: "#efefef solid 1px",
                    zIndex: 22
                }}
            >
                <Checkbox>人物关系</Checkbox>
                <br />
                <Checkbox>组织关系</Checkbox>
            </div>
        )
    }

    const toolBarSlot = () => {
        return <div>
            <span>123</span>
        </div>
    }

    return (
        <div
            className="graph-warp"
            style={{ height: "calc(100vh - 180px)", width: "100%" }}
        >
            <RelationGraph
                ref={graphRef}
                options={options}
                nodeSlot={NodeSlot}
                onNodeClick={onNodeClick}
                onLineClick={onLineClick}
                graphPlugSlot={graphPlug}
                onCanvasClick={onCanvasClick}
                toolBarSlot={toolBarSlot}
            ></RelationGraph>
        </div>
    )
}

export default RelationRight
