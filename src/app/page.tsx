"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { POST } from "./api/route";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";
import { UserContext } from "@/contexts/userContext";

export default function Home() {
    const [name, setName] = useState<string | null>();
    const { setUsername } = useContext(UserContext);
    const router = useRouter();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (name && name.length !== 0) {
            POST(name)
                .then(() => {
                    setUsername(name);
                    router.push("/main");
                })
                .catch(() => {
                    toast.error("Nome já está em uso!", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                });
        } else {
            toast.error("Digite seu nome, por favor!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    function handleChange(param: ChangeEvent<HTMLInputElement>) {
        setName(param.target.value);
    }

    return (
        <main className={styles.main}>
            <Image className={styles.logo} src='/logo.svg' alt='Logo' width={130} height={92} />
            <form className={styles.form}>
                <input type='text' name='name' id='name' placeholder='Digite seu nome' onChange={handleChange} />
                <button onClick={handleSubmit} type='button'>
                    Entrar
                </button>
            </form>
            <ToastContainer />
        </main>
    );
}
