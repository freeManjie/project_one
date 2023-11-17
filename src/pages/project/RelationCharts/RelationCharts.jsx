import { SearchOutlined } from "@ant-design/icons"
import { Col, Descriptions, Input, Row } from "antd"
import React from "react"
import RelationRight from "./component/RelationRight.jsx"
import "./index.scss"

const labelStyle = {
    fontSize: "14px",
    width: "100px",
    padding: "8px 0 8px 10px",
    display: "inline-block",
    textAlign: "center"
}

const contentStyle = {
    fontSize: "14px",
    width: "200px",
    padding: "8px 0 8px 10px",
    display: "inline-block"
}

const RelationCharts = () => {
    return (
        <div className="common-content">
            <Row style={{ width: "100%" }}>
                <Col className="relation-left">
                    <div className="relation-search">
                        <div className="people-search">
                            <Input
                                type="search"
                                className="search-input"
                                suffix={<SearchOutlined />}
                            />
                        </div>
                        <div className="search-content">
                            <div className="content-result">
                                <h1>知识查询结果</h1>
                                <Descriptions
                                    className="desStyle"
                                    contentStyle={contentStyle}
                                    labelStyle={labelStyle}
                                    column={1}
                                    bordered
                                >
                                    <Descriptions.Item label="实体">
                                        多里坤
                                    </Descriptions.Item>
                                    <Descriptions.Item label="类型">
                                        人物
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className="content-result">
                                <h1>属性</h1>
                                <Descriptions
                                    className="desStyle"
                                    contentStyle={contentStyle}
                                    labelStyle={labelStyle}
                                    column={1}
                                    bordered
                                >
                                    <Descriptions.Item label="属性名">
                                        属性值
                                    </Descriptions.Item>
                                    <Descriptions.Item label="实体"></Descriptions.Item>
                                    <Descriptions.Item label="人物"></Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="relation-right">
                    <RelationRight />
                </Col>
            </Row>
        </div>
    )
}

export default RelationCharts
