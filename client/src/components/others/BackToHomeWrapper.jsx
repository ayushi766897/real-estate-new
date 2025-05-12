import { useLocation } from "react-router-dom";
import BackToHome from "./BackToHome"; // Import your BackToHome button

const BackToHomeWrapper = () => {
  const location = useLocation(); // Get current route

  return location.pathname !== "/" ? (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <BackToHome />
    </div>
  ) : null;
};

export default BackToHomeWrapper;
