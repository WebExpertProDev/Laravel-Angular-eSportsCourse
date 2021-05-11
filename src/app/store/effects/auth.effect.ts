import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import {AuthActionTypes, Login, LoginComplete, LoginError} from '../actions/auth.action';
import { of } from 'rxjs';
import {AuthService} from '../../core/services/auth.service';

@Injectable()
export class AuthEffects
{
    /**
     * Constructor
     *
     * @param {Actions} actions$
     */
    constructor(
        private actions$: Actions,
        private authService: AuthService 
    )
    {
    }

    
    @Effect()
    login$ = this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
            .pipe(
              map((authData) => {
                console.log(authData);
                localStorage.setItem('token', authData.access_token);
                return new LoginComplete({token: authData.access_token});
              }),
              catchError((error: Error) => {
                console.log(error);
                return of(new LoginError({ errorMessage: error.message }));
              })
            );
      })
    );
    
}
