import { Component, OnInit,  ViewChild } from '@angular/core';
import {DxPopupModule, DxDataGridModule} from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NonConformityService } from 'src/app/services/non-conformity.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LinksNonConformity } from 'src/app/models/links-non-conformity';

@Component({
  selector: 'app-creation-non-conformity',
  templateUrl: './creation-non-conformity.component.html',
  styleUrls: ['./creation-non-conformity.component.scss'],
  standalone: true,
  imports: [DxPopupModule,CommonModule, IonicModule, FormsModule, DxDataGridModule],
})
export class CreationNonConformityComponent  implements OnInit {
  // Variables liées à la popup
  popupVisible = false;

  // Données à afficher dans la popup
  typeLien: string = 'Déclenché(e)';

  _source: string = '';
  ncComment: string = "";
  ncLinks : LinksNonConformity[] = this.nonConformityService.non_conformity.nonConformityLinks;

  sourceOptions: string[] = [
    'Interne', 'Audit Interne', 'Audit Externe', 'Audit Certification',
    'Réclamations Clients', 'Contrôles Qualités'];

  intitule: string = '';
  nature: string = '';
  commentaires: string = '';
  // Tableau pour stocker les audits
  audits: any[] = [];
  qualityControls: any[] = [];
  displayedData: any[] = [];
  // Variable pour stocker l'enregistrement sélectionné
  selectedRecord: any ;
  selectRecordId: string ='';

  auditID: string ='';
  ccID: string ='';
  qcID: string ='';

  constructor(private route: ActivatedRoute, private router: Router, public nonConformityService: NonConformityService, private toastController: ToastController) { }

  ngOnInit() {
  // Afficher la popup à l'initialisation
    this.popupVisible = true;
    this.source = this.sourceOptions[0];
  }

  // Fermer la popup
  closePopup() {
    this.popupVisible = false;
    this.router.navigate(['/ncList']);
  }

    //selecting row method
    selectRecord(event: any) {
      this.selectedRecord = event.data;
      this.selectRecordId = event.data.id;

      if(this.source){
        //case audit
        if(this.source === "Audit Interne" || this.source === "Audit Certification" || this.source === "Audit Externe" ){
          this.auditID = this.selectRecordId;       
        }
        //case quality controle
        else if (this.source === "QualityControl"){
          this.qcID = this.selectRecordId;       
        }
        //case customer complaint
        else{
          this.ccID = this.selectRecordId;     
        }
      }
      console.log("selected record id:",this.selectRecordId);
    }

   // Enregistrer les données (à adapter selon ton modèle de données)
   async saveLink() {
    if (this.source !== 'Interne' && (!this.selectedRecord || Object.keys(this.selectedRecord).length === 0)) {
      await this.presentToast('Veuillez choisir un enregistrement avant d’enregistrer.');
      return;
    }
    // Mettez à jour le champ commentaires pour le lien non-conformité
    const linkToSave = new LinksNonConformity({
      comments: this.ncComment, 
      linkTypeStr: this.typeLien,
      linkSourceStr: this.source,
      auditId: this.auditID,
      controlId: this.qcID,
      customerComplaintId: this.ccID,
    });

    // Ajouter ce lien à la liste des ncLinks (ou effectuez une opération d'ajout dans votre service)
    this.ncLinks.push(linkToSave);  
    this.nonConformityService.non_conformity.nonConformityLinks = [...this.ncLinks];
    console.log("nc service data:", this.nonConformityService.non_conformity);  
    this.router.navigate (['/details']); 
  }

  /* charger les données relatives au tableau */
  //Charger les audits
  loadAudits() {
    this.displayedData = [];
    if (['Audit Interne', 'Audit Externe', 'Audit Certification'].includes(this.source)) {
      this.nonConformityService.getAudits().subscribe((data: any[]) => {
        // Filtrer les audits en fonction du type sélectionné
        this.displayedData = data.filter(audit => audit.auditNatureStr === this.source);
      });
    } else {
      this.audits = [];
      this.displayedData = [];
    }
  }

  //Charger les controles qualités
  loadQualityControls() {
    this.displayedData = [];
    if (this.source === 'Contrôles Qualités') {
      this.nonConformityService.getQualityControle().subscribe((data: any[]) => {
        this.displayedData = data;
      });
    } else {
      this.qualityControls = [];
      this.displayedData = [];
    }
  }

  // Charger les réclamations clients
  loadCustomerComplaints() {
    this.displayedData = [];
    if (this.source === 'Réclamations Clients') {
      this.nonConformityService.getCustomerComplaints().subscribe((data: any[]) => {
        this.displayedData = data.map(item => ({
          year: item.year,
          reference: item.reference,
          customerDesignation: item.customerDesignation,
          customerTypeFullDesignation: item.customerTypeFullDesignation,
          complaintTypesDesignation: item.complaintProducts?.[0]?.complaintTypesDesignation,
          productReference: item.complaintProducts?.[0]?.productReference,
          designation: item.designation,
          stateStr: item.stateStr,
          date: item.date
        }));
      });
    } else {
      this.displayedData = [];
    }
  }



  //getter et setter pour la source
  get source(): string {
    return this._source;
  }
  set source(value: string) {
    this._source = value;
    this.displayedData = [];
    switch (value) {
      case 'Contrôles Qualités':
        this.loadQualityControls();
        break;
      case 'Réclamations Clients':
        this.loadCustomerComplaints();
        break;
      case 'Audit Interne':
      case 'Audit Externe':
      case 'Audit Certification':
        this.loadAudits();
        break;
      default:
        this.displayedData = [];
    }
  }


  //Toast alert method
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom', 
      color: 'danger' 
    });
    await toast.present();
  }
}