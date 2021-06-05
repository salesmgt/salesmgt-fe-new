import React from "react";

const Legends = (props) => {
    const caseName = 0
    const { item } = props
    // console.log(item)
    return (
        <div
            style={{
                display: "flex",
                alignItems: "stretch",
            }}
        >
            {item.map((item) => (
                <div
                    key={item.title}
                    style={{
                        backgroundColor: item.color,
                        flex: 1,
                        display: "flex",
                        alignItems: "center", // vertical
                        justifyContent: "center", // horiztontal
                        color: item.textColor != null ? item.textColor : "black",
                        fontWeight: "bolder",
                        fontSize: "1em",
                        height: "6vh",
                    }}
                >
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
};

export default Legends;