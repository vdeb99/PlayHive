import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import useAuth from "./hooks/useAuth";

function App() {
  useAuth();

  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;