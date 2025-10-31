import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import ROUTES from "../router/routes"
import { clearAuth } from "../utils/auth"
import { LayoutDashboard, LogOut } from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    navigate(ROUTES.AUTH)
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-xl font-bold">Project Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

