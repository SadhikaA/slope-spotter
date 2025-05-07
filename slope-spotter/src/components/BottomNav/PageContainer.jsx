import React from "react";

const PageContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-md mx-auto px-4 pt-6 ${className}`}
      style={{ paddingBottom: "calc(3.5rem + 1rem)" }} // ~BottomNav height + spacing
    >
      {children}
    </div>
  );
};

export default PageContainer;
