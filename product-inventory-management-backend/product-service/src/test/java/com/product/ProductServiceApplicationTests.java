package com.product;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.product.model.Product;
import com.product.repository.ProductRepository;
import com.product.service.ProductServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ProductServiceApplicationTests {

	@Mock
	private ProductRepository productRepository;

	@InjectMocks
	private ProductServiceImpl productService;

	private Product product;

	@BeforeEach
	void setUp() {
		product = new Product(1L, "Laptop", "Gaming Laptop", "Dell", 1200.00, 10);
	}

	@Test
	void testGetAllProducts() {
		List<Product> productList = Arrays.asList(product);
		when(productRepository.findAll()).thenReturn(productList);
		List<Product> result = productService.getAllProducts();
		assertEquals(1, result.size());
		verify(productRepository, times(1)).findAll();
	}

	@Test
	void testGetProductById() {
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));

		Optional<Product> result = productService.getProductById(1L);

		assertTrue(result.isPresent());
		assertEquals("Laptop", result.get().getName());
		verify(productRepository, times(1)).findById(1L);
	}

	@Test
	void testAddProduct() {
		when(productRepository.save(product)).thenReturn(product);
		Product savedProduct = productService.addProduct(product);
		assertNotNull(savedProduct);
		assertEquals("Laptop", savedProduct.getName());
		verify(productRepository, times(1)).save(product);
	}
}
