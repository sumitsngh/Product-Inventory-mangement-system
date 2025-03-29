import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

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
}
