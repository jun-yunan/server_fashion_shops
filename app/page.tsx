"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getProductsAll } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import HeaderHome from "@/components/home/header-home";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export type Product = {
  id: string;
  name: string;
  status: "pending" | "processing" | "success" | "failed";
  // description: string;
  price: string;
  // images: string;
  // category: string;
  // brand: string;
  // size: string;
  // color: string;
  // material: string;
  // rating: string;
  // reviews: string;
  // discount: string;
  // stock: string;
  // saleCount: string;
};
export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");
  const [dataTable, setDataTable] = React.useState<Product>({
    id: "",
    name: "",
    price: "",
    status: "pending",
  });

  console.log({ user });

  if (!user && !userSession) {
    router.push("/auth/sign-in");
  }

  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await getProductsAll();
  //       if (data != null) {
  //         //   console.log(data);

  //         setDataTable(data);
  //         console.log(dataTable);

  //         toast({
  //           title: "Success.",
  //           description: "Get data successfully.",
  //         });
  //       } else {
  //         setDataTable((prev) => prev);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description: "There was a problem with your request.",
  //         action: <ToastAction altText="Try again">Try again</ToastAction>,
  //       });
  //     }
  //   };
  //   getData();
  // }, []);

  return <main className="flex min-h-screen flex-col items-center"></main>;
}
