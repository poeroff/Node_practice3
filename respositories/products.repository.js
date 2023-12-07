import { prisma } from "../util/prisma/index.js"
export class ProductsRepositoy{
    createProduct = async(title, description, userId ,userName) => {
      
        const product = await prisma.Products.create({data : { title : title , description : description, userId : userId , userName : userName}})

        return product
    }

    deleteProduct = async(productId,UserId) =>{

        const deleteproduct = await prisma.Products.delete({ where :{ userId: +UserId , productId : +productId}} );
        return deleteproduct;

    }
    updateproduct = async(productId,title,description,status,UserId)=>{
        
        const updateproduct = await prisma.Products.update({where :{ productId : +productId}, data :{
            title : title , description :description ,status :status
        }});
        return updateproduct
    }



}


