import { useState } from "react";
import { Agent } from "../types/agent";

interface UseAgentMutationResult {
  isLoading: boolean;
  error: string | null;
  mutate: (agent: Agent) => Promise<void>;
}

const useAgentMutation = (): UseAgentMutationResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (agent: Agent) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = agent.id
        ? `http://localhost:8000/agents/${agent.id}`
        : "http://localhost:8000/agents/";
      const method = agent.id ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, mutate };
};

export default useAgentMutation;
