package com.example.products.controller;

import com.example.products.dto.CreateProductRequest;
import com.example.products.dto.ProductResponse;
import com.example.products.service.ProductService;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    @Test
    void getProductsReturnsListFromService() {
        when(productService.getProducts())
                .thenReturn(List.of(new ProductResponse(1L, "Keyboard")));

        List<ProductResponse> result = productController.getProducts();

        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).id());
        assertEquals("Keyboard", result.get(0).name());
    }

    @Test
    void createProductReturnsCreatedProduct() {
        when(productService.createProduct(any(CreateProductRequest.class)))
                .thenReturn(new ProductResponse(2L, "Mouse"));

        ProductResponse result = productController.createProduct(new CreateProductRequest("Mouse"));

        assertEquals(2L, result.id());
        assertEquals("Mouse", result.name());
    }

    @Test
    void createProductRequestRejectsBlankName() {
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

        var violations = validator.validate(new CreateProductRequest("   "));

        assertFalse(violations.isEmpty());
    }
}
