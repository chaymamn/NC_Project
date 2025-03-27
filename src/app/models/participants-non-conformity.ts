import { v4 as uuidv4 } from 'uuid';

export class ParticipantsNonConformity {
  id: string = uuidv4();
  nonConformityId: string = uuidv4();
  employeeId: string = uuidv4();
  employeeSerialNumber: string = '';
  employeeFullName: string = '';
  employeeEmail: string = '';
  serialNumberFullName: string = '';
  roleIsSupervisor: boolean = false;
  roleIsDetector: boolean = false;
  roleIsRespCorrection: boolean = false;
  roleIsRespAnalysis: boolean = false;
  roleIsInformed: boolean = false;
  roleComments: string = '';
  crud: number = 0;
  legacyId: string = uuidv4();
  typeLegacy: number = 0;
  createdDate: Date = new Date();
  createdBy: string = uuidv4();
  updatedDate: Date = new Date();
  updatedBy: string = uuidv4();
  currentUserId: string = uuidv4();
  currentEmployeeId: string = uuidv4();
  isSystem: boolean = false;
  crudFrom: number = 0;
  employeeIsEnabled: boolean = false;

  isSelected: boolean = false; // Pour suivre l'état de sélection dans une liste

  constructor(data?: Partial<ParticipantsNonConformity>) {
    if (data) {
      this.id = data.id ? data.id : uuidv4(); // Si l'ID est passé, l'utiliser ; sinon, en générer un
      Object.assign(this, data);
    }
  }
}
