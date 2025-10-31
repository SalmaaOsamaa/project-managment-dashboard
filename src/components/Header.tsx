import * as React from "react"

interface HeaderProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ title = "Dashboard", description, children }) => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-start text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {children && (
            <div className="flex items-center gap-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

