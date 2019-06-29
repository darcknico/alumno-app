import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpInterceptorProvider } from '../providers/http-interceptor';

export interface ChatUser{
    id:number;
    nombre:string;
}

@Injectable()
export class ChatService {
    api:string = environment.base_path+'chat';
    constructor(
        private http: HttpInterceptorProvider,
        ) { 
    }

    getAll(){
        return this.http.get([this.api]);
    }

    getById(id:number) {
        return this.http.get([this.api,id]);
    }

    register(item: ChatUser) {
        return this.http.post([this.api], item);
    }

    update(item: ChatUser) {
        return this.http.put([this.api,item.id], item);
    }

    delete(id: number) {
        return this.http.delete([this.api,id]);
    }

}