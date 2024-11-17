import { Link } from "react-router-dom";
import { Leaf, Phone, Droplets, Sprout, Flower, Star } from "lucide-react";

export default function Features() {
  return (
    <>
      {/* Plant Feature Section */}
      <section className="py-12 md:py-5 bg-white md:mb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">Sustainable Plants</h3>
              <p className="text-sm text-gray-500 mt-2">
                Explore a variety of plants that are easy to care for and
                support environmental sustainability.
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <Sprout className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">Plant Care Tips</h3>
              <p className="text-sm text-gray-500 mt-2">
                Learn eco-friendly plant care practices to nurture your plants
                while minimizing your environmental footprint.
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <Droplets className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">Water Conservation</h3>
              <p className="text-sm text-gray-500 mt-2">
                Learn water-efficient watering techniques that conserve
                resources and promote sustainability.
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <Flower className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">Organic Gardening</h3>
              <p className="text-sm text-gray-500 mt-2">
                Discover organic gardening methods that avoid harmful chemicals
                and promote environmental well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <section className="bg-gray-50 md:mb-3 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 md:mb-8 p-6">
              <h2 className="text-gray-900 font-bold md:text-4xl text-2xl mb-5 ">
                Access AI Features for Better{" "}
                <span className="text-green-600">Agriculture Insights</span>
              </h2>
              <p className="text-gray-700 mb-8">
                Interested in using AI to analyze your plants, soil, or farming
                practices? With our advanced AI tools, you can make smarter
                farming decisions, improve yields, and tackle challenges like
                pests or diseases.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="border font-semibold border-green-600 text-green-600 px-6 py-2 rounded-md hover:bg-green-700 hover:text-white transition duration-300"
                >
                  Login to Access AI
                </Link>
              </div>
            </div>
            <div className="w-full md:w-[440px] relative p-6">
              <img
                src="https://images.squarespace-cdn.com/content/v1/59cb502e1f318dc50f160957/d69c8d0e-0d23-432d-85a8-86abe1828bdf/plant+identification+apps.jpg?format=500w"
                alt="AI concept"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
