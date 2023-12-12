import { Star } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import { capitalize } from "~/lib/convert";
import handleFetch from "~/lib/fetch";
import { MotionDiv, MotionLi, MotionUl } from "~/lib/motion";
import { FakeProduct } from "~/types/ecommerce/fake-store-api";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const data = await handleFetch<FakeProduct>(
    `https://fakestoreapi.com/products/${id}`
  );
  return { title: data?.title };
}

export default async function Page({ params: { id } }: PageProps) {
  const product = await handleFetch<FakeProduct>(
    `https://fakestoreapi.com/products/${id}`
  );

  const same = await handleFetch<FakeProduct[]>(
    "https://fakestoreapi.com/products/category/jewelery?limit=4"
  );

  if (!product || !same) return <></>;

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex max-sm:flex-col gap-4 divide-x divide-black dark:divide-white">
        <CustomImage
          className="w-[300px] max-sm:w-full h-[300px] rounded overflow-hidden"
          fill
          objectFit="cover"
          src={product.image}
          alt={product.title}
        />
        <div className="flex-1 flex flex-col gap-2 pl-2">
          <b className="text-lg">{product.title}</b>
          <i className="text-stone-700 dark:text-stone-400">
            {capitalize(product.category)}
          </i>
          <b className="text-red-700">${product.price}</b>
        </div>
      </div>
      <div>{product.description}</div>
      <div className="flex flex-col gap-4 pt-2">
        <strong className="text-xl">CÁC SẢN PHẨM TƯƠNG TỰ</strong>
        <MotionUl className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
          {same.map((item, index) => (
            <Link key={item.id} href={`/ecommerce/fake-store-api/${item.id}`}>
              <MotionLi
                className="!relative bg-stone-500/50 dark:bg-stone-700/50 bg-opacity-50 p-2 rounded overflow-hidden"
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
                  className="h-[200px] max-md:h-[400px] max-sm:h-[200px] rounded overflow-hidden"
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
