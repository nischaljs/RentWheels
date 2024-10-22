
import React from "react";
import { CarIcon, MapIcon, CompassIcon } from "lucide-react";
import { PrimaryButton } from "../components/ui/Buttons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8 relative">
          <CarIcon className="w-32 h-32 mx-auto text-blue-500 animate-bounce" />
          <MapIcon className="w-16 h-16 absolute top-0 left-1/4 text-red-400 animate-pulse" />
          <CompassIcon className="w-16 h-16 absolute bottom-0 right-1/4 text-yellow-400 animate-spin-slow" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Oops! Wrong Turn</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Looks like this vehicle has gone off-road. The page you're looking for doesn't exist.
        </p>
        <a href="/" className="inline-block">
          <PrimaryButton>
            Return to Home Base
          </PrimaryButton>
        </a>
      </div>
    </div>
  );
}
