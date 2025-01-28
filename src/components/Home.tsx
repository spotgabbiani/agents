import AgentList from "./AgentList";
import useFetch from "../hooks/useFetch";
import { Agent } from "../types/agent";

const Home = (): JSX.Element => {
  const {
    data: agents,
    isPending,
    refetch,
    error,
  } = useFetch("http://localhost:8000/agents");

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading agents...</p>}
      {agents && <AgentList agents={agents as Agent[]} refetch={refetch} />}
    </>
  );
};

export default Home;
