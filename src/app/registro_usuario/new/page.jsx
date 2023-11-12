"use client"

import { create } from "@/actions/usuarios";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import NavBar from "@/components/NavBar";
import { CheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from 'next/router'; 

export default function FormUsuarios() {
    const [message, setMessage] = useState("");
    const router = useRouter();  

    async function handleSubmit(event) {
        event.preventDefault();  

        const formData = new FormData(event.target);
        const resp = await create(formData);

        if (resp.message) {
            setMessage(resp.message);
            return;
        }

        router.push("/usuarios");  
    }

    return (
        <>
            <NavBar active="usuarios" />

            <main className="bg-slate-900 mt-10 p-12 rounded-xl max-w-lg m-auto">
                <h2 className="text-2xl font-bold">Cadastrar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <InputText name="nome" id="nome" label="nome" />
                    <InputText name="email" id="email" label="email" />
                    <InputText name="icone" id="icone" label="ícone" />

                    <div className="flex justify-around mt-4">
                        <Button href="/usuarios" variant="secundary" icon={<ArrowLeftIcon className="h-6 w-6" />}>
                            cancelar
                        </Button>
                        <Button type="submit" icon={<CheckIcon className="h-6 w-6" />}>
                            salvar
                        </Button>
                    </div>
                </form>
                <p>{message}</p>
            </main>
        </>
    );
}