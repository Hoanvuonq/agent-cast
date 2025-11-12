import React from "react";
import Image from "next/image";
import { featurePosts } from "../../../constants/features";

interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  iconSrc: string;
  layoutDirection: "horizontal" | "vertical";
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  title,
  description,
  iconSrc,
  layoutDirection,
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-col ${layoutDirection === "horizontal" ? "md:flex-row" : ""}
        bg-white/10 backdrop-blur-sm 
        border border-[#00D084] rounded-[1vw] overflow-hidden 
        p-[1vw]
        transition-shadow duration-300 hover:shadow-[#00D084]/50
        h-full 
        ${className} 
      `}
    >
      <div
        className={`
          w-full h-[25vw] ${layoutDirection === "horizontal" ? "md:w-1/2" : ""}
          mb-4 ${layoutDirection === "horizontal" ? "md:mb-0 md:mr-6" : ""}
          relative overflow-hidden rounded-[0.5vw]
          ${layoutDirection === "vertical" ? "aspect-video" : "h-[25vw]"}
        `}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-[35vw] h-[30vw]"
        />
      </div>

      <div
        className={`w-full ${layoutDirection === "horizontal" ? "md:w-[40vw]" : ""} flex flex-col justify-center px-[1vw]`}
      >
        <div className="mb-2 flex items-center">
          <Image
            src={iconSrc}
            alt="icon"
            width={24}
            height={24}
             className="mr-2 w-[2vw] h-[2vw]"
          />
         <h1 className="text-[3vw] font-bold uppercase">{title}</h1>
        </div>
        <p className="text-gray-300 text-[0.9vw] font-kode-mono leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

const CardComponent = () => {
  return (
    <section className="flex-1 relative z-10  md:py-[2vw] lg:py-[3vw] ">
      <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[1vw] w-full m-auto"
    >
      {featurePosts.map((post, index) => (
        <FeatureCard
          key={post.id}
          imageSrc={post.imageSrc}
          title={post.title}
          description={post.description}
          iconSrc={post.iconSrc} //
          layoutDirection={index === 0 ? "horizontal" : "vertical"}
          className={index === 0 ? "lg:col-span-2" : ""}
        />
      ))}
    </div>
    </section>
  );
};

export default CardComponent;
