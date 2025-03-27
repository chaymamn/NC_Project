import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NonConformityService } from 'src/app/services/non-conformity.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-save-non-conformity',
  templateUrl: './save-non-conformity.component.html',
  styleUrls: ['./save-non-conformity.component.scss'],
  standalone:true,
  imports: [CommonModule, IonicModule, FormsModule],
  providers: [DatePipe]
})
export class SaveNonConformityComponent  implements OnInit {
  NCId: string | null = null;
  @Input() nonConformityData!: any; // Data received from DetailsComponent

  constructor(
    private router: Router, 
    private datePipe: DatePipe, 
    private route: ActivatedRoute, 
    private NCservice: NonConformityService) {}

  ngOnInit() {
    this.NCId = this.route.snapshot.paramMap.get('NCId');
  }

  //Method to save the non conformity 
  saveNonConformity (nonConformityData: any): Observable<any>{
    console.log("SaveNonConformity called!");
    console.log("Received non-conformity data:", nonConformityData);
    console.log("NCId:", this.NCId);
  
    if (!this.nonConformityData) {
      console.error("Non-conformity object is undefined!");
      // Retourner un Observable vide ou une erreur observable
      return new Observable(observer => {
        observer.error("Non-conformity data is undefined.");
      });
    }

    const formattedDetectionDate = this.datePipe.transform(nonConformityData.detectionDate, "yyyy-MM-dd'T'HH:mm:ss");
    nonConformityData.detectionDate = formattedDetectionDate ? new Date(formattedDetectionDate) : null;

    const formattedAnalysisDateP = this.datePipe.transform(nonConformityData.analysisDateP, "yyyy-MM-dd'T'HH:mm:ss");
    nonConformityData.analysisDateP = formattedAnalysisDateP ? new Date(formattedAnalysisDateP) : null;

    const formattedAnalysisDateR = this.datePipe.transform(nonConformityData.analysisDateR, "yyyy-MM-dd'T'HH:mm:ss");
    nonConformityData.analysisDateR = formattedAnalysisDateR ? new Date(formattedAnalysisDateR) : null;

    console.log("Formatted Dates:", {
      detectionDate: this.NCservice.non_conformity.detectionDate,
      analysisDateP: this.NCservice.non_conformity.analysisDateP,
      analysisDateR: this.NCservice.non_conformity.analysisDateR,
    });

    
    if (!this.NCId) {
      console.log("Creating new non-conformity...");
      console.log("Payload envoyé :", JSON.stringify(this.nonConformityData, null, 2));
      if (!this.nonConformityData.nature || !this.nonConformityData.source) {
        console.error("Erreur : nature ou source est manquant !");
        return new Observable(observer => {
          observer.error("Missing nature or source.");
        });
      }      
      // Non conformity creation case
      this.NCservice.createNonConformity(this.nonConformityData).subscribe(
        data => {
          if (data) {
            console.log("Non conformity added successfully.");
            this.NCservice.initNonConformity();
            this.router.navigate(["ncList"]);
          }
        },
        error => {
          console.error("Error saving non conformity:", error);
        }
      );
    }
    // Retourner un Observable vide si aucune condition n'est remplie (si NCId existe mais aucune action à réaliser)
    return new Observable(observer => {
      observer.complete();
    });
  }

}
