"use client";

import Image from "next/image";

const ServicesList = () => {
  const services = [
    {
      id: "01.",
      title: "Web design",
      desc: "Ready for a new website? We guide you from start to finish. For UX design and powerful Figma designs, we're your go-to experts.",
    },
    {
      id: "02.",
      title: "Webflow development",
      desc: "Launch your website swiftly and pixel-perfect using the no-code platform Webflow. Perfect for any type of business, from startups to large corporations.",
    },
    {
      id: "03.",
      title: "Brand design",
      desc: "We transform your company's core values into striking visuals and impactful messaging. Stand out from the competition and lead the way in your industry.",
    },
    {
      id: "04.",
      title: "3D motion design",
      desc: "Want to make an impact? With 3D animations, you can leave a stunning impression and visually convey complex stories, making them easy for everyone to understand.",
    },
    {
      id: "05.",
      title: "Video & photography",
      desc: "Striking the right chord isn’t exclusive to musicians. Compelling visuals can evoke strong feelings and strengthen your brand's connection with your audience.",
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col justify-end items-center bg-gradient-to-b from-transparent via-black to-black mt-[-1vw]  ">
      {services.map((item, index) => (
        <div
          key={index}
          className={`relative group w-[90%] service service${
            index + 1
          } h-[120px] border-y border-white/30 hover:h-[140px] text-white px-3 font-light transition-all duration-300 overflow-hidden`}
        >
          {/* background fill */}
          <div className="absolute inset-0 bg-white opacity-90 scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0" />

          {/* content above background */}
          <div className="relative z-10 w-full h-full flex justify-center items-center">
            <span className="w-[10%] group-hover:font-bold text-white group-hover:text-black">
              {item.id}
            </span>
            <div className="flex w-[90%] justify-between items-center">
              <span className=" group-hover:font-medium de:w-1/4 mo:w-3/4 text-3xl text-white group-hover:text-black">
                {item.title}
              </span>
              <span className="w-1/3 opacity-80 text-white group-hover:font-bold  group-hover:text-black text-sm mo:hidden de:inline text-left">
                {item.desc}
              </span>
              <Image
                src="/right-arrow.svg"
                width={30}
                height={30}
                alt="arrow"
                className="group-hover:-rotate-45 invert group-hover:invert-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
