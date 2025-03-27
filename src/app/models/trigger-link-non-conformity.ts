import { v4 as uuidv4 } from 'uuid';
export class TriggerLinkNonConformity {
    id: string = uuidv4();
    nonConformityId: string = uuidv4();
    linkType: number = 0;
    linkSource: number = 0;
    comments: string | null = null;
    linkTypeStr: string = '';
    linkSourceStr: string = '';
  
    customerComplaintId: string | null = null;
    customerComplaintReference: string | null = null;
    customerComplaintDesignation: string | null = null;
  
    customerSatisfactionId: string | null = null;
    customerSatisfactionReference: string | null = null;
    customerSatisfactionDesignation: string | null = null;
  
    employeeSatisfactionId: string | null = null;
    employeeSatisfactionReference: string | null = null;
    employeeSatisfactionDesignation: string | null = null;
  
    objectiveId: string | null = null;
    objectiveDesignation: string | null = null;
  
    indicatorId: string | null = null;
    indicatorDesignation: string | null = null;
  
    eControlId: string | null = null;
    eControlReference: string | null = null;
    eControlAspectCode: string | null = null;
    eControlAspectDesignation: string | null = null;
  
    ohsControlId: string | null = null;
    ohsControlReference: string | null = null;
    ohsControlHazards: string | null = null;
  
    ohsAccidentId: string | null = null;
    ohsAccidentReference: string | null = null;
    ohsAccidentDesignation: string | null = null;
  
    operationalControlId: string | null = null;
    operationalControlReference: string | null = null;
    operationalControlDesignation: string | null = null;
  
    emergencySimulationId: string | null = null;
    emergencySimulationReference: string | null = null;
    emergencySimulationDesignation: string | null = null;
  
    auditId: string | null = null;
    auditReference: string | null = null;
    auditDesignation: string | null = null;
    auditType: number | null = null;
  
    conformityReqId: string | null = null;
    conformityReqDesignation: string | null = null;
  
    reviewId: string | null = null;
  
    evaluationQualServId: string | null = null;
    evaluationQualServReference: string | null = null;
  
    ipComplaintId: string | null = null;
    ipComplaintReference: string | null = null;
    ipComplaintDesignation: string | null = null;
  
    controlId: string | null = null;
    controlReference: string | null = null;
    controlProductReference: string | null = null;
    controlProductDesignation: string | null = null;
    controlProductFullDesignation: string | null = null;
  
    mControlId: string | null = null;
    mControlReference: string | null = null;
  
    fsControlId: string | null = null;
    fsControlReference: string | null = null;
    fsControlDesignation: string | null = null;
  
    nonConformityDesignation: string = '';
    nonConformitySource: number = 0;
    nonConformityNature: number = 0;
    nonConformityState: number = 0;
    nonConformityProcessId: string = uuidv4();
  
    sourceNonConformityId: string | null = null;
    provisionalLinkId: string | null = null;
    provisionalLinkId1: string | null = null;
    provisionalLinkId2: string | null = null;
  
    referenceSource: string | null = null;
    entitledSource: string | null = null;
    referenceEntitledSource: string | null = null;
  
    nonConformitySourceStr: string = '';
    nonConformityNatureStr: string = '';
    nonConformityStateStr: string = '';
  
    createdDate: Date = new Date();
    createdBy: string = uuidv4();
    updatedDate: Date | null = null;
    updatedBy: string | null = null;
  
    crudFrom: number = 0;
    currentUserId: string = uuidv4();
    currentEmployeeId: string = uuidv4();
    isSystem: boolean = false;
    crud: number = 0;
  
    constructor(data?: Partial<TriggerLinkNonConformity>) {
      if (data) {
        this.id = data.id ?? uuidv4();
        Object.assign(this, data);
      }
    }
    
}
