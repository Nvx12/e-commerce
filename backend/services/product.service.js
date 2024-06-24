import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();

const createProduct = async (product) => {
    try {
        const createdProduct = await prisma.product.create({
            data: product
        });
        return createdProduct;
    } catch (error) {
        logger.error('Failed to create product:', error);
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });
        return product;
    } catch (error) {
        logger.error('Failed to get product:', error);
        throw error;
    }
};

const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (error) {
        logger.error('Failed to get products:', error);
        throw error;
    }
};


const updateProduct = async (id, productUpdates) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: productUpdates
        });
        return updatedProduct;
    } catch (error) {
        logger.error('Failed to update product:', error);
        throw error;
    }
};


const deleteProduct = async (id) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id }
        });
        return deletedProduct;
    } catch (error) {
        logger.error('Failed to delete product:', error);
        throw error;
    }
};

export default {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
};