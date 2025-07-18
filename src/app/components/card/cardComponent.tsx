import React from 'react';
import { Category } from '../common/miscellaneous';

type CardProps = {
    title: string;
    description: string;
    category: Category;
    endDate: Date;
};

const categoryColors: Record<Category, string> = {
  [Category.TRABALHO]: "bg-blue-600 text-white",
  [Category.PESSOAL]: "bg-pink-500 text-white",
  [Category.COMPRAS]: "bg-green-500 text-white",
  [Category.SAUDE]: "bg-red-500 text-white",
  [Category.FINANCEIRO]: "bg-yellow-500 text-black",
  [Category.EDUCACAO]: "bg-indigo-500 text-white",
  [Category.CASA]: "bg-gray-500 text-white",
  [Category.LAZER]: "bg-teal-500 text-white",
  [Category.OUTROS]: "bg-zinc-400 text-black",
};

interface Props {
  propsCategory: Category;
}

export const CategoryBadge = ({ propsCategory }: Props) => {
  const colorClass = categoryColors[propsCategory] ?? "bg-gray-300 text-black";

  return (
    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${colorClass}`}>
      {propsCategory}
    </span>
  );
};

function getTimeRemaining(endDate: Date) {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) return 'Encerrado';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
}

const CardComponent: React.FC<CardProps> = ({ title, description, endDate, category }) => (
    <div className={"border border-[#ddd] rounded-lg p-4 shadow-sm bg-white"}>
        <h2 className={"mb-2 dark:invert"}>{title}</h2>
        <p className={"mb-3 text-[#555]"}>{description}</p>
        <div style={{ fontSize: 14, color: '#888' }}>
            <div><CategoryBadge propsCategory={category}/></div>
            <div>Data de encerramento: {endDate.toLocaleDateString()}</div>
            <div>Tempo restante: {getTimeRemaining(endDate)}</div>
        </div>
    </div>
);

export default CardComponent;