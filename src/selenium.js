const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
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
    await page.screenshot({ path: 'captura.png' });


    // Localiza el campo de entrada por su atributo "name"
    const inputUser = await page.$('input[name="user"]');
    const inputPassword = await page.$('input[name="passwd"]');

    if (inputUser) {
        console.log('input fund')
    }
    if (inputPassword) {
        console.log('input fund')
    }

    await inputUser.type('AlexNashor', { delay: 50 });
    await inputPassword.type('Adolfo2403', { delay: 50 });
    // Emula la tecla "Enter" para enviar el formulario
    await page.screenshot({ path: 'captura2.png' });

    await page.keyboard.press('Enter');

    // if (inputUser) {
    //     // Escribe el valor en el campo de entrada

    // } else {
    //     console.log('Campo de entrada no encontrado');
    // }

    await page.screenshot({ path: 'captura2.png' });
    // Hacer clic en el botón "Iniciar sesión" por su texto
    // await page.click('button[type="submit"]');

    // Puedes ajustar el selector CSS según la estructura HTML de tu página

    // Esperar a que la página termine de cargar (puede ser opcional)
    await page.waitForNavigation();

    await page.screenshot({ path: 'captura3.png' });

    await Promise.all([
        page.goto('https://old.reddit.com/r/bottest/submit')
        // page.click('button')
    ]);

    // await page.screenshot({ path: 'captura5.png' });

    const inputUrl = await page.$('input[name="url"]');
    const inputTitle = await page.$('textarea[name="title"]');
    // const buttonSave = await page.$('button[name="submit"]');


    // await inputUrl.type('https://i.imgur.com/hXAn4un.jpg', { delay: 50 });
    // await inputTitle.type('test title nene', { delay: 50 });
    // await page.$eval('button[name="submit"]', el => el.click());

    // await page.waitForNavigation();

    await page.screenshot({ path: 'captura4.png' });


    // Cierra el navegador
    await browser.close();
})();
