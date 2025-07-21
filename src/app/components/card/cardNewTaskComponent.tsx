"use client";

import React, { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../../services/mutation";
import { Category } from "@/app/components/global";
import { createLocalDateFromInput } from "../card/cardUtil";

interface CardNewTaskProps {
    onTaskCreated?: () => void;
}

const CardNewTaskComponent: React.FC<CardNewTaskProps> = ({ onTaskCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category>(Category.OUTROS);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState("12:00");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
            setTitle("");
            setDescription("");
            setCategory(Category.OUTROS);
            setDate(null);
            if (onTaskCreated) onTaskCreated();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const [hours, minutes] = time.split(":").map(Number);
        console.log(date);
        const combinedDate = new Date(date!);
        combinedDate.setHours(hours);
        combinedDate.setMinutes(minutes);

        if (!title.trim()) return;
        const task = ({
            title: title.trim(),
            description: description.trim(),
            category: category,
            endDate: combinedDate.toISOString(),
            user: {
                firstName: "Usuário",
                lastName: "Exemplo"
            }
        })
        console.log("Criando tarefa:", task);
        mutation.mutate({ task });
    };

    return (
        <div className="flex flex-col gap-2 mb-4 bg-white p-4 rounded-lg shadow-md text-gray-900">
            <form onSubmit={handleSubmit}>
                <h3>Nova Tarefa</h3>
                <div className="align-items-center gap-2 py-2">
                    <input
                        type="text"
                        placeholder="Título"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descrição"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                    <select
                        className="p-2 border border-gray-300 rounded w-1/2 sm:w-auto"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                    >
                        {Object.values(Category).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                    <input
                        className="p-2 border border-gray-300 rounded w-1/2 sm:w-auto"
                        type="date"
                        value={date ? date.toISOString().split("T")[0] : ""}
                        required
                        onChange={(e) => {
                            const date = new Date(createLocalDateFromInput(e.target.value));
                            if (!isNaN(date.getTime())) {
                                setDate(date);
                            }
                            else {
                                alert("Data inválida. Por favor, selecione uma data válida.");
                                return;
                            }
                        }}
                    />
                    <input
                        className="p-2 border border-gray-300 rounded w-1/2 sm:w-auto"
                        type="time"
                        step="900" // 15 minutos
                        value={time}
                        required
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        type="submit"
                        disabled={mutation.isPending}>
                        {mutation.isPending ? "Salvando..." : "Criar Tarefa"}
                    </button>
                    {mutation.isError && (
                        <div className="error">Erro ao criar tarefa.</div>
                    )}
                    {mutation.isSuccess && (
                        <div className="success">Tarefa criada com sucesso!</div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CardNewTaskComponent;