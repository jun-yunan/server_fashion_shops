"use client";

import { FunctionComponent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductsSchema } from "@/models/products-schema";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardHeader } from "../ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
// import { ToastAction } from "../ui/toast";
import { updateProductToFirebase } from "@/firebase/config";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface FormEditProductProps {
  product: z.infer<typeof ProductsSchema>;
  productId: string;
  setIsOpen: (value: boolean) => void;
  setReload: (value: boolean) => void;
}

const FormEditProduct: FunctionComponent<FormEditProductProps> = ({
  product,
  productId,
  setIsOpen,
  setReload,
}) => {
  const [inputImageUrl, setInputImageUrl] = useState<string | null>(null);
  const { toast } = useToast();
  //   console.log("product", product);
  const router = useRouter();
  console.log(productId);

  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: {
      brand: product.brand,
      category: product.category,
      color: product.color,
      description: product.description,
      discount: product.discount,
      images: product.images,
      material: product.material,
      name: product.name,
      price: product.price,
      rating: product.rating,
      reviews: product.reviews,
      saleCount: product.saleCount,
      size: product.size,
      stock: product.stock,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductsSchema>) => {
    console.log("Submit: ", values);

    await updateProductToFirebase(productId, values)
      .then((value) => {
        toast({
          title: "Successfully!",
          description: "Add product to firebase successfully!",
        });
        setIsOpen(false);
        router.refresh();
        setReload(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="grid w-full items-center gap-4 h-[400px]">
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter name description."
                      type="text"
                      defaultValue={product.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      // disabled={isPending}
                      placeholder="Enter product description."
                      defaultValue={product.description}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder=""
                      type="number"
                      defaultValue={product.price}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                    defaultValue={product.category || field.value}
                    // value={product?.category}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose fashion style." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Shirts">Shirts</SelectItem>
                      <SelectItem value="Shorts">Shorts</SelectItem>
                      <SelectItem value="Stock & Tights">
                        Stock & Tights
                      </SelectItem>

                      <SelectItem value="Jeans">Jeans</SelectItem>

                      <SelectItem value="T-shirts">T-shirts</SelectItem>

                      <SelectItem value="Dresses">Dresses</SelectItem>
                      <SelectItem value="Shoes">Shoes</SelectItem>

                      <SelectItem value="Pyjamas">Pyjamas</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={product.brand || field.value}
                    // value={product?.brand}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a fashion brand." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Adidas">Adidas</SelectItem>
                      <SelectItem value="Calvin Klein">Calvin Klein</SelectItem>
                      <SelectItem value="Polo Ralph Lauren">
                        Polo Ralph Lauren
                      </SelectItem>
                      <SelectItem value="Monki">Monki</SelectItem>
                      <SelectItem value="New Balance">New Balance</SelectItem>
                      <SelectItem value="New Look">New Look</SelectItem>
                      <SelectItem value="On Running">On Running</SelectItem>
                      <SelectItem value="& Other Stories">
                        & Other Stories
                      </SelectItem>
                      <SelectItem value="Pull&Bear">Pull&Bear</SelectItem>
                      <SelectItem value="Puma">Puma</SelectItem>
                      <SelectItem value="River Island">River Island</SelectItem>
                      <SelectItem value="The North Face">
                        The North Face
                      </SelectItem>
                      <SelectItem value="Weekday">Weekday</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={product.size || field.value}
                    // value={product?.size}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose clothing size." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={product.color || field.value}
                    // value={product?.color}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Fashionable colors." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="White">White</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Gray">Gray</SelectItem>
                      <SelectItem value="Blue">Blue</SelectItem>
                      <SelectItem value="Cream">Cream</SelectItem>
                      <SelectItem value="Latte">Latte</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={product.material || field.value}
                    // value={product?.material}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Fashion material." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Cotton">Cotton</SelectItem>
                      <SelectItem value="Polyester">Polyester</SelectItem>
                      <SelectItem value="Silk">Silk</SelectItem>
                      <SelectItem value="Wool">Wool</SelectItem>
                      <SelectItem value="Denim">Denim</SelectItem>
                      <SelectItem value="Leather">Leather</SelectItem>
                      <SelectItem value="Linen">Linen</SelectItem>
                      <SelectItem value="Velvet">Velvet</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={product.rating || field.value}
                    // value={product?.rating}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="choose stars to rate fashion." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 star</SelectItem>
                      <SelectItem value="2">2 star</SelectItem>
                      <SelectItem value="3">3 star</SelectItem>
                      <SelectItem value="4">4 star</SelectItem>
                      <SelectItem value="5">5 star</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder=""
                      type="number"
                      defaultValue={product.discount}
                      // value={product?.discount}
                    />
                  </FormControl>
                  <FormDescription>Convert to percentage.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder=""
                      defaultValue={product.stock}
                      type="number"
                      // value={product?.stock}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="saleCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Count</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder=""
                      type="number"
                      defaultValue={product.saleCount}
                      // value={product?.saleCount}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mb-5 mx-2">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      // defaultValue={product.images}
                      value={inputImageUrl || product.images}
                      placeholder=""
                      type="text"
                      onChange={(event) => {
                        setInputImageUrl(event.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <input type="submit" id="submit-form" hidden />
      </form>
    </Form>
  );
};

export default FormEditProduct;
