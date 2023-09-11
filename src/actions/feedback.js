import { revalidatePath } from "next/cache";

export async function create(formData) {
    const url = "http://localhost:8080/api/feedbacks";

    const options = {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const resp = await fetch(url, options);
    if (resp.status !== 201) {
        const json = await resp.json();
        const erros = json.reduce((str, erro) => str += ". " + erro.message, "");
        return { message: "Erro ao cadastrar" + erros };
    }
    revalidatePath("/feedbacks");
    return { ok: "success" };
}

export async function getAll() {
    const url = "http://localhost:8080/api/feedbacks";

    const resp = await fetch(url);
    if (!resp.ok) {
        return { message: "Erro ao buscar feedbacks" };
    }
    const data = await resp.json();
    return data;
}

export async function getById(id) {
    const url = `http://localhost:8080/api/feedbacks/${id}`;

    const resp = await fetch(url);
    if (!resp.ok) {
        return { message: "Erro ao buscar o feedbacks" };
    }
    const data = await resp.json();
    return data;
}

export async function update(id, formData) {
    const url = `http://localhost:8080/api/feedbacks/${id}`;

    const options = {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            "Content-Type": "application/json",
        },
    };

    const resp = await fetch(url, options);
    if (resp.status !== 200) {
        const json = await resp.json();
        const erros = json.reduce((str, erro) => (str += ". " + erro.message), "");
        return { message: "Erro ao atualizar" + erros };
    }
    return { ok: "success" };
}

export async function remove(id) {
    const url = `http://localhost:8080/api/feedbacks/${id}`;

    const options = {
        method: "DELETE",
    };

    const resp = await fetch(url, options);
    if (resp.status !== 204) {
        return { message: "Erro ao excluir o feedbacks" };
    }
    return { ok: "success" };
}
