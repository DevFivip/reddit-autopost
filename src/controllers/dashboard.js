module.exports = {
    index(req, res) {
        ProductModel.getAll((error, products) => {
            if (error) {
                console.error('Error al obtener los productos:', error);
            } else {
                renderPage(res, 'src/views/product/index.ejs', { products });
            }
        });
    }
};