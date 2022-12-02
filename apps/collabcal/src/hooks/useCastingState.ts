import React from "react";

export function useCastingState<SFrom, STo extends SFrom>(
  initialState: STo | (() => STo)
) {
  const [state, setState] = React.useState<STo>(initialState);
  const castState = React.useCallback((state: SFrom) => {
    setState(state as STo);
  }, []);

  return [state, castState] as const;
}
