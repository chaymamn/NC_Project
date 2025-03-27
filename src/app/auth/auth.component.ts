import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgIf,CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // To make API calls for companies and sites
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true, // Add this to make the component standalone
  imports: [NgIf,CommonModule, FormsModule, RouterModule, IonicModule], // Add IonicModule here to recognize ion-content and other Ionic components
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthComponent implements OnInit, AfterViewInit {
  username: string = '';
  password: string = '';
  selectedCompany: string = '';
  selectedSite: string = '';
  companies: any[] = [];
  sites: any[] = [];
  filteredSites: any[] = []; // Make sure this is initialized as an empty array
  errorMessage: string = '';
  toastMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.fetchCompanies();  // Fetch companies on component initialization
  }

  ngAfterViewInit() {
    // Ensures that fetchCompanies is called after the view has been initialized
    setTimeout(() => {
      this.fetchCompanies();  // Call fetchCompanies after the view is initialized
    });
  }

  fetchCompanies() {
    this.http.get('https://timserver.northeurope.cloudapp.azure.com/QalitasWebApi/api/authorize/companies').subscribe(
      (data: any) => {
        console.log('Fetched companies:', data);
        this.companies = data;
      },
      error => {
        this.errorMessage = 'Error fetching companies.';
        console.error('Error fetching companies:', error);
      }
    );
  }

  fetchSitesByCompany(companyId: string) {
    this.http.get(`https://timserver.northeurope.cloudapp.azure.com/QalitasWebApi/api/authorize/${companyId}/SitesByCompany`).subscribe(
      (data: any) => {
        console.log('Fetched sites for company:', data);
        this.filteredSites = data; // Filter sites based on the selected company
      },
      error => {
        this.errorMessage = 'Error fetching sites for the selected company.';
        console.error('Error fetching sites for the selected company:', error);
      }
    );
  }

  onCompanyChange() {
    if (this.selectedCompany) {
      this.fetchSitesByCompany(this.selectedCompany); // Fetch sites based on the selected company
    }
  }

  async loginUser() {
    if (!this.username || !this.password || !this.selectedCompany || !this.selectedSite) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }
  
    // Pass dynamic companyId and siteId
    this.authService.login(this.username, this.password, this.selectedCompany, this.selectedSite).subscribe(
      async (response: any) => {
        if (response.access_token) {
          await this.authService.saveToken(response.access_token);
          this.showToast('User logged in successfully!');
          console.log('Token after login:', response.access_token);
          this.router.navigate(['/ncList']); 
        }
      },
      error => {
        this.errorMessage = 'Login failed. Check your credentials.';
        console.error('Login error:', error);
      }
    );
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
}
