import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Credentials} from "../model/credentials";
import 'rxjs/add/observable/of';
import * as json from '../../assets/credentials.json';

@Injectable()
export class AvidsenService {

   private host;
   private identification;

   constructor(private http: HttpClient) {
      let credentials = <Credentials> <any>json;
      this.host = 'http://' + credentials.ip + '//';
      this.identification = 'usr=' + credentials.user + '&pwd=' + credentials.pass;
   }

   refreshedSnapshot(): Observable<string> {
      let url = this.cameraUrl('tmpfs/snap.jpg?') + '&t=' + Date.now();
      return Observable.of(url);
   }

   private moveCamera(step: number, way: string): Observable<Object> {
      let url = this.cameraUrl('cgi-bin/hi3510/ptzctrl.cgi?-step='+step+'&-act='+way+'&');
      return this.http.get(url);
   }

   fullMove(way: string): Observable<Object> {
      return this.moveCamera(0, way);
   }

   stepMove(way: string): Observable<Object> {
      return this.moveCamera(1, way);
   }

   savePosition(): Observable<Object>  {
      return this.presetPosition(0, 'set');
   }

   goToPosition(): Observable<Object>  {
      return this.presetPosition(0, 'goto');
   }

   private presetPosition(num: number, action: string): Observable<Object> {
      let url = this.cameraUrl('cgi-bin/hi3510/preset.cgi?-act=' + action + '&-status=1&-number=' + num + '&');
      return this.http.get(url);
   }

   cameraUrl(action: string): string {
      return this.host + action + this.identification
   }


}