const ShinyText = ({ text, disabled = false, className = '' }) => {
    return (
      <span
        className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-glow'} ${className}`}
        style={{
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
        }}
      >
        {text}
      </span>
    );
  };
  
  export default ShinyText;
  