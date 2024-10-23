import { Injectable } from '@angular/core';
//import { Observable } from "rxjs/Observable";
import { Observable, pipe } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
//import { environment } from '../../../environments/environment';

interface Course {
	description: string;
	courseListIcon: string;
	iconUrl: string;
	longDescription: string;
	url: string;
}



@Injectable()
export class HttpApiService {
	//token = localStorage.getItem('jwt_token');
	//appUrl = environment.apiUrl;
	//headers = new HttpHeaders()
	//	.set("Content-Type", "application/json")
	//	.set('Access-Control-Allow-Origin', '*')
	//	.set('Authorization',this.token);
	//appUrl = environment.apiUrl;
	appUrl = "http://dandadan.synology.me:4301"
	headers = new HttpHeaders()
		.set("Content-Type", "application/json");
		// .set("Access-Control-Allow-Methods",'POST, PUT, DELETE, GET, OPTIONS,PATCH')
		// .set("Accept", "application/json")
		// .set('Access-Control-Allow-Origin', '*');
	
	constructor(private httpCli: HttpClient) {
		
	}

	put = (command: string, paramsString?: string, body?: any): Observable<any> => {
		let headers = this.headers;
		const params = new HttpParams({
			//fromString: 'orderBy="$key"&limitToFirst=1'
			fromString: paramsString
		});
		var s = this.httpCli.put(`${this.appUrl}/api/` + command, { body, headers, params, responseType: "json" }
		).pipe(res => res)
		

		return s;
	}

    post = (command: string, paramsString?: string, body?:any): Observable<any> => {
		let headers = this.headers;
		const params = new HttpParams({
			//fromString: 'orderBy="$key"&limitToFirst=1'
			fromString: paramsString
		});
		var s = this.httpCli.post(`${this.appUrl}/api/` + command, { body, headers, params, responseType: "json" }
		).pipe(res => res)

		return s;
	}

	get = (command: string, params: HttpParams): Observable<any> => {
		let headers = this.headers;
		// const params = new HttpParams({
		// 	//fromString: 'orderBy="$key"&limitToFirst=1'
		// 	fromString: paramsString
		// });
		var s = this.httpCli.get(`${this.appUrl}/api/` + command, { params, responseType: "json" }
		).pipe(res => res)

		return s;
	}

	delete = (command: string, paramsString?: string, body?: any): Observable<any> => {
		let headers = this.headers;
		const params = new HttpParams({
			//fromString: 'orderBy="$key"&limitToFirst=1'
			fromString: paramsString
		});
		var s = this.httpCli.delete(`${this.appUrl}/api/` + command, {body,headers, params, responseType: "json" }
		).pipe(res => res)

		return s;
	}


	//signin(credential: User): Observable<Token> {
	//	const headers = new HttpHeaders()
	//		.set("Content-Type", "application/json")
	//		.set("charset", "utf-8")
	//		.set('Access-Control-Allow-Origin', '*');
	//	//console.log(`${this.appUrl}/auth/login`);
	//	//return null;
	//	return this.http.post<Token>(`${this.appUrl}/auth/login`, credential, { headers })
	//		.do(res => {
	//			if (res.token !== null) {
	//				this.setToken(res.token);
	//			} else {
	//				this.removeToken();
	//			}

	//		})
	//		.catch(error => {
	//			this.removeToken();
	//			//console.log(error);
	//			// here we can show an error message to the user,
	//			// for example via a service
	//			//console.error("error catched", error);
	//			return Observable.of(error.token);
	//		})
	//		.shareReplay();
	//}

	

}
