import { v4 as uuidv4 } from 'uuid';

export class AnalyseNonConformity {
  id: string = uuidv4();
  nonConformityId: string = uuidv4();
  causeId: string = uuidv4();
  causeDesignation: string = '';
  causeOrder: number = 0;
  designation: string = '';
  description: string = '';
  isRootCause: boolean = false;
  isMaintained: boolean = false;
  filePath: string | null = null;
  
  createdDate: Date = new Date();
  createdBy: string = uuidv4();
  updatedDate: Date | null = null;
  updatedBy: string | null = null;

  crudFrom: number = 0;
  currentUserId: string = uuidv4();
  currentEmployeeId: string = uuidv4();
  isSystem: boolean = false;
  crud: number = 0;

  constructor(data?: Partial<AnalyseNonConformity>) {
    if (data) {
      this.id = data.id ?? uuidv4();
      Object.assign(this, data);
    }
  }
}
