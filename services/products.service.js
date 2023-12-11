import { prisma } from "../util/prisma/index.js";
import { ProductsRepositoy } from "../respositories/products.repository.js";
export class ProductsServcie {

  productsRepositoy = new ProductsRepositoy();
  createProduct = async (title, description, userId, userName) => {
    if (!title) {
      const error = new Error('제목 입력이 필요합니다.') 
      error.success = false;
      throw error;
    }
    if (!description) {
      const error = new Error('설명 입력이 필요합니다.') 
      error.success = false;
      throw error;
    }
    const product = this.productsRepositoy.createProduct(title, description, userId, userName);
    return product
  }


  searchproduct = async() =>{
    const searchproduct = this.productsRepositoy.searchproduct();
    return searchproduct

  }

  listproducts = async(productId) => {

    const listproduct = await this.productsRepositoy.listproduct(productId);
    return listproduct
  }

  updateproduct =async(productId,title,description,status,UserId)=>{
    if ( (typeof title !== "String" ||  !title ) || (typeof description !== "String" || !description) ||  (typeof status !== "String" || !status)) {
      const error = new Error('수정 정보는 최소 한 가지 이상이어야 합니다.') 
      error.success = false;
      throw error;
    }
    if (title === undefined && description === undefined && status === undefined){
      const error = new Error('수정 정보는 최소 한 가지 이상이어야 합니다.') 
      error.success = false;
      throw error;

    }
    const isValidStatus = status
      ? status === 'FOR_SALE' || status === 'SOLD_OUT'
      : true;
    if (!isValidStatus) {
      const error = new Error('지원하지 않는 상태입니다. (status: FOR_SALE | SOLD_OUT)') 
      error.success = false;
      throw error;
    }
    const updateProduct = await this.productsRepositoy.updateproduct(productId,title,description,status,UserId)
    return updateProduct
  }

  deleteProduct = async (productId, UserId) => {
    const deleteproduct = await this.productsRepositoy.deleteProduct(productId ,UserId);
    return deleteproduct
  }
  



}