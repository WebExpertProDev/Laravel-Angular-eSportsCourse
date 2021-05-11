import { AuthActionTypes, AuthActions } from '../actions/auth.action';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, token should not be empty
  token: string | null;  
}

export const initialState: State = {
  isAuthenticated: false,
  token: localStorage.getItem('token')
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_COMPLETE: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token
      };
    }
    default: {
      return state;
    }
  }
}

export const selectAuthToken = (state: State)  => state.token;