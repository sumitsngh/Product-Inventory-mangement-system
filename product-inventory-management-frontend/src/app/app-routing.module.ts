import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: 'inventory', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth/sign-in', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { 
    path: 'inventory/home', 
    component: HomeComponent,
  },
  {
    path: 'inventory/product-detail/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'inventory/update-product/:id',
    component: EditProductComponent,
  },
  {
    path: 'inventory/add-product',
    component: AddProductComponent,
  },
  { path: '**', redirectTo: '/inventory' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
