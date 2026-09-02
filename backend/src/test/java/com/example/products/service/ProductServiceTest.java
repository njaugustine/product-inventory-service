package com.example.products.service;

import com.example.products.dto.CreateProductRequest;
import com.example.products.dto.ProductResponse;
import com.example.products.entity.Product;
import com.example.products.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Field;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getProductsReturnsMappedResponses() throws Exception {
        Product product = new Product("Keyboard");
        setField(product, "id", 1L);

        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductResponse> result = productService.getProducts();

        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).id());
        assertEquals("Keyboard", result.get(0).name());
    }

    @Test
    void createProductSavesEntityAndReturnsResponse() throws Exception {
        Product savedProduct = new Product("Monitor");
        setField(savedProduct, "id", 2L);

        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        ProductResponse result = productService.createProduct(new CreateProductRequest("Monitor"));

        assertEquals(2L, result.id());
        assertEquals("Monitor", result.name());
    }

    private void setField(Product product, String fieldName, Object value) throws Exception {
        Field field = Product.class.getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(product, value);
    }
}
