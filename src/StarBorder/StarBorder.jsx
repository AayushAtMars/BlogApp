const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "cyan",
  speed = "3s",
  children,
  ...rest
}) => {
  return (
    <Component 
      className={`relative inline-block overflow-hidden rounded-[20px] p-[2px] ${className}`}
      style={{
        background: `linear-gradient(45deg, ${color}, transparent, ${color})`,
        backgroundSize: '200% 200%',
        animation: `borderGlow ${speed} ease-in-out infinite`,
        ...rest.style
      }}
      {...rest}
    >
      <div className="relative bg-gray-900 text-white text-center py-4 px-6 rounded-[18px] w-full h-full">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
