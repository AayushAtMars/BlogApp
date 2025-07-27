import React, { useContext } from "react";
import StarBorder from "../StarBorder/StarBorder";
import { AppContext } from "../context/AppContext";

const Pagination = () => {
  const {page, handlePageChange, totalPages} = useContext(AppContext);
  
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = window.innerWidth < 768 ? 3 : 5; // Less pages on mobile
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, page - Math.floor(maxVisible / 2));
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
        
        {/* Mobile Layout */}
        <div className="sm:hidden flex items-center justify-between gap-2">
          {/* Previous Button */}
          <div className="flex-shrink-0">
            {page > 1 ? (
              <StarBorder
                as="button"
                color="cyan"
                speed="5s"
                onClick={() => handlePageChange(page - 1)}
                className="text-xs px-2 py-1.5 min-w-[60px]"
              >
                Prev
              </StarBorder>
            ) : (
              <div className="w-[60px]"></div> // Placeholder for alignment
            )}
          </div>
          
          {/* Page Numbers - Mobile */}
          <div className="flex gap-1 flex-1 justify-center max-w-[200px] overflow-x-auto">
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors flex-shrink-0 min-w-[28px] ${
                  pageNum === page
                    ? 'bg-cyan-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <div className="flex-shrink-0">
            {page < totalPages ? (
              <StarBorder
                as="button"
                color="cyan"
                speed="5s"
                onClick={() => handlePageChange(page + 1)}
                className="text-xs px-2 py-1.5 min-w-[60px]"
              >
                Next
              </StarBorder>
            ) : (
              <div className="w-[60px]"></div> // Placeholder for alignment
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Left Side - Previous/Next Buttons */}
          <div className="flex items-center gap-3">
            {page > 1 && (
              <StarBorder
                as="button"
                color="cyan"
                speed="5s"
                onClick={() => handlePageChange(page - 1)}
                className="text-sm md:text-base px-3 md:px-4 py-2"
              >
                Previous
              </StarBorder>
            )}

            {page < totalPages && (
              <StarBorder
                as="button"
                color="cyan"
                speed="5s"
                onClick={() => handlePageChange(page + 1)}
                className="text-sm md:text-base px-3 md:px-4 py-2"
              >
                Next
              </StarBorder>
            )}
          </div>

          {/* Right Side - Page Numbers */}
          <div className="flex gap-2">
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors min-w-[36px] ${
                  pageNum === page
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pagination;
