import * as React from "react";
import { cn } from "../../lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content?: string;
  side?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ children, content, side = "top" }: TooltipProps) => {
  if (!content) {
    return <>{children}</>;
  }

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span className="relative inline-block group">
      {children}
      <span
        className={cn(
          "absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 dark:bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-pre-line text-left max-w-sm",
          sideClasses[side]
        )}
      >
        {content}
      </span>
    </span>
  );
};

export { Tooltip };

