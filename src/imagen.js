const sharp = require('sharp');

// Ruta de la imagen de entrada y salida

const inputImagePath = __dirname + '/1.jpg';
const outputImagePath = __dirname + '/22.jpg';

// crear la palabra que va en la imagen
const width = 500;
const height = 200;
const text = "u/nene";

const svgImage = `
<svg width="${width}" height="${height}">
<style>
.title { fill: #001; font-size: 70px; font-weight: bold;}
</style>
<text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
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