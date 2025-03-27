import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import * as IonIcons from 'ionicons/icons';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule, DxHtmlEditorModule, FormsModule],
})
export class AppComponent {
  constructor() {
    addIcons(IonIcons);
  }
  
}
