import React from 'react'
import SpotlightCard from './SpotLightCard'

const Card = ({post}) => {
  return (
    <div className="max-w-md mx-auto h-full"> {/* Added h-full */}
      <SpotlightCard 
        className="glass-card text-white p-8 rounded-2xl hover:scale-105 transition-transform duration-300 h-full flex flex-col" // Added h-full and flex flex-col
        spotlightColor="rgba(255, 255, 255, 0.1)"
      >
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 gradient-text h-14 flex items-start"> {/* Fixed height for title */}
          <span className="line-clamp-2">{post.title}</span>
        </h2>

        {/* Content Preview */}
        <p className="text-gray-200 mb-4 text-sm leading-relaxed h-16 overflow-hidden"> {/* Fixed height */}
          <span className="line-clamp-3">{post.content}</span>
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span className="truncate max-w-[120px]">{post.author}</span>
          <span className="whitespace-nowrap">{post.date}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4 h-12 overflow-hidden"> {/* Fixed height for tags */}
          {post.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded h-fit"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-400 h-fit">+{post.tags.length - 3} more</span>
          )}
        </div>

        {/* Spacer to push Read More to bottom */}
        <div className="flex-grow"></div>

        {/* Read More Link */}
        <div className="border-t border-white/10 pt-4 mt-auto"> {/* Added mt-auto */}
          <a href="#" className="text-blue-300 hover:text-blue-200 text-sm font-medium">
            Read full article →
          </a>
        </div>
      </SpotlightCard>
    </div>
  )
}

export default Card
