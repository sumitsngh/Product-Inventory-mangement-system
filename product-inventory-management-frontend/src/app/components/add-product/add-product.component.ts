import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent{
  product: any = {};

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.router.navigate(['/inventory/home']);
        },
        error: (error: any) => {
          console.error('Error adding product:', error);
        }
      }
    );
  }
}
