package com.example.products.service;

import com.example.products.dto.CreateProductRequest;
import com.example.products.dto.ProductResponse;
import com.example.products.entity.Product;
import com.example.products.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductResponse(product.getId(), product.getName()))
                .toList();
    }

    public ProductResponse createProduct(CreateProductRequest request) {
        Product savedProduct = productRepository.save(new Product(request.name()));
        return new ProductResponse(savedProduct.getId(), savedProduct.getName());
    }
}
