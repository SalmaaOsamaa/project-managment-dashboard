import { cn } from "../../lib/utils"
import React from "react"

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("px-4 py-2", className)}
      {...props}
    />
  )
})

TableCell.displayName = "TableCell"

export { TableCell }