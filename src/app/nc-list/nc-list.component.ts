import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router'; 
import { NonConformityService } from '../services/non-conformity.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NonConformity } from '../models/non-conformity';

@Component({
  selector: 'app-nc-list',
  templateUrl: './nc-list.component.html',
  styleUrls: ['./nc-list.component.scss'],
  standalone: true, 
  imports: [IonicModule, RouterModule, CommonModule, FormsModule],
})
export class NCListComponent  implements OnInit, AfterViewInit {
  NonConformityList: any[] = [];  // Final array for *ngFor
  filteredNCList: any[] = [];  // List to hold filtered NC
  searchQuery: string = '';  // Holds the search query
  isAuthenticated = false;
  isViewModalOpen: boolean = false;
  selectedNc: NonConformity | null = null;

  constructor(
    private authService: AuthService,
    public nonConformityService: NonConformityService,
    private router: Router, 
    private toastController: ToastController,
    private cdr: ChangeDetectorRef,
  ) { }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isLoggedIn();
    console.log("User authenticated:", this.isAuthenticated);  // Verify if user is logged in
    if (this.isAuthenticated) {
      this.loadNonConformities();
      console.log('nc-list page Loaded');
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log("🔍 Vérification après délai...");
      const btn = document.getElementById('logoutBtn'); // Recherche par ID
      if (btn) {
        console.log("✅ Bouton Logout détecté !");
        btn.addEventListener('click', () => {
          console.log('🚀 Bouton Logout cliqué via addEventListener');
        });
      } else {
        console.error("❌ Bouton Logout toujours non trouvé !");
      }
    }, 2000); // Augmente le délai à 2 secondes pour tester
  }

  //Loading non-conformities list
  loadNonConformities() {
    console.log("Fetching non conformities...");
    this.nonConformityService.getAllNC().subscribe(
      (data) => {
        console.log("Non conformities Data:", data);  // Check the structure of the data
        this.NonConformityList = data || [];  // Assign directly if data is already an array
        this.cdr.detectChanges(); // Force la mise à jour de l'affichage
        this.filteredNCList = [...this.NonConformityList];  // Set filtered list to all audits initially
        console.log("Fetched non conformities:", this.NonConformityList);

        setTimeout(() => {
          this.cdr.detectChanges(); // Force la mise à jour de l'UI
        }, 100); 
      },
      (error) => {
        console.error('Error fetching non conformities:', error);
      }
    );
  }

  //Filtering non conformities
  filterNC() {
    if (this.searchQuery.trim() === '') {
      this.filteredNCList = [...this.NonConformityList];  // Reset to all audits if no search query
      console.log("Filtered non conformities:", this.filteredNCList);
    }
     else 
     {
      this.filteredNCList = this.NonConformityList.filter(NonConformity => 
        NonConformity .reference?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        NonConformity .designation?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        NonConformity .nature?.toString().includes(this.searchQuery) ||
        NonConformity.intensityDesignation?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        NonConformity.stateStr?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        NonConformity.nonConformitySourceStr?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        NonConformity.referenceSource?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        NonConformity.system?.toLowerCase().includes(this.searchQuery.toLowerCase()) 
      );
    }
  }

  //Logging out from non conformity list page
  async logoutUser() {
    console.log("Logout button clicked");
    await this.authService.logout();
    this.isAuthenticated = false;
    this.NonConformityList = [];
    this.filteredNCList = [];  // Clear the filtered list
    this.showToast('User logged off successfully!');
    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  //Destinguishing statuses by colours
  getStateColor(state: string): string {
    switch (state) {
      case 'Clôturée':
        return 'cloture';
      case 'En cours':
        return 'en-cours';
      default:
        return '';
    }
  }

  //attributing colors to intensities
  getIntensityClass(intensity: string): string {
    if (intensity === 'Mineure') {
      return 'minor';
    } else if (intensity === 'Majeure') {
      return 'major';
    } else {
      return 'default'; // Par défaut, bleu
    }
  }

  // Fonction pour rediriger vers la page de création de non-conformité
  goToCreationNonConformity(type: string) {
    this.nonConformityService.non_conformity.nonConformityNatureStr = type;
    this.router.navigate(['/creation-non-conformity']);
  }
  
  openNcDetails(nc: NonConformity) {
    this.selectedNc = nc;
    this.isViewModalOpen = true; // Open the modal
  }

}
