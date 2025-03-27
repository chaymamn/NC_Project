import { Component, OnInit } from '@angular/core';
import { DxDataGridModule, DxPopupModule, DxCheckBoxModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NonConformityService } from 'src/app/services/non-conformity.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.scss'],
  standalone: true,
  imports: [DxDataGridModule, DxPopupModule,DxCheckBoxModule, CommonModule, IonicModule],
})
export class CausesComponent implements OnInit {
  
  dataSource: any[] = [];
  causesList: any[] = [];
  filePopupVisible = false;
  selectedRowIndex: number | null = null;
  selectedFileName: string = '';

  constructor(private nonConformityService : NonConformityService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCauses(); // Récupérer les causes à l'initialisation
  }

  //télécharger les causes
  loadCauses() {
    this.nonConformityService.getCauses().subscribe(
      (data: any[]) => {
        this.causesList = data; // Stocke les causes reçues
      },
      (error) => {
        console.error('Erreur lors de la récupération des causes:', error);
      }
    );
  }

  //Ajout d'une ligne
  addRow() {
    this.dataSource.push({
      N: this.dataSource.length + 1, // Numérotation automatique
      causes: "",
      description: "",
      maintenue: "",
      "nom de fichier": "",
      evaluation: ""
    });

    // Cloner l'objet pour déclencher la détection des changements dans Angular
    this.dataSource = [...this.dataSource];
  }

  // ✅ Ouvrir la popup pour choisir un fichier
  openFilePopup(rowIndex: number | undefined) {
    console.log("Clicked rowIndex:", rowIndex);

    if (rowIndex !== undefined) {
      this.selectedRowIndex = rowIndex;
      this.filePopupVisible = true;
      this.cdr.detectChanges(); 
      console.log("Popup should open:", this.filePopupVisible);
    } else {
      console.error("Impossible d'ouvrir la popup : rowIndex est indéfini");
    }
  }

  // ✅ Fermer la popup
  closeFilePopup() {
    this.filePopupVisible = false;
    this.selectedFileName = '';
  }

  // ✅ Lorsque l'utilisateur sélectionne un fichier
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name; // Stocker le nom du fichier
    }
  }

  // ✅ Enregistrer le fichier et mettre à jour la cellule correspondante
  saveFile() {
    if (this.selectedRowIndex !== null && this.selectedFileName) {
      this.dataSource[this.selectedRowIndex]['nom de fichier'] = this.selectedFileName;
      this.dataSource = [...this.dataSource]; // Forcer la détection des changements
    }
    this.closeFilePopup();
  }
}
