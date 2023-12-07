import { prisma } from "../util/prisma/index.js";
import { ProductsRepositoy } from "../respositories/products.repository.js";
export class ProductsServcie {

  productsRepositoy = new ProductsRepositoy();
  createProduct = async (title, description, userId, userName) => {
    if (!title) {
      return res.status(400).json({
        success: false,
        message: '제목 입력이 필요합니다.',
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: '설명 입력이 필요합니다.',
      });
    }
    const product = this.productsRepositoy.createProduct(title, description, userId, userName);
    return product
  }

  updateproduct =async(productId,title,description,status,UserId,name)=>{
    if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
      });
    }

    const isValidStatus = status
      ? status === 'FOR_SALE' || status === 'SOLD_OUT'
      : true;

    if (!isValidStatus) {
      return res.status(400).json({
        success: false,
        message: '지원하지 않는 상태입니다. (status: FOR_SALE | SOLD_OUT)',
      });
    }
    const product = await prisma.Products.findFirst(+productId);
        
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '상품 조회에 실패했습니다.',
      });
    }

    // 작성자ID와 인증 정보의 사용자ID가 다른 경우
    const isProductOwner = product.userId === UserId;
    if (!isProductOwner) {
      return res.status(403).json({
        success: false,
        message: '상품 수정 권한이 없습니다.',
      });
    }
  
    const updateProduct = await this.productsRepositoy.updateproduct(productId,title,description,status,UserId)
    return updateProduct
    

  }
  deleteProduct = async (productId, UserId, name) => {
    

    const product = await prisma.products.findFirst(+productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '상품 조회에 실패했습니다.',
      });
    }

    // 작성자ID와 인증 정보의 사용자ID가 다른 경우
    const isProductOwner = product.userId === UserId;
    if (!isProductOwner) {
      return res.status(403).json({
        success: false,
        message: '상품 삭제 권한이 없습니다.',
      });
    }
    const deleteproduct = await this.productsRepositoy.deleteProduct(productId ,UserId);
    return deleteproduct
  }
  



}