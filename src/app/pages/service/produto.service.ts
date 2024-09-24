import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProdutoModel, ProdutoResponse } from '../models/produto';

@Injectable({
  providedIn: 'root',
})



export class ProdutoService {
  private urlBase = environment.SERVER;
  public newUsers = new BehaviorSubject<boolean>(false);
  private produtoIdSubject = new BehaviorSubject<ProdutoResponse | null>(null); // Alterado para um único ProdutoModel

  constructor(private httpClient: HttpClient) { }

  public createProduto(produto: ProdutoModel): Observable<ProdutoModel> {
    return this.httpClient.post<ProdutoModel>(`${this.urlBase}/products`,
      {
        ...produto,
        price: Number(produto.price),
        quantityInStock: Number(produto.quantityInStock),
      });
  }

  public getAllProducts(): Observable<ProdutoResponse> {
    return this.httpClient.get<ProdutoResponse>(`${this.urlBase}/products/search/1`);
  }

  // public updateProduto(id: number, cadProduto: ProdutoModel): Observable<any> {
  //   return this.httpClient.put<any>(`${this.urlBase}/imoveis/${id}`, cadProduto);
  // }

  // public deletar(id: number): Observable<any> { // Modificado para retornar Observable<any>
  //   return this.httpClient.delete<any>(`${this.urlBase}/imoveis/${id}`);
  // }

  // public setProdutoEdition(produto: ProdutoModel | null): void { // Alterado para ProdutoModel ou null
  //   this.produtoIdSubject.next(produto);
  // }

  // public getProdutoEdition(): Observable<ProdutoModel | null> { // Alterado para Observable<ProdutoModel | null>
  //   return this.produtoIdSubject.asObservable();
  // }
}
