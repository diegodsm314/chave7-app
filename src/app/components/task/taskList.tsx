import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../services/query';
import CardComponent from '../card/cardComponent';

interface TaskListProps {
  search: string;
  category: string;
}

export default function TaskList({ search, category }: TaskListProps) {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    refetchInterval: 60000,
  });

  const filteredTasks = tasks.filter(task => {
    const matchTitle = task.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || task.category === category;
    return matchTitle && matchCategory;
  });

  if (isLoading) return <p>Carregando tarefas...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.map((task) => (
        <CardComponent
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          category={task.category}
          endDate={new Date(task.endDate || task.createdAt)}
        />
      ))}
    </div>
  );
}