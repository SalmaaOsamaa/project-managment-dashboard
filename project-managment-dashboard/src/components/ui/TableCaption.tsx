import { cn } from "../../lib/utils"
import React from "react"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})

TableCaption.displayName = "TableCaption"

export { TableCaption }