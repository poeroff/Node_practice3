import { ProductsServcie } from "../services/products.service.js";
import { prisma } from "../util/prisma/index.js";


export class ProductsController {
    productsService = new ProductsServcie();
    createproduct = async(req,res,next)=>{
        try {
            const { UserId: UserId, name: name } = res.locals.user;
            const { title, description } = req.body;
            const createProduct = await this.productsService.createProduct(title,description,UserId,name)
            return res.status(201).json({
              success: true,
              message: '상품 생성에 성공했습니다.',
              data: createProduct,
            });
          } catch (error) {
            return res.status(500).json({
              success: error.success,
              message: error.message,
            });
          }
    }
    searchproduct = async(req,res,next)=>{
        try {

          const searchproduct =  await this.productsService.searchproduct();
            const products = await prisma.Products.findMany({
              select: {
                productId: true,
                title: true,
                userId : true,
                description : true,
                userName : true,
                createdAt: true,
                updatedAt: true,
              },
              orderBy: {createdAt :  'desc'},
            });
            return res.status(200).json({
              success: true,
              message: '상품 목록 조회에 성공했습니다.',
              data: products,
            });
          } catch (error) {
          
            return res.status(500).json({
              success: false,
              message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
          }
    }
    listproduct = async(req,res,next)=>{
        try {
            const { productId } = req.params;
            const listproduct = await this.productsService.listproducts(productId)
            return res.status(200).json({
              success: true,
              message: '상품 목록 조회에 성공했습니다.',
              data: listproduct,
            });
          } catch (error) {
           
            return res.status(500).json({
              success: error.success,
              message: error.message,
            });
          }
    }
    updateproduct = async(req,res,next)=>{
        try {
            const { productId } = req.params;
            const { title, description, status } = req.body;
            const { UserId: UserId, name: name } = res.locals.user;

            const updateproduct = await this.productsService.updateproduct(productId,title,description,status,UserId,name);
           
            return res.status(200).json({
              success: true,
              message: '상품 수정에 성공했습니다.',
              data: updateproduct,
            });
          } catch (error) {
           
            return res.status(500).json({
              success: error.success,
              message: error.message,
            });
          }
    }
    deleteproduct = async(req,res,next)=>{
        try {
            const { productId } = req.params;
            const { UserId: UserId, name: name } = res.locals.user;


            const deleteproduct = await this.productsService.deleteProduct(productId, UserId)

            return res.status(200).json({
              success: true,
              message: '상품 삭제에 성공했습니다.',
              data: deleteproduct,
            });
          } catch (error) {
           
            return res.status(500).json({
              success: error.success,
              message: error.message,
            });
          }
    }
}