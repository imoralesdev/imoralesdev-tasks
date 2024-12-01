import turso from "@/lib/turso";

export async function testConnection() {
  try {
    const result = await turso.execute("SELECT 1");
    console.log("Conexión exitosa:", result);
  } 
  catch (error) {
    console.error("Error de conexión con Turso:", error);
    throw error;
  }
}
