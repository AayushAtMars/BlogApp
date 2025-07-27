import React, { useState, useEffect } from "react";
import SplitText from "./SplitText";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Static Header */}
      <div className="w-full relative bg-transparent">
        <header className="px-4 sm:px-6 lg:px-8">
          <SplitText
            text="CodeHelp Blogs!"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-white mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-8 sm:mb-12 md:mb-16 lg:mb-20 leading-tight transition-all duration-300"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px sm:-75px lg:-100px"
            textAlign="center"
          />
        </header>
      </div>

      {/* Fixed Header that appears on scroll */}
      <div className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
        }
      `}>
        <div className="bg-white shadow-lg backdrop-blur-sm py-3 sm:py-4">
          <header className="px-4 sm:px-6 lg:px-8">
            <SplitText
              text="CodeHelp Blogs!"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 leading-tight"
              delay={0}
              duration={0.3}
              ease="power2.out"
              splitType="chars"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              textAlign="center"
            />
          </header>
        </div>
      </div>
    </>
  );
};

export default Navbar;
