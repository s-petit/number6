import {Component, HostListener, OnInit} from '@angular/core';
import {AvidsenService} from "./service/avidsen.service";

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styles: []
})
export class AppComponent implements OnInit {

   title = 'CCTV';
   url;
   error;

   constructor(private avidsenService: AvidsenService) {
   }

   ngOnInit() {
      this.refreshAfter(1000);
   }

   @HostListener('window:keydown.shift', ['$event'])
   refresh() {
      this.avidsenService.refreshedSnapshot().subscribe(result => {
         this.url = result;
      });
   }

   refreshAfter(milli: number) {
      setTimeout(() => this.refresh(), milli);
   }

   @HostListener('window:keydown.arrowdown', ['$event'])
   down() {
      this.avidsenService.stepMove('up').subscribe();
      this.refreshAfter(500);
   }

   @HostListener('window:keydown.arrowup', ['$event'])
   up() {
      this.avidsenService.stepMove('down').subscribe();
      this.refreshAfter(500);
   }

   @HostListener('window:keydown.arrowleft', ['$event'])
   left() {
      this.avidsenService.stepMove('right').subscribe();
      this.refreshAfter(500);
   }

   @HostListener('window:keydown.arrowright', ['$event'])
   right() {
      this.avidsenService.stepMove('left').subscribe();
      this.refreshAfter(500);
   }

   save() {
      this.avidsenService.savePosition().subscribe();
   }

   load() {
      this.avidsenService.goToPosition().subscribe();
      this.refreshAfter(5000);
   }
}
