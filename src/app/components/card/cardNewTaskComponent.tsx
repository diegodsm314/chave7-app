import React, { useState } from "react";
"use client";
import { useMutation } from "@tanstack/react-query";
import { createTask } from "../../services/mutation";
import { Task } from "@/app/components/global";
import { Category } from "@/app/components/global";

interface CardNewTaskProps {
    onTaskCreated?: () => void;
}

const CardNewTaskComponent: React.FC<CardNewTaskProps> = ({ onTaskCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category>(Category.OUTROS);
    const [date, setDate] = useState<Date | null>(null);

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            setTitle("");
            setDescription("");
            if (onTaskCreated) onTaskCreated();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        const task = ({
            title: title.trim(),
            description: description.trim(),
            status: "PENDENTE",
            category: category,
            endDate: date || new Date(),
        })
        mutation.mutate({ task });
    };

    return (
        <div className="card-new-task">
            <form onSubmit={handleSubmit}>
                <h3>Nova Tarefa</h3>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value="OUTROS"
                    onChange={(e) => setCategory(e.target.value as Category)}
                >
                    {Object.values(Category).map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    required
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date.getTime())) {
                            setDate(date);
                        }
                        else {
                            setDate(null);
                        }
                    }}
                />
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Salvando..." : "Criar Tarefa"}
                </button>
                {mutation.isError && (
                    <div className="error">Erro ao criar tarefa.</div>
                )}
                {mutation.isSuccess && (
                    <div className="success">Tarefa criada com sucesso!</div>
                )}
            </form>
        </div>
    );
};

export default CardNewTaskComponent;