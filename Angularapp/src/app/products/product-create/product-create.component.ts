import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {ProductsService} from '../products.service';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Product } from "../product.model";



@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{
    enteredContent= "";
    enteredName="";
    private mode = 'create';
    private productId: string;
    product: Product;
    

    constructor(public productsService: ProductsService, public route: ActivatedRoute){}
    ngOnInit(){
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has('productId')){
                this.mode ='edit';
                this.productId = paramMap.get('productId');
                this.productsService.getProduct(this.productId).subscribe(productData => {
                    this.product = {id: productData._id, name: productData.name, content: productData.content};
                });
            }else{
                this.mode = 'create';
                this.productId = null;
            }
        });
    }

    onAddProduct(form: NgForm) {
        if (form.invalid){
            return;     
        }
        if (this.mode === 'create'){
            this.productsService.addProduct(form.value.name, form.value.content);
        }else{
            this.productsService.updateProduct(
                this.productId,
                form.value.name,
                form.value.content
            );
        }
        
        form.resetForm();
    }
}