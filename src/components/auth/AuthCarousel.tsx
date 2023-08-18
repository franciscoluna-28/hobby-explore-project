import { QuotesWithLoading } from "./QuotesWithLoading";
type Props = {
  image: string;
};

// Carousel used to display an image with differerent quotes and one image
export default function AuthCarousel({ image }: Props) {
  return (

    <div className="group h-screen w-full max-w-lg shadow-xl relative order-2 row-auto hidden lg:block">
      <div
        className=" absolute inset-0 bg-cover bg-center max-w-lg h-screen"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <QuotesWithLoading />
    </div>

  );
}
