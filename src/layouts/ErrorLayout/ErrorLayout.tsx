import ErrorImage from "../../assets/giphy.gif"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../router/routes"
const ErrorLayout = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={ErrorImage} alt="error" className=" m-auto object-contain" />
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-sm text-gray-500">Something went wrong</p>
      <Button variant="outline" onClick={() => navigate(ROUTES.DASHBOARD)}>Go to Dashboard</Button>
    </div>
  )
}

export default ErrorLayout