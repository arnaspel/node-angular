import {Product} from './product.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class ProductsService {
  private  products: Product[]=[];
  private productsUpdated = new Subject<Product[]>();
  
    constructor(private http: HttpClient){}


  getProducts() {
    this.http.get<{count:number, products: any}>(environment.apiUrl+'/products')
    .pipe(map((productData)=>{
        return productData.products.map(product=>{
            return{
                name: product.name,
                content: product.content,
                id: product._id
            };
        });
    }))
    .subscribe((transformedProducts)=>{
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
    });
    
    }   
    
  getProductUpdateListener(){
      return this.productsUpdated.asObservable();
  }
  
  getProduct(id: string){
      return this.http.get<{_id:string, name: string, content: string}>(environment.apiUrl+"/products/"+id);
  }

  updateProduct(id: string, name: string, content: string){
        const product: Product = { id: id, name: name, content: content};
        this.http.put(environment.apiUrl+"/products/"+id, product)
        .subscribe(response => console.log(response));
  }

  addProduct(name: string, content: string) {
      const product: Product = {id: null, name:name, content:content};
      this.http.post<{message:string, productId: string}>(environment.apiUrl+'/products', product)
      .pipe()
      .subscribe((responseData)=>{
        const id = responseData.productId;
        product.id = id;
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
      });
  }

  deleteProduct(productId: string){
      this.http.delete(environment.apiUrl+'/products/'+productId)
      .subscribe(()=>{
       const updatedProducts = this.products.filter(product => product.id !== productId);
       this.products = updatedProducts;
       this.productsUpdated.next([...this.products]);
      });

  }

}

