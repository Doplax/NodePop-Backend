import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {
  constructor(
    private productsService: ProductsService
  ){}


    getProducts(){
      this.productsService.getAllProducts().subscribe( data => {
        console.log(data);
      }, err => {
        console.log("Hubo el siguiente error: " + err);
      })
    }

}
