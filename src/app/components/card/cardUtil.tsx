import { Category, categoryColors } from '../global';

export type CardProps = {
  title: string;
  description: string;
  status: string;
  category: Category;
  endDate: Date;
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

export default function getTimeRemaining(endDate: Date) {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();

  if (diff <= 0) return 'Tempo expirado';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${minutes}m`;
}