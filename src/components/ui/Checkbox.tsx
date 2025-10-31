import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean | "indeterminate"
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleClick = () => {
      if (onCheckedChange) {
        onCheckedChange(checked === true ? false : true)
      }
    }

    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={
          checked === "indeterminate" ? "mixed" : checked ? "true" : "false"
        }
        data-state={
          checked === "indeterminate"
            ? "indeterminate"
            : checked
            ? "checked"
            : "unchecked"
        }
        className={cn(
          "peer relative h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked === true || checked === "indeterminate"
            ? "bg-primary text-primary-foreground"
            : "bg-background",
          className
        )}
        onClick={handleClick}
        ref={ref as React.RefObject<HTMLButtonElement>}
        {...(props as any)}
      >
        {checked === true && (
          <Check className="h-4 w-4 text-primary-foreground" />
        )}
        {checked === "indeterminate" && (
          <div className="absolute left-1/2 top-1/2 h-[2px] w-[10px] -translate-x-1/2 -translate-y-1/2 bg-primary-foreground" />
        )}
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
export default Checkbox