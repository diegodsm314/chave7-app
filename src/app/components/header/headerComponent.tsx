"use client";
import React, { useState } from "react";
import { Category } from "../global";
import CardNewTaskComponent from "../card/cardNewTaskComponent";
import { Home } from "lucide-react";
import { useRouter } from 'next/navigation';

interface HeaderProps {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
}

const formatCategoryName = (cat: string) =>
    cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();

const HeaderComponent: React.FC<HeaderProps> = ({
    search,
    setSearch,
    category,
    setCategory,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [newTaskOpen, setNewTaskOpen] = useState(false);

    const router = useRouter();
    const closeMenu = () => setMenuOpen(false);
    const toggleNewTask = () => setNewTaskOpen((open) => !open);

    return (
        <header className="p-4 bg-gray-100 shadow-md mb-5 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-xl font-bold text-gray-800 grid grid-cols-[auto_1fr] items-center gap-4">
                    <div className="ml-auto">
                        <button
                            onClick={() => router.push("/")}
                            className="text-gray-800 hover:text-blue-600 transition"
                            aria-label="Ir para Home"
                            title="Home"
                        >
                            <Home size={24} />
                        </button>
                    </div>
                    Gerenciador de tarefas</div>

                {/* Botão menu mobile */}
                <button
                    className="sm:hidden text-gray-700 text-2xl"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Abrir menu"
                >
                    ☰
                </button>

                {/* Telas grandes */}
                <nav className="hidden sm:flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Filtrar por nome"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 rounded border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 rounded border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Todas as categorias</option>
                        {Object.values(Category).map((cat) => (
                            <option key={cat} value={cat}>
                                {formatCategoryName(cat)}
                            </option>
                        ))}
                    </select>

                    {/* Botão para abrir o formulário nova tarefa */}
                    <button
                        onClick={toggleNewTask}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        aria-expanded={newTaskOpen}
                        aria-controls="new-task-form"
                    >
                        Nova Tarefa
                    </button>
                </nav>
            </div>

            {/* Menu lateral mobile */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-20 z-40 sm:hidden"
                    onClick={closeMenu}
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 p-4 flex flex-col gap-4 sm:hidden
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <button
                    onClick={closeMenu}
                    className="self-end text-xl text-gray-600"
                    aria-label="Fechar menu"
                >
                    ✕
                </button>

                <button
                    onClick={() => {
                        router.push("/");
                        closeMenu();
                    }}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition"
                    aria-label="Home"
                >
                    <Home size={20} />
                    Início
                </button>


                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 rounded border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todas as categorias</option>
                    {Object.values(Category).map((cat) => (
                        <option key={cat} value={cat}>
                            {formatCategoryName(cat)}
                        </option>
                    ))}
                </select>

                {/* Botão abrir formulário nova tarefa mobile */}
                <button
                    onClick={() => {
                        toggleNewTask();
                        setMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Nova Tarefa
                </button>
            </div>

            {/* Nova tarefa no modo desktop dropdown */}
            {newTaskOpen && (
                <div
                    id="new-task-form"
                    className="hidden sm:block absolute right-4 top-full mt-2 bg-white p-4 rounded shadow-lg w-140 z-50"
                    aria-label="Formulário para criar nova tarefa"
                >
                    <CardNewTaskComponent
                        onTaskCreated={() => {
                            setNewTaskOpen(false);
                        }}
                    />
                </div>
            )}

            {/* Nova tarefa no modo mobile full screen */}
            {newTaskOpen && (
                <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
                        <button
                            onClick={() => setNewTaskOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 text-xl"
                            aria-label="Fechar formulário"
                        >
                            ✕
                        </button>
                        <CardNewTaskComponent
                            onTaskCreated={() => {
                                setNewTaskOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderComponent;
