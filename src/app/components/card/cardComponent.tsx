"use client";
import React from 'react';
import { CategoryBadge } from './cardUtil';
import { getTimeRemaining } from './cardUtil';
import { CardProps } from './cardUtil';
import Link from 'next/link';

const CardComponent: React.FC<CardProps> = ({ title, id, description, status, endDate, category, onStatusChange }) => (
  <div className={"border border-[#ddd] rounded-lg p-4 shadow-sm bg-white gap"}>
    <div className='flex items-center justify-between mb-3'>
      <h2 className={"dark:invert"}>{title}</h2>
      <div><CategoryBadge propsCategory={category} /></div>
    </div>
    <p className={"mb-3 text-[#555] min-h-[1em]"}>{description ? description : "Sem descrição"}</p>
    <div className="text-sm text-gray-500 flex items-center justify-between gap-6">
      <div>
        Data de encerramento: {new Date(endDate).toLocaleString("pt-BR", {dateStyle: "short", timeStyle: "short"})}
      </div>
      <div
        className={
          status === "CONCLUIDO"
            ? "text-green-600 font-bold"
            : status === "PENDENTE" && getTimeRemaining(endDate) === "Tempo expirado"
              ? "text-red-600 font-bold"
              : status === "PENDENTE"
                ? "text-yellow-600 font-bold"
                : ""
        }
      >
        Status: {status === "CONCLUIDO" ? "CONCLUIDO" : getTimeRemaining(endDate)}
      </div > 
    </div>
    <div className="mt-10 flex justify-between items-center">
      {status === "PENDENTE" ? (
        <button
          className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => {
            onStatusChange();
            console.log("Concluir tarefa");
          }}
        >
          Concluir
        </button>
      ) : status === "CONCLUIDO" ? (
        <button
          className="ml-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => {
            onStatusChange();
            console.log("Reabrir tarefa");
          }}
        >
          Reabrir
        </button>
      ) : null}

      <Link href={`/task/${id}`} className="text-blue-500 hover:underline text-sm ml-4">
        Ver detalhes
      </Link>
    </div>
  </div>
);

export default CardComponent;
