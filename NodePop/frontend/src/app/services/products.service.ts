import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000'

  constructor(
    private Http: HttpClient
  ) { }

  getAllProducts(){
    return this.Http.get(this.apiUrl+'/products')
  }


}
