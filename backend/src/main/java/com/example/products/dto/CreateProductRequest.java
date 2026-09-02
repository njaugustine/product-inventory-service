package com.example.products.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateProductRequest(
        @NotBlank(message = "Product name is required")
        String name
) {}
