import React from "react";
import styles from "./chat.module.css";

export type MessageType = {
    _id: string;
    from: string;
    to: string;
    text: string;
    type: "PRIVATE_MESSAGE" | "PUBLIC" | "STATUS";
    time: string;
};

export default function Chat({ from, to, text, type, time }: MessageType) {
    if (type === "STATUS") {
        return (
            <div className={styles.msg} style={{ backgroundColor: "#DCDCDC" }}>
                <span className={styles.muted}>({time})</span>
                <p>
                    <b>{from}</b> {text}
                </p>
            </div>
        );
    }

    if (type === "PRIVATE_MESSAGE") {
        return (
            <div className={styles.msg} style={{ backgroundColor: "#FFDEDE" }}>
                <span className={styles.muted}>({time})</span>
                <p>
                    <b>{from}</b> reservadamente para <b>{to}</b>: {text}
                </p>
            </div>
        );
    }
    return (
        <div className={styles.msg}>
            <span className={styles.muted}>({time})</span>
            <p>
                <b>{from}</b> para <b>{to}</b>: {text}
            </p>
        </div>
    );
}
