import "./App.css";
import AuthProvider from "./context/AuthContext";
import CardProvider from "./context/CardContext";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <AuthProvider>
      <CardProvider>
        <div className="min-h-screen flex flex-col">
          <AppRoutes />
        </div>
      </CardProvider>
    </AuthProvider>
  );
}

export default App;