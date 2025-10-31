import { cn } from "../../lib/utils"
import React from "react"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
})

TableHeader.displayName = "TableHeader"

export { TableHeader }