import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterPipe } from '../../filters/filter.pipe';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, FormsModule, FilterPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  products: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
  viewProduct(): void {
    this.router.navigate(['/auth/sign-in']);
  }

  editProduct(): void {
    this.router.navigate(['/auth/sign-in']);
  }

  deleteProduct(): void {
    this.router.navigate(['/auth/sign-in']);
  }

  addProduct(): void {
    this.router.navigate(['/auth/sign-in']);
  }
}
