"use client";
import Topbar from "@/components/Topbar/topbar";
import styles from "./page.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import Chat, { MessageType } from "./(chat)/chat/chat";
import { GET } from "./(chat)/api/route";
import TextArea from "./(chat)/messages/textarea";
import Sidebar from "./(sidebar)/sidebar";
import { MessagingProvider } from "@/contexts/messagingContext";
import { UserContext } from "@/contexts/userContext";

export default function Main() {
    const { username } = useContext(UserContext);
    const [messages, setMessages] = useState<MessageType[]>();
    const [open, setOpen] = useState(false);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        GET(username)
            .then((res) => {
                setMessages(res);
                scrollToBottom();
            })
            .catch((err) => console.log(err));
        const interval = setInterval(() => {
            startFetch();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    function startFetch() {
        console.log("Fetching messages");
        GET(username)
            .then((res) => {
                setMessages(res);
                scrollToBottom();
            })
            .catch((err) => console.log(err));
    }

    return (
        <MessagingProvider>
            <main className={styles.containerMain}>
                <Topbar isOpen={open} setIsOpen={setOpen} />
                <div className={styles.containerChat}>
                    {messages && messages.map((message) => <Chat key={message._id} {...message} />)}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className={styles.containerMessage}>
                    <TextArea />
                </div>
                {open && <Sidebar setOpen={setOpen} />}
            </main>
        </MessagingProvider>
    );
}
