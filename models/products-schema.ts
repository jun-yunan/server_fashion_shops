import * as z from "zod";

export const ProductsSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  images: z.string(),
  category: z.string(),
  brand: z.string(),
  size: z.string(),
  color: z.string(),
  material: z.string(),
  rating: z.string(),
  reviews: z.string(),
  discount: z.string(),
  stock: z.string(),
  saleCount: z.string(),
});

/*
  final String productId;
  final String name;
  final String description;
  final double price;
  final List<String> images;
  final String categoryId; // Danh mục sản phẩm
  final String brand; // Thương hiệu
  final String size; // Kích thước
  final String color; // Màu sắc
  final String material; // Chất liệu
  final double rating; // Đánh giá
  final List<String> reviews; // Đánh giá từ người dùng
  final double discount; // Giảm giá
  final int stock; // Tồn kho
  final int saleCount; 
*/
