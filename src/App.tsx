import Home from "./components/Home";
import AgentDetails from "./components/AgentDetails";
import AgentForm from "./components/AgentForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents/:id" element={<AgentDetails />} />
        <Route path="/create" element={<AgentForm />} />
        <Route path="/edit/:id" element={<AgentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
