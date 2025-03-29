package com.product.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.exception.ProductNotFoundException;
import com.product.model.Product;
import com.product.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	public Optional<Product> getProductById(Long id) {
		return productRepository.findById(id).or(() -> {
			throw new ProductNotFoundException("Product with ID " + id + " not found.");
		});
	}

	public Product addProduct(Product product) {
		return productRepository.save(product);
	}

	public Product updateProduct(Long id, Product productDetails) {
		return productRepository.findById(id).map(product -> {
			product.setName(productDetails.getName());
			product.setDescription(productDetails.getDescription());
			product.setManufacturer(productDetails.getManufacturer());
			product.setPrice(productDetails.getPrice());
			product.setQuantity(productDetails.getQuantity());
			return productRepository.save(product);
		}).orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found."));
	}

	public void deleteProduct(Long id) {
		if (!productRepository.existsById(id)) {
			throw new ProductNotFoundException("Product with ID " + id + " not found.");
		}
		productRepository.deleteById(id);
	}
}
