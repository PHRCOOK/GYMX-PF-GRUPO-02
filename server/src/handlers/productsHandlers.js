const {getProductServices, getProductServicesById, getProductServicesByName, createProductServices, updateProductServices, deleteProductServices, filterByCategory, orderByPrice, productfilter, filterAndOrder} = require('../controllers/productsController');

const getProductServicesHandler = async (req, res) => {
    try {
        const response = await getProductServices();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const getProductServicesByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getProductServicesById(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const getProductServicesByNameHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const response = await getProductServicesByName(name);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message}) // Envía el mensaje de error en lugar del objeto de error
    };
}

const createProductServicesHandler = async (req, res) => {
    const { name, price, description, status, code, image_url, stock, category_id } = req.body;
    try {
        const response = await createProductServices(name, price, description, status, code, image_url, stock, category_id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const updateProductServicesHandler = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, status, code, image_url, stock } = req.body;
    try {
        const response = await updateProductServices(id, { name, price, description, status, code, image_url, stock });
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const deleteProductServicesHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteProductServices(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};

const filterByCategoryHandler = async (req, res) => {
    const { category_id } = req.params;
    try {
        const response = await filterByCategory(category_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const orderByPriceHandler = async (req, res) => {
    const { minPrice, maxPrice, sortOrder } = req.query;

    try {
        const response = await orderByPrice(minPrice, maxPrice, sortOrder);
        res.status(200).json(response);
    } catch (error) {
        console.error(error); // Imprime el error en la consola para obtener más detalles
        res.status(400).json({error: error.message})
    }
};

const productfilterHandler = async (req, res) => {
    const { category_id, name, code } = req.query;

    try {
        const response = await productfilter(category_id, name, code);
        res.status(200).json(response);
    } catch (error) {
        console.error(error); // Imprime el error completo en la consola para obtener más detalles
        res.status(400).json({ error: error.message || "Error desconocido" });
    }
};


const productFilterAndOrderHandler = async (req, res) => {
    const { category_id, name, code,  minPrice, maxPrice, sortOrder } = req.query;
    console.log("esto es lo que viene por query",minPrice, maxPrice)

    try {
        const response = await filterAndOrder (sortOrder, minPrice, maxPrice, category_id, name, code);
        res.status(200).json(response);
    } catch (error) {
        console.error(error); // hay que quitarlo despues
        res.status(400).json({ error: error.message || "Error desconocido" });
    }
};


module.exports = {
    getProductServicesHandler,
    getProductServicesByIdHandler,
    getProductServicesByNameHandler,
    createProductServicesHandler,
    updateProductServicesHandler,
    deleteProductServicesHandler,
    filterByCategoryHandler,
    orderByPriceHandler,
    productfilterHandler,
    productFilterAndOrderHandler,

};