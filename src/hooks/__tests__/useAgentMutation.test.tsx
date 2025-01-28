import { renderHook, act } from "@testing-library/react";
import useAgentMutation from "../useAgentMutation";
import { Agent } from "../../types/agent";

// Mock the global fetch function
global.fetch = jest.fn();

describe("useAgentMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useAgentMutation());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.mutate).toBe("function");
  });

  it("should handle successful creation of a new agent (POST)", async () => {
    const newAgent: Agent = {
      id: 0,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Active",
      lastSeen: "",
      department: "Sales",
      location: "New York",
    };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useAgentMutation());

    await act(async () => {
      await result.current.mutate(newAgent);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/agents/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAgent),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle successful update of an existing agent (PATCH)", async () => {
    const existingAgent: Agent = {
      id: 1,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "Inactive",
      lastSeen: "2025-01-01",
      department: "HR",
      location: "San Francisco",
    };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useAgentMutation());

    await act(async () => {
      await result.current.mutate(existingAgent);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/agents/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingAgent),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle HTTP error during mutation", async () => {
    const agent: Agent = {
      id: 1,
      name: "Error Agent",
      email: "error.agent@example.com",
      status: "Active",
      lastSeen: "",
      department: "IT",
      location: "Remote",
    };

    // Mock a failed fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useAgentMutation());

    await act(async () => {
      await result.current.mutate(agent);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("HTTP error! status: 500");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/agents/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agent),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle network error during mutation", async () => {
    const agent: Agent = {
      id: 2,
      name: "Network Error Agent",
      email: "network.error@example.com",
      status: "Inactive",
      lastSeen: "",
      department: "Engineering",
      location: "Boston",
    };

    // Mock a network error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAgentMutation());

    await act(async () => {
      await result.current.mutate(agent);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Network error");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/agents/2", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agent),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
