import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MenuPage } from '../non-conformity/menu/menu.component'; 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 
  imports: [IonicModule, RouterModule, CommonModule, FormsModule, MenuPage],
})
export class HomePage implements OnInit, AfterViewInit {
  auditsList: any[] = [];  // Final array for *ngFor
  filteredAuditsList: any[] = [];  // List to hold filtered audits
  searchQuery: string = '';  // Holds the search query
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router, 
    private toastController: ToastController,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isLoggedIn();
    console.log("User authenticated:", this.isAuthenticated);  // Verify if user is logged in
    if (this.isAuthenticated) {
      console.log('HomePage Loaded');
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
  
  async logoutUser() {
    console.log("Logout button clicked");
    await this.authService.logout();
    this.isAuthenticated = false;
    this.auditsList = [];
    this.filteredAuditsList = [];  // Clear the filtered list
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

  goToAuth() {
    this.router.navigate(['/login']); // Redirige vers la page Auth
  }
   
}
