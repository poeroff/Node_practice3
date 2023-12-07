import { ProductsServcie } from "../services/products.service.js";
import { prisma } from "../util/prisma/index.js";


export class ProductsController {
    productsServcie = new ProductsServcie();
    createproduct = async(req,res,next)=>{
        try {
            const { UserId: UserId, name: name } = res.locals.user;
            const { title, description } = req.body;
            const createProduct = await this.productsServcie.createProduct(title,description,UserId,name)
            return res.status(201).json({
              success: true,
              message: '상품 생성에 성공했습니다.',
              data: createProduct,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
          }
    }
    searchproduct = async(req,res,next)=>{
        try {
            const products = await prisma.Products.findMany({
              select: {
                productId: true,
                title: true,
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
            console.error(error);
            return res.status(500).json({
              success: false,
              message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
          }
    }
    listproduct = async(req,res,next)=>{
        try {
            const { productId } = req.params;
        
            const product = await prisma.Products.findFirst(+productId);
        
            if (!product) {
              return res.status(404).json({
                success: false,
                message: '상품 조회에 실패했습니다.',
              });
            }
        
            return res.status(200).json({
              success: true,
              message: '상품 목록 조회에 성공했습니다.',
              data: product,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
          }
    }
    updateproduct = async(req,res,next)=>{
        try {
            const { productId } = req.params;
            const { title, description, status } = req.body;
            const { UserId: UserId, name: name } = res.locals.user;

            const updateproduct = await this.productsServcie.updateproduct(productId,title,description,status,UserId,name);
            // 수정 정보가 하나도 없는 경우
            
        
            // 일치하는 상품이 존재하지 않는 경우
           
        
          
           
            return res.status(200).json({
              success: true,
              message: '상품 수정에 성공했습니다.',
              data: updateproduct,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
          }
    }
    deleteproduct = async(req,res,next)=>{
        try {
            const { productId } = req.params;
            const { UserId: UserId, name: name } = res.locals.user;


            const deleteproduct = await this.productsServcie.deleteProduct(productId, UserId, name)

            return res.status(200).json({
              success: true,
              message: '상품 삭제에 성공했습니다.',
              data: deleteproduct,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
            });
          }
    }
}