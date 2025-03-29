import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterPipe } from '../../filters/filter.pipe';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
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

  viewProduct(productId: number): void {
    this.router.navigate(['/inventory/product-detail', productId]);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/inventory/update-product', productId]);
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product deleted successfully!');
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }

  addProduct(): void {
    this.router.navigate(['/inventory/add-product']);
  }
}
