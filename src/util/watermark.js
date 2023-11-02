const sharp = require('sharp');

module.exports = {
    rgbToHex(rgb) {
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
    },
    calculatePastelColor(inputColor) {
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
    },
    mark(file, text) {
        console.log(text);
        return new Promise(async (suc, rej) => {

            q = file.split('/');
            // console.log(q)
            const ImagenPath = "/files/mark/" + q[2];
            const inputImagePath = __dirname + "/../.." + file;
            const outputImagePath = __dirname + "/../.." + ImagenPath;


            const { dominant } = await sharp(inputImagePath).stats();

            const pastelColor = this.calculatePastelColor(dominant);
            const hexColor = this.rgbToHex(pastelColor);

            // crear la palabra que va en la imagen
            const width = 500;
            const height = 200;

            const svgImage = `
                    <svg width="${width}" height="${height}">
                    <style>
                    .title { fill: ${hexColor}; font-size: 25px; font-weight: bold;}
                    </style>
                    <text x="25%" y="25%" text-anchor="middle" class="title">${text}</text>
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
                        top: 300,
                        left: 300,
                    },
                ])
                .toFile(outputImagePath, (err, info) => {
                    if (err) {
                        console.error('Error al procesar la imagen:', err);
                        rej(false)
                    } else {
                        console.log('Proceso completado. La imagen se ha guardado con 300 PPI en:', outputImagePath);
                        suc(ImagenPath);
                    }
                });

        });
    }
}
// Ruta de la imagen de entrada y salida

