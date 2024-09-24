// export interface ProductModel {
//   id?: any;
//   name: string;
//   code: string;
//   description: string;
//   price: number;
//   quantityInStock: number;
//   category: string;
//   // active: boolean
// }

// export interface ProdutoModel {
//   products: ProductModel[];
//   total: number;
//   currentPage: number;
//   nextPage: boolean;
//   prevPage: boolean;
//   lastPage: number;
// }

export interface ProdutoModel {
  id?: any;
  name: string;
  code: string;
  description: string;
  price: number;
  quantityInStock: number;
  category: string;
  active: boolean
}

export interface ProdutoResponse {
  products: ProdutoModel[];
  total: number;
  currentPage: number;
  nextPage: boolean;
  prevPage: boolean;
  lastPage: number;
}
