"use client";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import styles from "./textarea.module.css";
import { MessagingContext } from "@/contexts/messagingContext";
import { UserContext } from "@/contexts/userContext";
import axios from "axios";

type Props = {};

export default function TextArea({}: Props) {
    const { properties } = useContext(MessagingContext);
    const { username } = useContext(UserContext);
    const { to, type } = properties;

    const [message, setMessage] = useState({ from: username, to, type, text: "" });

    useEffect(() => {
        setMessage({ ...message, to, type });
    }, [to, type]);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setMessage({ ...message, text: e.target.value });
    }

    function handleSubmit() {
        console.log(message);
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/messages`, message)
            .then(() => setMessage({ ...message, text: "" }))
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className={styles.textContainer}>
                <textarea
                    name='msg'
                    className={styles.textArea}
                    value={message.text}
                    cols={30}
                    rows={1}
                    placeholder='Escreva aqui'
                    onChange={handleChange}
                />
                {to !== "Todos" && (
                    <div className={styles.reserved}>
                        Enviando para {to} {type === "PUBLIC" ? "(público)" : "(reservadamente)"}
                    </div>
                )}
            </div>
            <IoPaperPlaneOutline className={styles.sendButton} onClick={handleSubmit} />
        </>
    );
}
