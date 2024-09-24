
export interface ProdutoModel {
  _id?: any;
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
