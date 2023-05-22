import React from "react";
import styles from "./option.module.css";
import { FaLock, FaUnlock } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { VisibilityTypes } from "@/contexts/messagingContext";

type Props = {
    visibility: VisibilityTypes;
    setVisibility: (option: VisibilityTypes) => void;
};

export default function MessageOptions({ visibility, setVisibility }: Props) {
    return (
        <>
            <p className={styles.sidebarOption} onClick={() => setVisibility(VisibilityTypes.PUBLIC)}>
                <span className={styles.smallIcon}>
                    <FaLock />
                </span>{" "}
                Público
                <div className={visibility === "PUBLIC" ? styles.select : styles.unselect}>
                    <FcCheckmark />
                </div>
            </p>
            <p className={styles.sidebarOption} onClick={() => setVisibility(VisibilityTypes.PRIVATE_MESSAGE)}>
                <span className={styles.smallIcon}>
                    <FaUnlock />
                </span>{" "}
                Privado
                <div className={visibility === "PRIVATE_MESSAGE" ? styles.select : styles.unselect}>
                    <FcCheckmark />
                </div>
            </p>
        </>
    );
}
