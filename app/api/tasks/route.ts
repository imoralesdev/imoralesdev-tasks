import { NextResponse } from "next/server";
import tursoClient from "@/lib/turso";

// Obtener todas las tareas
export async function GET() {
  const tasks = await tursoClient.execute("SELECT * FROM tasks");
  return NextResponse.json(tasks.rows);
}

// Crear una nueva tarea
export async function POST(req: Request) {
  const { title } = await req.json();
  const id = crypto.randomUUID();
  const query = `
    INSERT INTO tasks (id, title, completed) 
    VALUES ('${id}', '${title}', ${false});
  `;
  await tursoClient.execute(query);
  return NextResponse.json({ id, title, completed: false });
}

// Actualizar una tarea
export async function PUT(req: Request) {
  const { id, title, completed } = await req.json();
  const query = `
    UPDATE tasks 
    SET title = '${title}', completed = ${completed} 
    WHERE id = '${id}';
  `;
  await tursoClient.execute(query);
  return NextResponse.json({ id, title, completed });
}

// Eliminar una tarea
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const query = `
    DELETE FROM tasks 
    WHERE id = '${id}';
  `;
  await tursoClient.execute(query);
  return NextResponse.json({ success: true });
}
