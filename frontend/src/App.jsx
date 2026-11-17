
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(response => {
        if (!response.ok) {
          throw new Error("API error");
        }
        return response.json();
      })
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus("Backend disconnected"));
  }, []);

  return <Dashboard apiStatus={apiStatus} />;
}

export default App;
