import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../css/agents.css";

const AgentDetails = () => {
  const { id } = useParams();
  const {
    data: agent,
    error,
    isPending,
  } = useFetch("http://localhost:8000/agents/" + id);

  const formatDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      return dateObj.toLocaleString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <>
      {isPending && <p>Loading agent details...</p>}

      {error && <p>{error}</p>}

      {agent && (
        <div className="agent-card">
          <h3>{agent.name}</h3>
          <p>
            <span className="label">Email:</span> {agent.email}
          </p>
          <p>
            <span className="label">Status:</span>{" "}
            <span className={agent.status === "Active" ? "active" : "inactive"}>
              {agent.status}
            </span>
          </p>
          <p>
            <span className="label">Last Seen:</span>{" "}
            {formatDate(agent.lastSeen)}
          </p>
          <p>
            <span className="label">Department:</span> {agent.department}
          </p>
          <p>
            <span className="label">Location:</span> {agent.location}
          </p>
        </div>
      )}
    </>
  );
};

export default AgentDetails;
