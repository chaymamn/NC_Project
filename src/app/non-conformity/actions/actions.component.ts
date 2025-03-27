import { Component, OnInit } from '@angular/core';
import { DxDataGridModule, DxPopupModule, DxHtmlEditorModule } from 'devextreme-angular';
import { NonConformityService } from 'src/app/services/non-conformity.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  standalone: true,
  imports: [DxDataGridModule, DxPopupModule, DxHtmlEditorModule, CommonModule, IonicModule],
})
export class ActionsComponent  implements OnInit {
  dataSource: any[] = [];
  actionTypes: any[] = [];  // Liste des types d'actions récupérée depuis le service
  popupVisible = false;
  currentDesignation = "";
  participants: any[] = [];
  selectedRowIndex: number | null = null;
  etatOptions = [
    { value: "Programmé(e)", text: "Programmé(e)" },
    { value: "En cours", text: "En cours" },
    { value: "Réalisé(e)", text: "Réalisé(e)" },
    { value: "Annulé(e)", text: "Annulé(e)" }
  ];
  

  constructor(private nonConformityService : NonConformityService) { }

  ngOnInit() {
    this.loadActionTypes();
    this.loadParticipants();
  }

  // Charger les types d'actions depuis le service
  loadActionTypes() {
    this.nonConformityService.getActionTypes().subscribe(
      (data: any[]) => {
        this.actionTypes = data;
      },
      (error) => {
        console.error("Erreur lors du chargement des types d'actions", error);
      }
    );
  }

  // Charger les participants depuis le service
  loadParticipants() {
    this.nonConformityService.getParticipants().subscribe(
      (data: any[]) => {
        this.participants = data;
      },
      (error) => {
        console.error("Erreur lors du chargement des participants", error);
      }
    );
  }

  //Ajouter une nouvelle ligne
  addRow() {
    const newRow = {
      type: "",
      designation: "",
      respCorrection: "",
      datePrevue: new Date(),
      etat: "",
      dateReelle: new Date(),
      commentaires: "",
      isNew: true
    };

    console.log('Adding new row', newRow);  // Ajout d'un log pour suivre la donnée ajoutée
    this.dataSource.push(newRow);
    // Cloner l'objet pour déclencher la détection des changements dans Angular
    this.dataSource = [...this.dataSource];
  }

  openPopup(rowIndex: number) {
    console.log("Ouverture du popup pour la ligne :", rowIndex);
    
    if (rowIndex !== null && rowIndex >= 0) {
      this.selectedRowIndex = rowIndex;
      this.currentDesignation = this.dataSource[rowIndex]?.designation || "";
      this.popupVisible = true;
      console.log("Popup visible :", this.popupVisible);
      console.log("Valeur de la désignation :", this.currentDesignation);
    } else {
      console.error("Erreur : rowIndex invalide", rowIndex);
    }
  }
  

  closePopup() {
    this.popupVisible = false;
    this.selectedRowIndex = null;
    this.currentDesignation = "";
  }

  saveDesignation() {
    if (this.selectedRowIndex !== null) {
      this.dataSource[this.selectedRowIndex].designation = this.currentDesignation;
      this.dataSource = [...this.dataSource]; // Forcer la mise à jour
    }
    this.closePopup();
  }

  getTypeColor(type: string): string {
    const typeObj = this.actionTypes.find(t => t.designation === type);
    return typeObj ? typeObj.color : 'black'; // Retourne la couleur ou noir par défaut
  }
  

}
