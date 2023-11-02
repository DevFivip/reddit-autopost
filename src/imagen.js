const sharp = require('sharp');

// Ruta de la imagen de entrada y salida

function rgbToHex(rgb) {
    console.log(rgb)

    const { R, G, B } = rgb

    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    const red = toHex(R);
    const green = toHex(G);
    const blue = toHex(B);

    return `#${red}${green}${blue}`;
}

function calculatePastelColor(inputColor) {
    // Convertir el color de entrada a valores de 0 a 1
    const r = inputColor.r / 255;
    const g = inputColor.g / 255;
    const b = inputColor.b / 255;

    // Calcular el color pastel promedio
    const pastelR = (r + 1) / 2; // Escalar a un rango de 0 a 1
    const pastelG = (g + 1) / 2;
    const pastelB = (b + 1) / 2;

    // Convertir el resultado a valores de 0 a 255
    const pastelColor = {
        R: Math.round(pastelR * 255),
        G: Math.round(pastelG * 255),
        B: Math.round(pastelB * 255),
    };

    return pastelColor;
}

(async () => {


    const inputImagePath = __dirname + '/won.jpg';
    const outputImagePath = __dirname + '/22.jpg';

    const { dominant } = await sharp(inputImagePath).stats();

    // Color de entrada en formato RGB (0-255)
    // const inputColor = { R: 150, G: 100, B: 200 }; // Reemplaza con el color de entrada que desees

    // Calcular el color pastel promedio
    const pastelColor = calculatePastelColor(dominant);

    // console.log('Color de entrada (RGB):', inputColor);
    console.log('Color pastel promedio (RGB):', pastelColor);
    const hexColor = rgbToHex(pastelColor);





    // crear la palabra que va en la imagen
    const width = 500;
    const height = 200;
    const text = "u/nene";

    const svgImage = `
<svg width="${width}" height="${height}">
<style>
.title { fill:${hexColor}; font-size: 70px; font-weight: bold;}
</style>
<text x="50%" y="50%" text-anchor="middle" class="title" >${text}</text>
</svg>
`;

    const svgBuffer = Buffer.from(svgImage);

    // Aumentar la resolución de la imagen
    sharp(inputImagePath)
        .resize({
            width: Math.round(300 * (1000 / 300)), // Ajusta el ancho para mantener la relación de aspecto
            height: Math.round(300 * (1000 / 300)), // Ajusta el alto para mantener la relación de aspecto
            fit: 'inside', // Ajusta la imagen dentro de las dimensiones especificadas
        })
        .composite([
            {
                input: svgBuffer,
                top: 880,
                left: 320,
            },
        ])
        .toFile(outputImagePath, (err, info) => {
            if (err) {
                console.error('Error al procesar la imagen:', err);
            } else {
                console.log('Proceso completado. La imagen se ha guardado con 300 PPI en:', outputImagePath);
            }
        });




})()