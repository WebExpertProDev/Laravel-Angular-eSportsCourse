import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { Login } from 'app/store/actions';
import { Store } from '@ngrx/store';
import {State as AppState} from 'app/store/reducers';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    http: HttpClient;
    access_token;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _http: HttpClient,
        private _router: Router,
        private store: Store<AppState>
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        this.store.dispatch(new Login({email: this.loginForm.value['email'], password: this.loginForm.value['password']}));
    }

    getdata(): void 
    {
        const headers = new HttpHeaders({
            'Accept':'application/vnd.api.v1+json',
            'Content-Type': 'application/json',
        });
        console.log(headers);
        this._http.post("http://localhost:8000/oauth/token",
        {
            'grant_type': 'password',
            'client_id': '5',
            'client_secret': 'Y9sfEOHMYckPS1x0II31HtgXwdsQIwnq4FcTtES8',
            'username': this.loginForm.value['email'],
            'password': this.loginForm.value['password'],
            'scope' : '' 
        }, {headers})
        .subscribe(
            (val) => {
                console.log(val);
                this.access_token = val['token_type'] + ' ' +  val['access_token'];
                this._router.navigate(['/apps']);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }
}
