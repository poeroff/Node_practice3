import { prisma } from "../util/prisma/index.js"
export class ProductsRepositoy {
    createProduct = async (title, description, userId, userName) => {
        const product = await prisma.Products.create({ data: { title: title, description: description, userId: userId, userName: userName } })
        return product
    }

    listproduct = async (productId) => {
        const product = await prisma.Products.findFirst({ where: { productId: +productId } });
        if (!product) {
            const error = new Error('상품 조회에 실패했습니다.')
            error.success = false;
            throw error;
        }
        return product;

    }

    deleteProduct = async (productId, UserId) => {
        const product = await prisma.products.findFirst({ where: { productId: +productId } });
        if (!product) {
            const error = new Error('상품 조회에 실패했습니다.')
            error.success = false;
            throw error;

        }
        // 작성자ID와 인증 정보의 사용자ID가 다른 경우
        const isProductOwner = product.userId === UserId;
        if (!isProductOwner) {
            const error = new Error('상품 삭제 권한이 없습니다.')
            error.success = false;
            throw error;
        }
        const deleteproduct = await prisma.Products.delete({ where: { userId: +UserId, productId: +productId } });
        return deleteproduct;

    }
    updateproduct = async (productId, title, description, status, UserId) => {
        const product = await prisma.Products.findFirst({ where: { productId: +productId } });
        if (!product) {
            const error = new Error('상품 조회에 실패했습니다.')
            error.success = false;
            throw error;
        }
        // 작성자ID와 인증 정보의 사용자ID가 다른 경우
        const isProductOwner = product.userId === UserId;
        
        if (!isProductOwner) {
            const error = new Error('상품 수정 권한이 없습니다.')
            error.success = false;
            throw error;

        }
        const updateproduct = await prisma.Products.update({
            where: { productId: +productId }, data: {
                title: title, description: description, status: status
            }
        });
        return updateproduct
    }



}


