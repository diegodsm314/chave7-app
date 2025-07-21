import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById } from '@/services/query';
import { removeTask, updateTaskStatus } from '@/services/mutation';
import React from 'react';

export default function TaskDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const queryClient = useQueryClient();

    const { data: task, isLoading, isError } = useQuery({
        queryKey: ['task', id],
        queryFn: () => getTaskById(id as string),
        enabled: !!id,
    });

    const removeMutation = useMutation({
        mutationFn: () => removeTask(id as string),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            router.push('/');
        },
    });

    const completeMutation = useMutation({
        mutationFn: (newStatus: string) =>
            updateTaskStatus(id as string, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task', id] });
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Carregando tarefa...</p>
            </div>
        );

    if (isError || !task)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-600 text-lg">Erro ao carregar tarefa.</p>
            </div>
        );

    return (
  
        <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{task.title}</h1>

            <section className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Descrição</h2>
                <p className="text-gray-600">{task.description || 'Sem descrição'}</p>
            </section>

            <section className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-gray-700">Status</h3>
                    <p className="text-gray-600">{task.status}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700">Categoria</h3>
                    <p className="text-gray-600">{task.category}</p>
                </div>
            </section>

            <section className="mb-4">
                <h3 className="font-semibold text-gray-700">Data de encerramento</h3>
                <p className="text-gray-600">
                    {new Date(task.endDate || task.createdAt).toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                    })}
                </p>
            </section>

            <section className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-1">Usuário</h3>
                <p className="text-gray-600">
                    {task.user.firstName} {task.user.lastName}
                </p>
                <p className="text-gray-600">Email: {task.user.email}</p>
            </section>

            {/* Botões */}
            <div className="flex flex-wrap gap-4 justify-end">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                    Voltar
                </button>

                <button
                    onClick={() => {
                        if (confirm('Tem certeza que deseja excluir essa tarefa?')) {
                            removeMutation.mutate();
                        }
                    }}
                    disabled={removeMutation.isPending}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                >
                    {removeMutation.isPending ? 'Excluindo...' : 'Excluir'}
                </button>

                <button
                    onClick={() =>
                        completeMutation.mutate(
                            task.status === 'CONCLUIDO' ? 'PENDENTE' : 'CONCLUIDO'
                        )
                    }
                    disabled={completeMutation.isPending}
                    className={`px-4 py-2 text-white rounded transition disabled:opacity-50 ${task.status === 'CONCLUIDO'
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {completeMutation.isPending
                        ? task.status === 'CONCLUIDO'
                            ? 'Reabrindo...'
                            : 'Concluindo...'
                        : task.status === 'CONCLUIDO'
                            ? 'Reabrir Tarefa'
                            : 'Concluir Tarefa'}
                </button>
            </div>
        </div>
    );
}
