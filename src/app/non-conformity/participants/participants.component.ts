import { Component, OnInit, Input} from '@angular/core';
import { NConformityMenuService } from 'src/app/services/nconformity-menu.service';
import { NonConformityService } from 'src/app/services/non-conformity.service';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';  // Importer ModalController
import { ModalParticipantsComponent } from '../modal-participants/modal-participants.component';
@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule],
  
})
export class ParticipantsComponent  implements OnInit {
  searchQuery: string = ''; 
  filteredParticipants: any[] = [];
  selectedParticipants: any[] = []; // Liste des participants sélectionnés
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('Participants list is loaded');
    this.filteredParticipants = this.selectedParticipants;
  }

  // Fonction appelée lors du clic sur le bouton + pour ouvrir le modal
  async onAddParticipants() {
    const modal = await this.modalController.create({
      component: ModalParticipantsComponent, // Composant modal pour les participants
    });

    // Gestion de la fermeture du modal et récupération des participants sélectionnés
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.selectedParticipants = data.data;  // Mettre à jour les participants sélectionnés
        console.log('Selected participants:', this.selectedParticipants);
      }
    });

    return await modal.present();
  }

  // Fonction de filtrage en fonction du texte recherché
  onSearchChange() {
    const query = this.searchQuery.toLowerCase();
    this.filteredParticipants = this.selectedParticipants.filter(participant =>
      participant.fullName.toLowerCase().includes(query)
    );
  }

}
