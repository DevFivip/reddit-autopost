const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

module.exports = {
    uploadToReddit(post, user) {
        return new Promise(async (suc, rej) => {
            try {
                const directorio1 = path.join(__dirname, '../../files/logs/'); // Reemplaza 'nombre_del_directorio' con el nombre de tu directorio
                // Comprueba si el directorio existe
                if (!fs.existsSync(directorio1)) {
                    // Si no existe, crea el directorio1
                    fs.mkdirSync(directorio1);
                    // console.log(`directorio1 '${directorio1}' creado.`);
                } else {
                    // console.log(`El directorio1 '${directorio1}' ya existe.`);
                }

                const directorio = path.join(__dirname, '../../files/logs/' + post.id);// Reemplaza 'nombre_del_directorio' con el nombre de tu directorio
                // Comprueba si el directorio existe
                if (!fs.existsSync(directorio)) {
                    // Si no existe, crea el directorio
                    fs.mkdirSync(directorio);
                } 

                const browser = await puppeteer.launch({ headless: false }); // Abre un nuevo navegador
                const page = await browser.newPage(); // Abre una nueva página
                await page.setViewport({
                    width: 1920,
                    height: 1080,
                });
                // agent = await browser.userAgent();
                // console.log(agent)
                // Guardar las cookies en un archivo o base de datos
                // Navega a una URL
                await page.goto('https://old.reddit.com');
                // const cookies = await page.cookies();
                // fs.writeFileSync('cookies.json', JSON.stringify(cookies));
                // Toma una captura de pantalla de la página
                await page.screenshot({ path: directorio + '/captura.png' });


                // Localiza el campo de entrada por su atributo "name"
                const inputUser = await page.$('input[name="user"]');
                const inputPassword = await page.$('input[name="passwd"]');

                await inputUser.type(user.reddit_name, { delay: 50 });
                await inputPassword.type(user.reddit_password, { delay: 50 });

                // Emula la tecla "Enter" para enviar el formulario

                await page.screenshot({ path: directorio + '/captura1.png' });

                await page.keyboard.press('Enter');


                await page.screenshot({ path: directorio + '/captura2.png' });
                // Hacer clic en el botón "Iniciar sesión" por su texto
                // await page.click('button[type="submit"]');

                // Puedes ajustar el selector CSS según la estructura HTML de tu página

                // Esperar a que la página termine de cargar (puede ser opcional)
                // await page.waitForNavigation();
                await page.waitForSelector('.userkarma');

                await page.screenshot({ path: directorio + '/captura3.png' });

                await Promise.all([
                    page.goto(`https://old.reddit.com/${post.subreddits}/submit`)
                ]);

                await page.screenshot({ path: directorio + '/captura4.png' });

                const inputUrl = await page.$('input[name="url"]');
                const inputTitle = await page.$('textarea[name="title"]');
                // const buttonSave = await page.$('button[name="submit"]');

                await inputUrl.type(post?.file_url, { delay: 50 });
                await inputTitle.type(post?.titulo, { delay: 50 });
                await page.$eval('button[name="submit"]', el => el.click());

                await page.waitForNavigation();

                await page.screenshot({ path: directorio + '/captura5.png' });

                // Cierra el navegador
                await browser.close();

                suc(true)
            } catch (e) {
                console.log(e)
                rej(false)
                return false
            }
        })
    }
}