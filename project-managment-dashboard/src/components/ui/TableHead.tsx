import { cn } from "../../lib/utils"
import React from "react"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn("px-4 py-2 text-center font-medium text-muted-foreground", className)}
      {...props}
    />
  )
})

TableHead.displayName = "TableHead"

export { TableHead }