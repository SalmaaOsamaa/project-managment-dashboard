import { cn } from "../../lib/utils"
import React from "react"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn("bg-background", className)}
      {...props}
    />
  )
})

TableBody.displayName = "TableBody"

export { TableBody }