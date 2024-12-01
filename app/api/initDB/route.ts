import { NextResponse } from "next/server";
import { initTasks } from "@/app/api/db/initTasks";

export async function POST() {
    try {
        await initTasks();
        return NextResponse.json({
            message: "Base de datos inicializada correctamente.",
        });
    } 
    catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        return NextResponse.json(
            { error: "Error al inicializar la base de datos" },
            { status: 500 }
        );
    }
}