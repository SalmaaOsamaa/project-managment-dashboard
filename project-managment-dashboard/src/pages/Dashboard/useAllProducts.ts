import { useCallback, useEffect, useReducer } from "react";
import type { Product } from "../../domain-models";
import { requestFetchAllProducts, requestEditProduct } from "../../network";

interface State {
  isLoading: boolean;
  data: Product[];
  error: unknown;
  isEditingProduct: boolean;
  successfullyEditedProduct: Product | null;
  editProductLoadingError: unknown;
}

type Action =
  | {
      type: "FETCH_ALL_START";
    }
  | {
      type: "FETCH_ALL_SUCCESS";
      data: Product[];
    }
  | {
      type: "FETCH_ALL_ERROR";
      error: unknown;
    }
  | {
      type: "EDIT_PRODUCT_START";
    }
  | {
      type: "EDIT_PRODUCT_SUCCESS";
      successfullyEditedProduct: Product;
    }
  | {
      type: "EDIT_PRODUCT_ERROR";
      editProductLoadingError: unknown;
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
  isEditingProduct: false,
  successfullyEditedProduct: null,
  editProductLoadingError: null,
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
  EDIT_PRODUCT_START: (state, _action) => ({
    ...state,
    isEditingProduct: true,
    successfullyEditedProduct: null,
    editProductLoadingError: null,
  }),
  EDIT_PRODUCT_SUCCESS: (state, { successfullyEditedProduct }) => ({
    ...state,
    isEditingProduct: false,
    data: state.data.map((product) => product.id === successfullyEditedProduct.id ? {...product, ...successfullyEditedProduct} : product),
  }),
  EDIT_PRODUCT_ERROR: (state, { editProductLoadingError }) => ({
    ...state,
    isEditingProduct: false,
    editProductLoadingError: editProductLoadingError,
  }),
};

function reducer(state: State = initialState, action: Action): State {
  return actionHandlers[action.type]?.(state, action as any) || state;
}

const useAllProducts = () => {
  const [{ isLoading, data, error, isEditingProduct, successfullyEditedProduct, editProductLoadingError }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchProducts = useCallback(() => {
    const controller = new AbortController();

    dispatch({ type: "FETCH_ALL_START" });

    requestFetchAllProducts({
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
  const editProduct = useCallback((requestBody: any) => {
    const controller = new AbortController();

    dispatch({ type: "EDIT_PRODUCT_START" });

    requestEditProduct({
      ...requestBody,
      options: {
        signal: controller.signal,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: "EDIT_PRODUCT_SUCCESS",
          successfullyEditedProduct: data,
        });
      })
      .catch((editProductLoadingError) => {
        if (controller.signal.aborted) {
          return false;
        }
        dispatch({ type: "EDIT_PRODUCT_ERROR", editProductLoadingError  });
      });
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return {
    isLoading,
    productsList: data,
    error,
    refetch: fetchProducts,
    editProduct,
    isSubmittingEditProduct: isEditingProduct,
    successfullyEditedProduct: successfullyEditedProduct,
    editProductLoadingError: editProductLoadingError,
  };
};

export { useAllProducts };