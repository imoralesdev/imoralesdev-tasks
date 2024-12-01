import turso from "@/lib/turso";

export async function initTasks() {
    try {
        await turso.execute(`
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY, 
                title TEXT, 
                completed BOOLEAN
            );
        `);
        console.log("Tabla 'tasks' inicializada correctamente.");
    } 
    catch (error) {
        console.error("Error al inicializar la tabla 'tasks':", error);
        throw error;
    }
}