package com.product.service;

import java.util.List;
import java.util.Optional;

import com.product.model.Product;

public interface ProductService {
	public List<Product> getAllProducts();
	
	public Optional<Product> getProductById(Long id);
	
	public Product addProduct(Product product);
	
	public Product updateProduct(Long id, Product productDetails);

	public void deleteProduct(Long id);
}
