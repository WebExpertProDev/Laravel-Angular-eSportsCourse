import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] LOGIN',
  LOGIN_COMPLETE = '[Auth] LOGIN_COMPLETE',
  LOGIN_ERROR = '[Auth] LOGIN_ERROR',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;  
  constructor(public payload: {email: string, password: string}) {}
}

export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPLETE;
  constructor(public payload: {token: string}) {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: {errorMessage: string}) {}
}

export type AuthActions
 = Login
 | LoginComplete
 | LoginError;