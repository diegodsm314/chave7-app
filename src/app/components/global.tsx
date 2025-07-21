export enum Category{
    TRABALHO = "TRABALHO",
    PESSOAL = "PESSOAL",
    COMPRAS = "COMPRAS",
    SAUDE = "SAUDE",
    FINANCEIRO = "FINANCEIRO",
    EDUCACAO = "EDUCAÇÃO",
    CASA = "CASA",
    LAZER = "LAZER",
    OUTROS = "OUTROS"
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  category: Category;
  createdAt: string;
  endDate?: string;
  user: {
    firstName: string;
    lastName: string;
    email?: string;
  };
};

export const categoryColors: Record<Category, string> = {
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