import * as React from "react";

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type ApiConfig = {
  url: string;
  options?: RequestInit;
  auto?: boolean; // auto-run on mount
};

export function useApiHandle<T = unknown>({
  url,
  options,
  auto = false,
}: ApiConfig) {
  const [state, setState] = React.useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const run = React.useCallback(
    async (override?: { url?: string; options?: RequestInit }) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const res = await window.fetch(
          override?.url ?? url,
          override?.options ?? options
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed (${res.status})`);
        }

        const json = (await res.json()) as T;

        setState({ data: json, loading: false, error: null });
        return json;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";

        setState({ data: null, loading: false, error: message });

        return null; // 👈 DO NOT THROW
      }
    },
    [url, options]
  );

  // 🔁 Auto-run when component mounts
  React.useEffect(() => {
    if (auto) {
      run();
    }
  }, [auto, run]);

  return {
    ...state,
    run,
  };
}
