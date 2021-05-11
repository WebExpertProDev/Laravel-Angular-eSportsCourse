import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { Injectable } from "@angular/core";
import * as auth from './auth.reducers';

export interface RouterStateUrl
{
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State
{
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    authReducer: auth.State;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    authReducer: auth.reducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const getAuthState = createFeatureSelector<auth.State>('authReducer');

export const selectAuthTokenState = createSelector(
    getAuthState,
    auth.selectAuthToken
);

@Injectable()
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl>
{
    serialize(routerState: RouterStateSnapshot): RouterStateUrl
    {
        const {url} = routerState;
        const {queryParams} = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while ( state.firstChild )
        {
            state = state.firstChild;
        }
        const {params} = state;

        return {
            url,
            queryParams,
            params
        };
    }
}
