import { Component, OnInit } from '@angular/core';
import { NovedadSistema, NovedadUsuario } from 'src/app/_models/novedad';
import { NovedadSistemaService, FiltroNovedadSistema } from 'src/app/_services/novedad_sistema.service';
import { AuthService } from 'src/app/_services/auth.service';
import { SedeProvider } from 'src/app/providers/sede.provider';

@Component({
  selector: 'app-tab-about',
  templateUrl: './tab-about.component.html',
  styleUrls: ['./tab-about.component.scss'],
})
export class TabAboutComponent implements OnInit {
  usuario;
  id_sede:number;
  novedades:NovedadSistema[] = [];
  cantidad_no_visto:number;
  no_visto:NovedadUsuario[] = [];
  filtroNovedadSistema:FiltroNovedadSistema = <FiltroNovedadSistema>{};
  loadingNovedades:boolean = false;

  constructor(
    private auth:AuthService,
    private sedeProvider:SedeProvider,
    private novedadSistemaService:NovedadSistemaService,
  ) { }

  ngOnInit() {
    this.auth.isAuthenticatedPromise().then(response=>{
      if(response){
        return this.sedeProvider.getIdSede();
      } else {
        return null;
      }
    }).then(id_sede=>{
      if(id_sede){
        this.id_sede = id_sede;
        this.novedadSistemaService.sede(this.id_sede);
      }
      return this.auth.getUsuario();
    }).then(usuario=>{
      this.usuario = usuario;
      if(this.usuario){
        this.refrescar();
      }
    });
  }

  refrescar(){
    this.filtroNovedadSistema.id_usuario = this.usuario.id;
    this.filtroNovedadSistema.length = 7;
    this.loadingNovedades = true;
    this.novedadSistemaService.getAll(this.filtroNovedadSistema).subscribe((response:any)=>{
      this.no_visto = response.no_visto;
      this.cantidad_no_visto = response.no_visto.length;
      this.novedades = response.items;
      this.loadingNovedades = false;
    });
  }

  previa(item:NovedadSistema){
    var wnd = window.open("about:blank",'_system', 'location=yes');
    this.novedadSistemaService.getById(item.id,this.usuario.id).subscribe(response=>{
      this.no_visto = this.no_visto.filter(novedad=>novedad.id_novedad_sistema != item.id);
      this.cantidad_no_visto = this.no_visto.length;
      wnd.document.write(response.cuerpo);
    });
  }

  vistos(item:NovedadSistema){
    let val = false;
    if(this.no_visto){
      if(this.no_visto.find(usuario=>item.id==usuario.id_novedad_sistema)){
        val = true;
      }
    }
    
    return val;
  }

}
