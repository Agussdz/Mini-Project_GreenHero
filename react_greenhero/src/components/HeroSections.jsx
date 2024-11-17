import { ShoppingCart, Search, User } from "lucide-react";

export default function HeroSections() {
  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 p-6">
              <h2 className="text-green-600 font-bold"># SUSTAINABLE</h2>
              <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-4">
                Protecting The Environment Through
                <span className="text-green-600"> Sustainable </span> <br />
                Agriculture
              </h1>
              <p className="text-gray-600 mb-6">
                Plants are not only a source of life but also a key to the
                sustainability of our planet. Learn how to farm wisely and
                sustainably for a better future.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300">
                  Get Started
                </button>
                <button className="border border-green-600 text-green-600 px-6 py-2 rounded-md hover:bg-green-700 hover:text-white transition duration-300">
                  Login
                </button>
              </div>
            </div>
            <div className="w-full md:w-[440px] relative p-6">
              <img
                src="https://png.pngtree.com/png-clipart/20230810/original/pngtree-people-growing-plants-flat-contour-vector-illustration-outline-nursery-linear-vector-picture-image_10274102.png"
                alt="Hanging plant"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
