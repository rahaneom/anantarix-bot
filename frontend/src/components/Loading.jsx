export const LoadingSpinner = () => {
  return (
    <div className="inline-block w-5 h-5 border-2 border-t-2 border-white rounded-full border-r-transparent animate-spin"></div>
  );
};

export const LoadingBig = () => {
  return (
    <div className="flex items-center justify-center space-x-2 w=[200px] m-auto mt-[300px]">
      <div className="w-8 h-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s] "></div>
      <div className="w-8 h-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-8 h-8 bg-white rounded-full animate-bounce "></div>
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s] "></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-white rounded-full animate-bounce "></div>
    </div>
  );
};
