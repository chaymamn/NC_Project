import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-modal-participants',
  templateUrl: './modal-participants.component.html',
  styleUrls: ['./modal-participants.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ModalParticipantsComponent  implements OnInit {
  participants: any[] = [
    { matricule: '002', fullName: 'Chartel François', service: 'Ressources' },
    { matricule: '009', fullName: 'Petit Achille', service: 'Méthodes Planification et Production' },
    { matricule: '010', fullName: 'Robert Adonis', service: 'Management et Amélioration continue' },
    { matricule: '011', fullName: 'Laurent Adam', service: 'Méthodes Planification et Production' },
    { matricule: '012', fullName: 'Durand Adolphe', service: 'Méthodes Planification et Production' },
    { matricule: '013', fullName: 'Simon Adrien', service: 'Commercial' },
    { matricule: '014', fullName: 'Sansa Alexis', service: 'Méthodes Planification et Production' },
    { matricule: '017', fullName: 'Leroy Alix', service: 'Management et Amélioration continue' },
    { matricule: '333', fullName: 'Achraf Masri', service: 'Ressources' },
    { matricule: '1245', fullName: 'Fatnassi Mourad', service: 'Foncier SFAX' },
    { matricule: '024', fullName: 'Renard Hugues', service: 'Management et Amélioration continue' },
    { matricule: '225', fullName: 'HZAMI Olfa', service: 'Management et Amélioration continue' },
    { matricule: '021', fullName: 'Marchand Charles', service: 'Ressources' },
    { matricule: '025', fullName: 'Roy Guillaume', service: 'Commercial' },
    { matricule: '2020', fullName: 'BOULAARES Badreddine', service: 'Management et Amélioration continue' },
    { matricule: '1234', fullName: 'SAFI Hounaida', service: 'Management et Amélioration continue' },
    { matricule: '027', fullName: 'Barbier Istelle', service: 'Ventes' },
    { matricule: '018', fullName: 'Guerin Benjamin', service: 'Management et Amélioration continue' },
    { matricule: '1212', fullName: 'MALIK Karim', service: 'Management et Amélioration continue' },
    { matricule: '2000', fullName: 'Rabboudi Lotfi', service: 'Management et Amélioration continue' },
    { matricule: '1222', fullName: 'AYARI Said', service: 'Management et Amélioration continue' },
    { matricule: '0245', fullName: 'Bakkali Imad', service: 'Achats et Gestion des stocks' },
    { matricule: '1214', fullName: 'Wicquart Emmanuel', service: 'Management et Amélioration continue' },
    { matricule: '12345', fullName: 'Sansa Manel', service: 'Management et Amélioration continue' },
    { matricule: '2122', fullName: 'ESSID Brahim', service: 'Management et Amélioration continue' },
    { matricule: '2212', fullName: 'Saoudi Hafedh', service: 'Management et Amélioration continue' },
    { matricule: '020', fullName: 'Gautier Cédric', service: 'Achats et Gestion des stocks' },
    { matricule: '2', fullName: 'Ben Salem Amir', service: 'Foncier Tunis' },
    { matricule: '3', fullName: 'Elamri Samir', service: 'Foncier Ben AROUS' },
    { matricule: '4', fullName: 'Fatnassi Ahmed', service: 'Foncier SFAX' },
    { matricule: '5', fullName: 'Bahri Amna', service: 'Foncier Sousse' },
    { matricule: '2069', fullName: 'Halal Halal', service: 'Commercial' },
    { matricule: '999', fullName: 'HAFFAR Ghizlane', service: 'Management et Amélioration continue' },
    { matricule: '023', fullName: 'Blanchard Hélène', service: 'Facturation' },
    { matricule: '015', fullName: 'Bonnet Ariel', service: 'Commercial' },
    { matricule: '022', fullName: 'Lemaire Christine', service: 'Ressources' },
    { matricule: '026', fullName: 'Schmitt Julien', service: 'Production' },
    { matricule: '028', fullName: 'Martinez Olivia', service: 'Commercial' },
    { matricule: '0102', fullName: 'Bouhdida Amir', service: 'Ressources' },
    { matricule: '0356', fullName: 'BOUHDIDA Rihab', service: 'Management et Amélioration continue' },
    { matricule: '016', fullName: 'Girard Arnaud', service: 'Management et Amélioration continue' },
    { matricule: '0045', fullName: 'Zayati Chaker', service: 'Ressources' },
    { matricule: '001', fullName: 'Muller Antoine', service: 'Direction Gestion des projets, Conception & Développement, Audits' },
    { matricule: '2001', fullName: 'KHARRAT Abdelaziz', service: 'Management et Amélioration continue', details: 'Contrôle Qualité, Pilotage de processus, Risk Analisys, Gestion des projets, Conception & Développement, Contrôle de Gestion' },
    { matricule: '147', fullName: 'ETTAHIRI Maria', service: 'Commercial' },
    { matricule: '258', fullName: 'BENRAYANA Claudia', service: 'Commercial' },
    { matricule: '3056', fullName: 'CHOKRI CHOKRI', service: 'Commercial' },
    { matricule: '369', fullName: 'BEN RAYANA Claudia', service: 'Commercial' },
    { matricule: '0039', fullName: 'ELASLI Neila', service: 'Ressources' },
    { matricule: '0001', fullName: 'Besrour Azza', service: 'Management et Amélioration continue' } 
  ]; // Liste des participants
  selectedParticipants: any[] = [];   // Liste des participants sélectionnés
  searchQuery: string = ''; 
  filteredParticipants: any[] = [];
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log("Participants reçus dans le modal :", this.participants);
  }

  // Fonction de filtrage en fonction du texte recherché
  onSearchChange() {
    const query = this.searchQuery.toLowerCase();
    this.filteredParticipants = this.participants.filter(participant =>
      participant.fullName.toLowerCase().includes(query)
    );
  }

  // Ajouter ou retirer un participant de la sélection
  toggleSelection(participant: any) {
    const index = this.selectedParticipants.findIndex(p => p.matricule === participant.matricule);
    if (index === -1) {
      this.selectedParticipants.push(participant);  // Ajouter le participant
    } else {
      this.selectedParticipants.splice(index, 1);  // Retirer le participant
    }
  }

  // Fermer le modal et renvoyer la liste des participants sélectionnés
  closeModal() {
    this.modalController.dismiss(this.selectedParticipants); // Passer la sélection au parent
  }
}
