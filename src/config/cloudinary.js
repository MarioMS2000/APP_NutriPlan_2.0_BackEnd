// Archivo es el encargado de configurar Cloudinary para que la aplicación pueda subir imágenes de recetas
import { v2 as cloudinary } from "cloudinary"; // Importo libreria de cloudinary. v2 es la versión de la API
import { CloudinaryStorage } from "multer-storage-cloudinary"; // Importo esta libreria para que Multer no guarde por defecto archivos en mi ordena y los guarde en internet. CloudinaryStorage conecta Multer con Cloudinary
import multer from "multer"; // Multer sirve para recibir archivos enviados desde el frontend
import dotenv from "dotenv";

dotenv.config(); // Cargar variables

// Aquí le dices a Cloudinary quién eres
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Crear almacenamiento
export const recipeImageStorage = new CloudinaryStorage({
    cloudinary, // Usa la cuenta que acabas de configurar
    params: // Configuración adiciona
    {
        folder: "nutriplan/recipes", // Todas las imágenes se guardarán en esta carpeta
        allowed_formats: ["jpg", "jpeg", "png", "webp"], // Solo aceptará esos formatos
    },
});

// Crear Multer
export const uploadRecipeImage = multer({ // Aquí creas un middleware de Multer
    storage: recipeImageStorage, // No guardes el archivo en el servidor. Guárdalo directamente en Cloudinary
    limits: {
        fileSize: 2 * 1024 * 1024
    },
});

export default cloudinary; 