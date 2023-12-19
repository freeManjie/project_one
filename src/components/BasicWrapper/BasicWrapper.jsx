import React from "react";
import "./index.scss"
export const BasicWrapper = (props) => {
    const { title, hideTitle, children, style, basicStyle } = props
    return (
        <div className={basicStyle ? `${basicStyle} basic-wrapper` : "basic-wrapper"} style={ style }>
            {!hideTitle ? <h1>{ title }</h1> : ""}
            <div className={"basic-wrapper-content"}>
                { children }
            </div>
        </div>
    )
}