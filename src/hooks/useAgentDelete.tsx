import { useState } from "react";

interface UseAgentDeleteResult {
  isLoading: boolean;
  error: string | null;
  deleteAgent: (id: number) => Promise<void>;
}

const useAgentDelete = (): UseAgentDeleteResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAgent = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/agents/${id}`, {
        method: "DELETE",
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

  return { isLoading, error, deleteAgent };
};

export default useAgentDelete;
