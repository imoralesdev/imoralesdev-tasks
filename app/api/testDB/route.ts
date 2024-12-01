import { NextResponse } from "next/server";
import { testConnection } from "@/app/api/db/testConnection";

export async function POST() {
    try {
        await testConnection();
        console.log("Conexión exitosa. Procediendo a inicializar la base de datos.");
        
        return NextResponse.json({
            message: "Conexión exitosa y base de datos lista.",
        });
    } catch (error) {
        console.error("Error al probar la conexión:", error);
        
        // Devuelve un NextResponse en caso de error
        return NextResponse.json(
            { error: "Error al probar la conexión con la base de datos" },
            { status: 500 }
        );
    }
}