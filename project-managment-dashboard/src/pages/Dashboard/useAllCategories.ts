import { useCallback, useEffect, useReducer } from "react";
import type { Category } from "../../domain-models";
import { requestFetchAllCategories } from "../../network";

interface State {
  isLoading: boolean;
  data: Category[];
  error: unknown;

}

type Action =
  | {
      type: "FETCH_ALL_START";
    }
  | {
      type: "FETCH_ALL_SUCCESS";
      data: Category[];
    }
  | {
      type: "FETCH_ALL_ERROR";
      error: unknown;
    }

type ActionHandlers = {
  [key in Action["type"]]: (
    state: State,
    action: Extract<Action, { type: key }>
  ) => State;
};

const initialState: State = {
  isLoading: false,
  data: [],
  error: null,
};

const actionHandlers: ActionHandlers = {
  FETCH_ALL_START: (state, _action) => ({
    ...state,
    isLoading: true,
    data: [],
    error: null,
  }),
  FETCH_ALL_SUCCESS: (state, { data }) => ({
    ...state,
    isLoading: false,
    data,
  }),
  FETCH_ALL_ERROR: (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }),
};

function reducer(state: State = initialState, action: Action): State {
  return actionHandlers[action.type]?.(state, action as any) || state;
}

const useAllCategories = () => {
  const [{ isLoading, data, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchCategories = useCallback(() => {
    const controller = new AbortController();

    dispatch({ type: "FETCH_ALL_START" });

    requestFetchAllCategories({
      options: {
        signal: controller.signal,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "FETCH_ALL_SUCCESS",
          data: data,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return false;
        }
        dispatch({ type: "FETCH_ALL_ERROR", error });
      });
    return () => {
      controller.abort();
    };
  }, []);
 

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


  return {
    isLoading,
    categoriesList: data,
    error,
    refetch: fetchCategories,
   
  };
};

export { useAllCategories };