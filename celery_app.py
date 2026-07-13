from celery import Celery

celery = Celery(
    "mdo_tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery.task
def run_mdo_optimization(project_id: str):
    # Placeholder for real MDO call
    print(f"Running MDO for project {project_id}...")
    # Later: call your Python MDO engine here
    return {"status": "completed", "project_id": project_id}