import { renderHook, act } from "@testing-library/react";
import useAgentDelete from "../useAgentDelete";

// Mock the global fetch function
global.fetch = jest.fn();

describe("useAgentDelete", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useAgentDelete());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.deleteAgent).toBe("function");
  });

  it("should handle successful deletion", async () => {
    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useAgentDelete());

    await act(async () => {
      await result.current.deleteAgent(1); // Simulate deleting an agent with ID 1
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/agents/1", {
      method: "DELETE",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle HTTP error during deletion", async () => {
    // Mock a failed fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useAgentDelete());

    await act(async () => {
      await result.current.deleteAgent(1);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("HTTP error! status: 404");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/agents/1", {
      method: "DELETE",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle network error during deletion", async () => {
    // Mock a network error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAgentDelete());

    await act(async () => {
      await result.current.deleteAgent(1);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Network error");
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/agents/1", {
      method: "DELETE",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
