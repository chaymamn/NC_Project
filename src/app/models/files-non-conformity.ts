import { v4 as uuidv4 } from 'uuid';

export class FilesNonConformity {
  id: string = uuidv4();
  nonConformityId: string = uuidv4();
  comments: string = '';
  linkType: number = 0;
  filePath: string = '';
  fileData: string = '';
  generatedFileName: string = '';
  virtualPath: string = '';
  fileName: string = '';

  createdDate: Date = new Date();
  createdBy: string = uuidv4();
  updatedDate: Date | null = null;
  updatedBy: string | null = null;

  crudFrom: number = 0;
  currentUserId: string = uuidv4();
  currentEmployeeId: string = uuidv4();
  isSystem: boolean = false;
  crud: number = 0;

  constructor(data?: Partial<FilesNonConformity>) {
    if (data) {
      this.id = data.id ?? uuidv4();
      Object.assign(this, data);
    }
  }
}
