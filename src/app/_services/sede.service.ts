import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sede } from '../_models/sede';
import { HttpInterceptorProvider } from '../providers/http-interceptor';
 
@Injectable()
export class SedeService {

    api:string = environment.base_path.slice(0, -1);
    resource:string = 'sedes';

    constructor(private http: HttpInterceptorProvider) {;
    }
 

    getAll() {
        return this.http.get( [this.api,this.resource]);
    }
 
    getById(id: number) {
        return this.http.get([this.api,this.resource,id]);
    }
 
    register(item: Sede) {
        return this.http.post([this.api,this.resource], item);
    }
 
    update(item: Sede) {
        return this.http.put([this.api,this.resource,item.id], item);
    }
 
    delete(id: number) {
        return this.http.delete([this.api,this.resource,id]);
    }

}