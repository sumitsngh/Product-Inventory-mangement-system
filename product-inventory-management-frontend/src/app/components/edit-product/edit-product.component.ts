import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProductDetails(productId);
  }

  loadProductDetails(productId: number): void {
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.router.navigate(['/inventory/home']);
      }
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product.id, this.product).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/inventory/home']);
      },
      error: (error: any) => {
        console.error('Error updating product:', error);
      }
    });
  }
}
