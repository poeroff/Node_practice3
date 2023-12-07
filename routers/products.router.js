import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import { ProductsController } from '../controllers/products.controller.js';
import db from '../models/index.cjs';

const productsRouter = Router();

const product = new ProductsController();


// 생성
productsRouter.post('', needSignin, product.createproduct);

// 목록 조회
productsRouter.get('', product.searchproduct);

// 상세 조회
productsRouter.get('/:productId', product.listproduct);

// 수정
productsRouter.put('/:productId', needSignin, product.updateproduct);

// 삭제
productsRouter.delete('/:productId', needSignin, product.deleteproduct);

export { productsRouter };
