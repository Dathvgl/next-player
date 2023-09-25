import { Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import Chip from "~/components/chip";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import { MotionDiv, MotionLi, MotionUl } from "~/lib/motion";
import { FakeProduct } from "~/types/ecommerce/fake-store-api";

export const metadata: Metadata = {
  title: "Fake store api",
};

export default async function Page() {
  const categoryRes = await fetch(
    "https://fakestoreapi.com/products/categories",
    {
      next: { revalidate: 60 },
    }
  );

  const productRes = await fetch("https://fakestoreapi.com/products?limit=10", {
    next: { revalidate: 60 },
  });

  const categorytData: string[] = await categoryRes.json();
  const productData: FakeProduct[] = await productRes.json();

  return (
    <div className="p-8 flex flex-col gap-4 divide-y divide-black dark:divide-white">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <strong className="text-xl">TẤT CẢ DANH MỤC</strong>
        </div>
        <div className="flex gap-4 justify-center">
          {categorytData.map((item) => (
            <Link key={item} href={`/ecommerce/fake-store-api/search?filter=${item}`}>
              <Chip text={item} />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-2">
        <div className="text-center">
          <strong className="text-xl">GỢI Ý HÔM NAY</strong>
        </div>
        <MotionUl
          className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8"
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          }}
        >
          {productData.map((item, index) => (
            <Link key={item.id} href={`/ecommerce/fake-store-api/${item.id}`}>
              <MotionLi
                className="!relative bg-stone-300 dark:bg-stone-700 bg-opacity-50 p-2 rounded overflow-hidden"
                initial="init"
                animate="animate"
                whileHover="hover"
                variants={{
                  init: { scale: 0, border: "0px solid red" },
                  animate: {
                    scale: 1,
                    transition: { delay: 0.2 + index * 0.1 },
                  },
                  hover: {
                    position: "relative",
                    zIndex: 1,
                    scale: 1.1,
                    border: "1px solid red",
                    transition: { duration: 0.2 },
                  },
                }}
              >
                <MotionDiv
                  className="absolute top-0 left-0 z-[3] bg-red-500 text-black px-2 py-1 rounded-ss rounded-ee"
                  variants={{
                    init: { opacity: 0, scale: 0, x: -20, y: 8 },
                    hover: { opacity: 1, scale: 1, x: 8 },
                  }}
                >
                  <div className="flex items-center gap-1">
                    <LIcon icon={Star} color="yellow" size={20} />
                    <b>{item.rating.rate}</b>
                  </div>
                </MotionDiv>
                <CustomImage
                  className="h-[200px] max-md:h-[400px] rounded overflow-hidden"
                  fill
                  objectFit="cover"
                  src={item.image}
                  alt={item.title}
                />
                <b className="line-clamp-2">
                  {item.title}
                  <p className="text-transparent select-none">line</p>
                </b>
                <b className="text-red-700">${item.price}</b>
              </MotionLi>
            </Link>
          ))}
        </MotionUl>
      </div>
    </div>
  );
}
