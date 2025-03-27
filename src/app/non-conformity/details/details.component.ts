import { Component, OnInit, Input} from '@angular/core';
import { NConformityMenuService } from 'src/app/services/nconformity-menu.service';
import { NonConformityService } from 'src/app/services/non-conformity.service';
import { CommonModule, DatePipe } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DxHtmlEditorModule } from 'devextreme-angular';
import { NavigationService } from 'src/app/services/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,  DxHtmlEditorModule, ReactiveFormsModule],
})
export class DetailsComponent  implements OnInit {
  
  detailsForm!: FormGroup;
  showSecondPart = false;
  processusList: any[] = []; 
  nonConformityTypes: any[] = [];  
  nonConformityCategories: any[] = [];
  commonPriorities: any[] = []; 
  intensities: any[] = [];
  frequencies: any[] = []; 
  gravities: any[] = []; 
  servicesList: any[] = [];
  isModified: boolean = false;
  NCId: string | null = null;
  selectedProcess: any;
  selectedNCType: any;
  selectedNCCateg: any;
  selectedNCPriority: any;
  selectedNCIntensity: any;
  selectedNCFrequency: any;
  selectedNCGravity: any;
  services: string[] = [
    "Service Ressources",
    "Service Achats et Gestion des stocks",
    "Service Commercial",
    "Service Méthodes Planification et Production",
    "Service Management et Amélioration continue",
    "Service Foncier Tunis",
    "Direction Opérationnelle Tunis",
    "Service Etude Topo Tunis",
    "Service Etudes Urbanistique",
    "Service Etudes VRD Tunis",
    "Service Foncier Ariana",
    "Direction Opérationnelle ARIANA",
    "Service Foncier Sousse",
    "Direction opérationnelle de Sousse",
    "Direction opérationnelle de Sfax",
    "Direction opérationnelle de Ben Arous",
    "Service Foncier Ben AROUS",
    "Service Foncier SFAX",
    "Service Ventes",
    "Service Achat",
    "Service Production",
    "Service commercial",
    "Service QSE",
    "Service Direction",
    "Service Administratif et Financier",
    "Service Facturation",
    "Service Qualité",
    "Direction générale",
    "Direction Ressources Humaines",
    "Service Développement"
  ];
  

  //Constructor 
  constructor(private NcService: NConformityMenuService,
              private fb: FormBuilder,
              public nonConformityService : NonConformityService,
              private navigationService : NavigationService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              )  { }

  ngOnInit() {
    this.NCId = this.route.snapshot.paramMap.get('NCId');
  //   this.detailsForm = this.fb.group({
  //     title: [''],
  //     description: [''],
  //     nature: ['Réelle'],
  //     source: [''],
  //     processus: [''],
  //     service: [''],
  //     intitule: [''],
  //     exigences: [''],
  //     q: [false],
  //     s: [false],
  //     e: [false],
  //     sda: [false],
  //     detectionDate: [''],
  //     type: [''],
  //     categorie: [''],
  //     priorite: [''],
  //     intensite: [''],
  //     frequence: [''],
  //     gravite: [''],
  //     risques: [''],
  //     opportunites: ['']
  //  });

   // Récupérer les données et remplir le formulaire
   if (this.NCId) {
    this.getNCData(this.NCId);
    } else {
    this.initializeNonConformity();
    }
   
    // Restore saved data if exists
    const savedData = this.NcService.getNCData();
    if (savedData) {
    this.detailsForm.patchValue(savedData);
    }

  }

  // Appeler le service pour récupérer la liste des processus
  loadProcesses() {
  this.nonConformityService.getProcessusList().subscribe(
    (data: any[]) => {
      this.processusList = data;  // Stocke les données récupérées dans la variable
      console.log('Processus List:', this.processusList);  // Vous pouvez également ajouter un log pour vérifier les données
        // Ensure selectedProcess is set correctly if non conformity already has a processId
        if (this.nonConformityService.non_conformity?.processId) {
          this.selectedProcess = this.processusList.find(process => process.id === this.nonConformityService.non_conformity.processId);
        }
    },
    (error) => {
      console.error('Error fetching processus list:', error);
    }
    );
  }
  // Appeler le service pour récupérer les types de non conformités
  loadNonConformitiesTypes () {
    this.nonConformityService.getNonConformityTypes().subscribe(
      (data: any[]) => {
        this.nonConformityTypes = data;  // Assigner les types au tableau
        console.log('Non Conformity Types:',this.nonConformityTypes);
        // Ensure selectedNCType is set correctly if non conformity already has a typesId
        if (this.nonConformityService.non_conformity?.typesId) {
          this.selectedNCType = this.nonConformityTypes.find(type => type.id === this.nonConformityService.non_conformity.typesId);
        }
      },
      (error) => {
        console.error('Error fetching non-conformity types:', error);
      }
    );
  }

  // Appeler le service pour récupérer les catégories de non conformités
  loadNonConformitiesCategories () {
    this.nonConformityService.getNonConformityCategories().subscribe(
      (data: any[]) => {
        this.nonConformityCategories = data;
        console.log('Non Conformity Categories:', this.nonConformityCategories);
        // Ensure selectedNCCategory is set correctly if non conformity already has a CategoryId
        if (this.nonConformityService.non_conformity?.categoryId) {
          this.selectedNCCateg = this.nonConformityCategories.find(category => category.id=== this.nonConformityService.non_conformity.categoryId);
        }
      },
      (error) => {
        console.error('Error fetching non-conformity categories:', error);
      }
    );    
  }

  // Appeler le service pour récupérer les priorités des non conformités
  loadNonConformitiesPriorities () {
    this.nonConformityService.getCommonPriorities().subscribe(
      (data: any[]) => {
        this.commonPriorities = data;
        console.log('Common Priorities:', this.commonPriorities);
        // Ensure selectedNCPriority is set correctly if non conformity already has a priorityId
        if (this.nonConformityService.non_conformity?.priorityId) {
          this.selectedNCPriority = this.commonPriorities.find(priority => priority.id=== this.nonConformityService.non_conformity.priorityId);
        }
      },
      (error) => {
        console.error('Error fetching common priorities:', error);
      }
    );
  }
  // Appeler le service pour récupérer les intensités des non conformités
  loadNonConformitiesIntensities(){
    this.nonConformityService.getIntensities().subscribe(
      (data: any[]) => {
        this.intensities = data;
        console.log('intensities:', this.intensities);
        // Ensure selectedNCIntensity is set correctly if non conformity already has an IntensityId
        if (this.nonConformityService.non_conformity?.intensityId) {
          this.selectedNCIntensity = this.intensities.find(intensity => intensity.id=== this.nonConformityService.non_conformity.intensityId);
        }
      },
      (error) => {
        console.error('Error fetching intensities:', error);
      }
    );
  }
  // Appeler le service pour récupérer les fréquences des non conformités
  loadNonConformitiesFrequencies(){
    this.nonConformityService.getFrequencies().subscribe(
      (data: any[]) => {
        this.frequencies = data;
        console.log('frequencies:', this.frequencies);
        // Ensure selectedNCFrequency is set correctly if non conformity already has a frequencyId
        if (this.nonConformityService.non_conformity?.frequencyId) {
          this.selectedNCFrequency = this.frequencies.find(frequency =>frequency.id=== this.nonConformityService.non_conformity.frequencyId);
        }
      },
      (error) => {
        console.error('Error fetching frequencies:', error);
      }
    );
  }
  // Appeler le service pour récupérer les gravités des non conformités
  loadNonConformitiesGravities(){
    this.nonConformityService.getGravities().subscribe(
      (data: any[]) => {
        this.gravities = data; 
        console.log('gravities:', this.gravities);
        // Ensure selectedNCGravity is set correctly if non conformity already has a GravityId
        if (this.nonConformityService.non_conformity?.gravityId) {
          this.selectedNCGravity = this.gravities.find(gravity =>gravity.id=== this.nonConformityService.non_conformity.gravityId);
        }
      },
      (error) => {
        console.error('Error fetching gravities:', error);
      }
    );
  }

  // Method to set the selected service
  setNCService(event: any){
    const selectedService = event.detail.value;
    this.nonConformityService.non_conformity.serviceDesignation = selectedService.designation;
    this.nonConformityService.non_conformity.serviceId = selectedService.id;
  }
  
  // Method to set the selected process
  setNCProcess(process: any) {
    this.selectedProcess = process;  
    if (process) {
      this.nonConformityService.non_conformity.processId = process.id;
      this.nonConformityService.non_conformity.processDesignation = process.designation;
    }
    
    console.log('Process Set:', this.selectedProcess);
  }
  // Method to set the selected non conformity type
  setNCType(nonConformityType: any){
    this.selectedNCType = nonConformityType;
    if (nonConformityType) {
      this.nonConformityService.non_conformity.typesId = nonConformityType.id;
      this.nonConformityService.non_conformity.typesDesignation = nonConformityType.designation;
    }
  }
  // Method to set the selected non conformity category
  setNCCateg(nonConformityCategory: any){
    this.selectedNCCateg = nonConformityCategory;
    if (nonConformityCategory) {
      this.nonConformityService.non_conformity.categoryId = nonConformityCategory.id;
      this.nonConformityService.non_conformity.categoryDesignation = nonConformityCategory.designation;
    }
  }

  // Method to set the selected non conformity priority
  setNCPriority(nonConformityPriority: any){
    this.selectedNCPriority = nonConformityPriority;
    if (nonConformityPriority) {
      this.nonConformityService.non_conformity.priorityId = nonConformityPriority.id;
      this.nonConformityService.non_conformity.priorityDesignation = nonConformityPriority.designation;
    }
  }

  // Method to set the selected non conformity intensity
  setNCINtensity(nonConformityIntensity: any){
    this.selectedNCIntensity = nonConformityIntensity;
    if (nonConformityIntensity) {
      this.nonConformityService.non_conformity.intensityId = nonConformityIntensity.id;
      this.nonConformityService.non_conformity.intensityDesignation = nonConformityIntensity.designation;
    }
  }

  // Method to set the selected non conformity frequency
  setNCFrequency(nonConformityFrequency: any){
    this.selectedNCFrequency = nonConformityFrequency;
    if (nonConformityFrequency) {
      this.nonConformityService.non_conformity.frequencyId = nonConformityFrequency.id;
      this.nonConformityService.non_conformity.frequencyDesignation = nonConformityFrequency.designation;
    }
  }

  // Method to set the selected non conformity gravity
  setNCGravity(nonConformityGravity: any){
    this.selectedNCGravity = nonConformityGravity;
    if (nonConformityGravity) {
      this.nonConformityService.non_conformity.gravityId = nonConformityGravity.id;
      this.nonConformityService.non_conformity.gravityDesignation = nonConformityGravity.designation;
    }
  }


  //initializing non conformity
  initializeNonConformity() {
    this.nonConformityService.initNonConformity().subscribe((data) => {
      if (data) {
        this.formatNonConformityDates();
        this.nonConformityService.non_conformity = data;
        this.isModified = false;
      }
    });
  }

  formatNonConformityDates() {
    this.nonConformityService.non_conformity.detectionDate = this.datePipe.transform(this.nonConformityService.non_conformity.detectionDate,"yyyy-MM-dd'T'HH:mm:ss");
  }


  //Méthode pour afficher la deuxième partie de non conformity details
  next() {
    this.showSecondPart = true;
  }

  //Go back
  goBack() {
    this.navigationService.goBack();
  }

  //Getting non conformity data
  getNCData(NCId: string) {
    this.nonConformityService.getNCById(NCId).subscribe((data) => {
      if (data) {
        this.formatNonConformityDates();
        this.nonConformityService.non_conformity = data;
        this.isModified = false;
      }
    });
  }
}
