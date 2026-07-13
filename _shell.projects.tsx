import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    const newProject = await api.createProject("Baobab-A320 Variant");
    setProjects([...projects, newProject]);
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <button onClick={handleCreate}>New Project</button>
      <ul>
        {projects.map((p: any) => (
          <li key={p.id}>
            {p.name} - {p.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;