import React from "react";
import styles from "./option.module.css";
import { FcCheckmark } from "react-icons/fc";
import { FaUserFriends } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";

type Props = {
    index: number;
    name: string;
    select: string;
    setSelected: (selected: string) => void;
};

export default function UserOption({ index, name, select, setSelected }: Props) {
    function handleSelection() {
        setSelected(name);
    }

    if (index === 0) {
        return (
            <p className={styles.sidebarOption} onClick={() => setSelected("Todos")}>
                <span className={styles.smallIcon}>
                    <FaUserFriends />
                </span>
                Todos
                <div className={select === "Todos" ? styles.select : styles.unselect}>
                    <FcCheckmark />
                </div>
            </p>
        );
    }
    return (
        <p className={styles.sidebarOption} onClick={handleSelection}>
            <span className={styles.smallIcon}>
                <IoPersonCircleSharp />
            </span>{" "}
            {name}
            <span className={select === name ? styles.select : styles.unselect}>
                <FcCheckmark />
            </span>
        </p>
    );
}
