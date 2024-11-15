import React from "react";
import { Leaf, Phone, Droplets, Sprout, Flower, Star } from "lucide-react";

export default function Features() {
  return (
    <>
      <section className="py-12 md:py-5 bg-white">
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
    </>
  );
}
