import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function AwardsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const awards = [
    {
      year: "2018",
      title: "PrafullaDhanukar Art Foundation Delhi City Merit Certificate Award",
      location: "Delhi",
      image: "/awards/award1.jpg",
    },
    {
      year: "2017",
      title: "PrafullaDhanukar Art Foundation Delhi City Award",
      location: "Delhi",
      image: "/awards/award2.jpg",
    },
    {
      year: "2017",
      title: "Young Artist Scholarship Award",
      organization: "Ministry of Culture, Government of India",
      location: "Delhi",
      image: "/awards/award3.jpg",
    },
    {
      year: "2017",
      title: "83rd All India Exhibition of Arts",
      location: "Amritsar, Punjab",
      image: "/awards/award4.jpg",
    },
    {
      year: "2017",
      title: "27 Art Point, All India 3rd Online Art Competition",
      location: "Jodhpur",
      image: "/awards/27artpoint.jpg",
    },
    {
      year: "2016",
      title: "Appreciating Your Art Award",
      organization: "Allahabad University",
      location: "Allahabad, UP",
      image: "/awards/award6.jpg",
    },
  ];

  return (
    <section
      id="awards"
      className="py-24 px-6 bg-gradient-to-br from-indigo-950 via-blue-250 to-indigo-130 relative overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_60%)]"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
            <img
              src="/awardpic1.png"
              alt="Awards"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Awards & Recognition
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-to-br from-slate-150 via-blue-50 to-indigo-130 relative overflow-hidden rounded-xl 
                         shadow-lg transform transition-transform duration-500 
                         hover:rotate-y-6 hover:-rotate-x-3 hover:scale-105 
                         hover:shadow-2xl hover:shadow-blue-200/40"
            >
              <div
                className="w-full h-36 mb-4 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-110 cursor-pointer"
                onClick={() => setSelectedImage(award.image)}
              >
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start gap-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200 shadow-sm"
                >
                  {award.year}
                </Badge>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 leading-tight text-slate-900 hover:text-blue-600 transition-colors">
                    {award.title}
                  </h3>
                  {award.organization && (
                    <p className="text-sm text-slate-600 mb-1">{award.organization}</p>
                  )}
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-blue-500" />
                    {award.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
          >
            ✕
          </button>

          {/* Large Image */}
          <div className="relative w-[90%] max-w-4xl h-[80vh]">
            <img
              src={selectedImage}
              alt="Award Enlarged"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
