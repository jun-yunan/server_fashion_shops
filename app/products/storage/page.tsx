"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  deleteProductToFirebase,
  getProductById,
  getProductsAll,
} from "@/firebase/config";
import { set, z } from "zod";
import { ProductType } from "@/types/products-type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import FormEditProduct from "@/components/product/form-edit-product";
import { ProductsSchema } from "@/models/products-schema";
import { Ellipsis } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function ProductStorage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<z.infer<typeof ProductsSchema> | null>(
    null
  );
  const { toast } = useToast();
  const [reload, setReload] = useState(false);
  const [productId, setProductId] = useState<string>("" as string);
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsAll();

      if (!products) {
        return;
      }
      const productsData = products.docs.map(
        (doc) => doc.data() as ProductType
      );
      setProducts(productsData);
      setReload(false);
    };
    fetchProducts();
  }, [reload]);

  const handleClick = async (productId: string) => {
    setProductId(productId);
    await getProductById(productId).then((data) => {
      setProduct(data as ProductType);
    });
    // console.log(productId);
    setIsOpen(true);
    // router.push(`/products/edit?productId=${productId}`);
  };

  const handleDeteleProduct = async () => {
    await deleteProductToFirebase(productId)
      .then(() => {
        setReload(true);
        setIsDelete(false);
        toast({
          title: "Successfully!",
          description: "Delete product to firebase successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {product && (
        <Dialog
          open={isOpen}
          onOpenChange={() => {
            setIsOpen(false);
            setProduct(null);
          }}
        >
          <DialogContent className="sm:max-w-md lg:max-w-[800px]">
            <Card>
              <CardHeader>
                <CardTitle>Update Product</CardTitle>
              </CardHeader>
              <CardContent>
                <FormEditProduct
                  product={product}
                  productId={productId}
                  setIsOpen={setIsOpen}
                  setReload={setReload}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Label
                  htmlFor="submit-form"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "
                >
                  Save
                </Label>
              </CardFooter>
            </Card>
            {/* <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogClose>Yes, delete</DialogClose>
          </DialogFooter> */}
          </DialogContent>
        </Dialog>
      )}
      <Dialog open={isDelete} onOpenChange={() => setIsDelete(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this product?
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDelete(false)}>
              Cancel
            </Button>

            <Button onClick={() => handleDeteleProduct()}>Yes, delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"> Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.productId}
              // onClick={() => handleClick(product.productId)}
              className="font-medium cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <TableCell className="font-medium truncate">
                {product.productId}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>
                <Image
                  src={product.images}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-md w-[50px] h-auto object-cover"
                />
              </TableCell>
              <TableCell>{product.size}</TableCell>

              <TableCell>{product.category}</TableCell>
              <TableCell>{product.material}</TableCell>
              <TableCell>{product.color}</TableCell>

              <TableCell>{product.stock}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Chose Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleClick(product.productId)}
                    >
                      Edit product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setProductId(product.productId);
                        setIsDelete(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">${}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
