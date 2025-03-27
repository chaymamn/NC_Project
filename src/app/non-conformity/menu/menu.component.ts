import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute, Router  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// Importation des standalone components
import { DetailsComponent } from '../details/details.component';
import { ActionsComponent } from '../actions/actions.component';
import { ParticipantsComponent } from '../participants/participants.component';
import { MediaComponent } from '../media/media.component';
import { CausesComponent } from '../causes/causes.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { NonConformityService } from 'src/app/services/non-conformity.service';

@Component({
  selector: 'app-non-conformity',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule,
  DetailsComponent , ActionsComponent, ParticipantsComponent, MediaComponent, CausesComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuPage implements OnInit {
  NCId: string | null = null;
  selectedSegment: string = 'details'; 

  constructor(private navigationService: NavigationService, private NCService: NonConformityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const segment = this.route.snapshot.paramMap.get('selectedSegment');
    this.NCId = this.route.snapshot.paramMap.get('NCId');
    
    if (segment) {
      this.selectedSegment = segment;
    }
    
    if (this.NCId) {
      this.getNonConformityData(this.NCId);
    } 
    else if (this.NCService.non_conformity) {
      this.initializeNonConformity();
    }
  }

  // Initialize non conformity only if not already initialized
  initializeNonConformity() {
    console.log("Initializing non conformity...");
    this.NCService.initNonConformity().subscribe((data) => {
      if (data) {
        this.NCService.non_conformity = data;
      }
    });
  }

  //Change menu tab
  segmentChanged(event: any) {
    console.log('Segment changé:', event.detail.value);
    this.selectedSegment = event.detail.value;
  }

  //Getting non conformity data
  getNonConformityData(NCId: string) {
    this.NCService.getNCById(NCId).subscribe((data) => {
      if (data) {
        this.NCService.non_conformity = data;
      }
    });
  }

  //Go back
   goBack() {
    this.navigationService.goBack();
  }

  //Saving non conformity
  saveNonConformity() {
    if (this.NCId) {
      // Mode édition : mettre à jour l'action existante
      this.NCService.updateNonConformity().subscribe(() => {
        console.log('Non conformity mise à jour avec succès');
        this.router.navigate(['/ncList']); // Rediriger après sauvegarde
      });
    } else {
      // Mode ajout : créer une nouvelle action
      this.NCService.createNonConformity(this.NCService.non_conformity).subscribe(newNonConformity => {
        console.log('Nouvelle non conformité créée avec succès');
        this.router.navigate(['/ncList']); // Rediriger après ajout
      });
    }
  } 

}

