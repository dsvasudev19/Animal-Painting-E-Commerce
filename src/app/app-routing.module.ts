import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { AddProductComponent } from './product/add-product/add-product.component';

const routes: Routes = [
  {path:"",redirectTo:"/products",pathMatch:"full"},
  {path:"products",component:ProductListComponent},
  {path:"cart",component:CartViewComponent},
  {path:"add-product",component:AddProductComponent},
  {path:"edit-product/:id",component:AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
