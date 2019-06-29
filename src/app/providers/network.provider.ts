import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { Events } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

export enum ConnectionStatus {
    Online,
    Offline
}

@Injectable()
export class NetworkProvider {

    public status: ConnectionStatus;
    private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

    constructor(
        public network: Network,
        public events: Events
    ) {
        this.status = ConnectionStatus.Online;
    }

    public initializeNetworkEvents(): void {

        console.log('Subscribe to onDisconnect events');
        /* OFFLINE */
        this.network.onDisconnect().subscribe(() => {
            if (this.status === ConnectionStatus.Online) {
                this.setStatus(ConnectionStatus.Offline);
            }
        })

        console.log('Subscribe to onConnect events');
        /* ONLINE */
        this.network.onConnect().subscribe(() => {
            if (this.status === ConnectionStatus.Offline) {
                this.setStatus(ConnectionStatus.Online);
            }
        })

    }

    public getNetworkType(): string {
        return this.network.type
    }

    public getNetworkStatus(): Observable<ConnectionStatus> {
        return this._status.asObservable();
    }

    private setStatus(status: ConnectionStatus) {
        this.status = status;
        this._status.next(this.status);
    }
}
