import { cn } from "../../lib/utils"
import React from "react"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  )
})

TableRow.displayName = "TableRow"

export { TableRow }