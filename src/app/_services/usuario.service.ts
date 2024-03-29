import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { HttpInterceptorProvider } from '../providers/http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private base_path = environment.base_path.slice(0, -1);

    constructor(
        private authService:AuthService,
        private http: HttpInterceptorProvider,
    ) { 
    }

    public coincidencia(email){
        return this.http.get(this.base_path+'email',{
            email:email
        });
    }

    public login(email,pass){
        return this.http.post([this.base_path,'login'],{
            email:email,
            password:pass,
        }).pipe(map(response=>{
            this.authService.setUsuario(response);
            let token = response['token'];
            let type = 'Bearer';
            this.authService.login(type,token).then(res=>{
                //this.me().subscribe();
            });
        }));
    }

    /*

    public register(usuario:Usuario){
        return this.http.post(this.base_path+'auth/register',usuario).pipe(map(response=>{
            let token = response['access_token'];
            let type = response['token_type'];
            this.authService.login(type,token).then(res=>{
                this.me().subscribe();
            });
        }));
    }
    */

    public logout(){
        return this.http.post([this.base_path,'logout'],{}).pipe(map(response=>{
            this.authService.logout();
        }));
    }

    /*
    public refresh(){
        return this.http.post(this.base_path+'auth/refresh',{}).pipe(map(response=>{
            let token = response['access_token'];
            let type = response['token_type'];
            this.authService.login(type,token);
        }));
    }*/

    public me(){
        return this.http.get([this.base_path,'detalle'],{}).pipe(map(response=>{
            this.authService.setUsuario(response);
        }));
    }
    /*
    public recovery(email){
        return this.http.post(this.base_path+'auth/recovery',{
            email:email
        });
    }
    */

    public password(password:string,n_password:string,c_password:string){
        return this.http.post([this.base_path,'usuario','password'],{
            password:password,
            n_password:n_password,
            c_password:c_password,
        });
    }
}