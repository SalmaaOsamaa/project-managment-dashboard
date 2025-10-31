import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import ROUTES from "../router/routes"
import { clearAuth } from "../utils/auth"
import { LayoutDashboard, LogOut } from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    clearAuth()
    navigate(ROUTES.AUTH)
  }

  const isDashboardActive = location.pathname === ROUTES.DASHBOARD

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate(ROUTES.DASHBOARD)}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl group-hover:bg-primary/30 transition-colors" />
              <div className="relative flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-md">
                <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Project Dashboard
              </span>
              <span className="text-start text-xs text-muted-foreground hidden sm:block">
                Management System
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isDashboardActive ? "default" : "ghost"}
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className={`flex items-center gap-2 transition-all duration-200 ${
                isDashboardActive 
                  ? "shadow-md shadow-primary/20" 
                  : "hover:bg-accent/50"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

