"use client";
import { GET } from "@/app/api/route";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./sidebar.module.css";
import UserOption from "@/components/SidebarOptions/userOption";
import MessageOptions from "@/components/SidebarOptions/messageOption";
import { MessagingContext } from "@/contexts/messagingContext";

type User = {
    name: string;
};

export default function Sidebar({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { properties, setProperties } = useContext(MessagingContext);
    const [users, setUsers] = useState<User[]>();
    const [userSelected, setUserSelected] = useState(properties.to);
    const [visibility, setVisibility] = useState(properties.type);
    console.log(userSelected);

    useEffect(() => {
        GET()
            .then((res) => setUsers([{ name: "Todos" }, ...res]))
            .catch(() =>
                toast("Erro", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            );
    }, []);

    useEffect(() => {
        setProperties({ to: userSelected, type: visibility });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibility, userSelected]);

    return (
        <aside className={styles.container}>
            <div className={styles.overlay} onClick={() => setOpen(false)}></div>
            <div className={styles.sidebarContainer}>
                <section>
                    <header className={styles.sidebarHeader}>
                        <p className={styles.sidebarHeaderText}>Escolha um contato para enviar mensagem:</p>
                    </header>

                    {users?.map((user, index) => (
                        <UserOption
                            key={user.name}
                            name={user.name}
                            index={index}
                            select={userSelected}
                            setSelected={setUserSelected}
                        />
                    ))}
                </section>
                <section>
                    <header className={styles.sidebarHeader}>
                        <p className={styles.sidebarHeaderText}>Escolha a visibilidade:</p>
                    </header>
                    <MessageOptions visibility={visibility} setVisibility={setVisibility} />
                </section>
            </div>
        </aside>
    );
}
