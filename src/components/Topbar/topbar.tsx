"use client";
import React from "react";
import styles from "./topbar.module.css";
import Image from "next/image";
import { BsFillPersonLinesFill } from "react-icons/bs";

type Props = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

export default function Topbar({ isOpen, setIsOpen }: Props) {
    return (
        <div className={styles.topbar}>
            <Image className={styles.logo} src='/logo.svg' alt='Logo' width={75} height={53} />
            <BsFillPersonLinesFill className={styles.menu} onClick={() => setIsOpen(!isOpen)} />
        </div>
    );
}
