import React from "react"
import { cn } from "../../lib/utils"
const Skeleton = ({className,...props}: React.HTMLAttributes<HTMLDivElement> & {className?: string}) => {
  return (
    <div className={cn("rounded-md bg-muted animate-pulse", className)} {...props} />
  )
}

export default Skeleton