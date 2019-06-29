import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoadingProvider } from 'src/app/providers/loading.provider';

@Component({
  selector: 'app-popover-home',
  templateUrl: './popover-home.component.html',
  styleUrls: ['./popover-home.component.scss'],
})
export class PopoverHomeComponent implements OnInit {

  loading:boolean=false;

  constructor(
    public loadingProvider: LoadingProvider,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.loadingProvider.loading$.subscribe(estado=>{
      this.loading = estado;
    });
  }

  close(opcion:number=0){
    this.popoverController.dismiss(opcion);
  }
}
