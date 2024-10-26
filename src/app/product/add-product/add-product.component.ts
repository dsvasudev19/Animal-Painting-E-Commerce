import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  addProductForm: FormGroup = new FormGroup({});
  productFound: any = {};
  productId:number|null=null;
  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      image_url: ['Product_01.jpg', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.productId=parseInt(id)
      this.productService
        .getProductById(parseInt(id))
        .subscribe((data) => this.addProductForm.patchValue(data));
    }
  }

  onSubmit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.productService.editProductById(parseInt(id),this.addProductForm.value).subscribe({
        next:()=>{
          this.snackBar.open("Product Edit Successfully","Done",{
            duration:200,
            horizontalPosition:"left",
            verticalPosition:"top"
          })
        },
        error:(error:Error)=>{
          console.log(error)
        }
      })
    } else {
      this.productService.addNewProduct(this.addProductForm.value).subscribe({
        next: () => {
          this.snackBar.open('Product Added', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.router.navigate(['/', 'products']);
        },
      });
    }
  }
}
