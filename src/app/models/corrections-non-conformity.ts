import { v4 as uuidv4 } from 'uuid';
export class CorrectionsNonConformity {
    id: string = uuidv4();
    nonConformityId: string = uuidv4();
    nonConformityDesignation: string = '';
    nonConformityReference: string = '';
    nonConformityState: number = 0;
    nonConformityIsConfidential: boolean = false;
    nonConformityNature: number = 0;
    nonConformitySource: number = 0;
    nonConformityProcessId: string = uuidv4();
    nonConformityProcessDesignation: string = '';
    nonConformitySiteId: string = uuidv4();
    nonConformityCompanyId: string = uuidv4();
    nonConformityQ: boolean = false;
    nonConformityS: boolean = false;
    nonConformityE: boolean = false;
    nonConformityH: boolean = false;
    employeeId: string = uuidv4();
    employeeSerialNumber: string = '';
    employeeFullName: string = '';
    employeeIsEnabled: boolean = false;
    designation: string = '';
    description: string = '';
    correctionDateP: Date = new Date();
    correctionDateR: Date = new Date();
    correctionState: number = 0;
    typesId: string = uuidv4();
    typesDesignation: string = '';
    typesColor: string = '';
    correctionStateStr: string = '';
    nonConformitySourceStr: string = '';
    nonConformityNatureStr: string = '';
    nonConformityStateStr: string = '';
    createdDate: Date = new Date();
    createdBy: string = uuidv4();
    updatedDate: Date = new Date();
    updatedBy: string = uuidv4();
    crudFrom: number = 0;
    currentUserId: string = uuidv4();
    currentEmployeeId: string = uuidv4();
    isSystem: boolean = false;
    crud: number = 0;
  
    constructor(data?: Partial<CorrectionsNonConformity>) {
      if (data) {
        this.id = data.id ? data.id : uuidv4(); 
        Object.assign(this, data);
      }
    }
}
