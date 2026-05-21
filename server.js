require('dotenv').config();

// LIBRERÍAS
const express = require("express");
const path = require("path");
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

// APP
const app = express();

const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ARCHIVOS ESTÁTICOS
app.use(express.static(__dirname));

// RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// CONFIGURACIÓN GEMINI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// GUARDAR PEDIDO (SIMULADO)
app.post("/guardar-pedido", (req, res) => {

    console.log("Pedido recibido:");
    console.log(req.body);

    return res.status(200).json({
        mensaje: "Pedido realizado correctamente"
    });

});

// ENDPOINT CHATBOT
app.post('/api/chat', async (req, res) => {

    const { mensajeUsuario } = req.body;

    try {

        const response = await ai.models.generateContent({

            model: 'gemini-2.5-flash',

            contents: mensajeUsuario,

            config: {

                                // Aquí va el entrenamiento del caso de la cafetería
                systemInstruction: `Eres el Asistente Virtual impulsado por IA de la empresa "Café y a gusto...". 
                Tu objetivo principal es apoyar en la toma de pedidos de bebidas a base de café y snacks, reduciendo errores del proceso manual.
                
                Debes cumplir estrictamente con las siguientes funciones del negocio:
                1. Asistente de Pedidos: Guía al cliente paso a paso, respondiendo preguntas y asegurando que se incluyan todos los detalles necesarios para la orden (tamaño, tipo de leche, etc.).
                2. Personalización y Recomendaciones: Analiza de forma simulada sus gustos. Si te pide una recomendación, sugiérele combinaciones de café y snacks basadas en sus preferencias para fomentar compras adicionales.
                3. Gestión de Inventario: Si el cliente pide un producto, actúa como si estuvieras conectado al inventario en tiempo real. Si simulas que algo no hay stock, ofrécele una alternativa para evitar la pérdida de la venta.
                4. Promociones Personalizadas: Ofrece ofertas basadas en su comportamiento de compra para incentivar la fidelidad.
                
                Mantén un tono cálido, profesional y eficiente.
                IMPORTANTE: Responde siempre en texto plano. No utilices formato Markdown ni asteriscos (**) para resaltar palabras.`


            }

        });


        res.json({
        
            respuestaIA: response.text

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Error al procesar la respuesta de Gemini"
            
        });

    }

});

// INICIAR SERVIDOR
app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`);

});