import { v4 as uuidv4 } from 'uuid';
import { AnalyseNonConformity } from './analyse-non-conformity';
import { CorrectionsNonConformity } from './corrections-non-conformity';
import { FilesNonConformity } from './files-non-conformity';
import { LinksNonConformity } from './links-non-conformity';
import { ParticipantsNonConformity } from './participants-non-conformity';
import { TriggerLinkNonConformity } from './trigger-link-non-conformity';

export class NonConformity {
  id: string = uuidv4();
  designation: string = '';
  reference: string = '';
  description: string = '';
  requirement: string = '';
  nature: number = 0;
  isConfidential: boolean = false;
  source: number = 0;
  state: number = 0;
  number: number = 0;
  year: number = new Date().getFullYear();
  detectionDate: any;
  closingDate: any;
  analysisDateP: any;
  analysisDateR: any;
  analysisState: number = 0;
  analysisDescription: string = '';
  otherCosts: number = 0.0;
  ncCosts: number = 0.0;
  associatedRisk: string = '';
  associatedOpportunity: string = '';

  processId: string = uuidv4();
  processDesignation: string = '';

  intensityId: string = uuidv4();
  intensityDesignation: string = '';
  intensityColor: string = '';

  typesId: string = uuidv4();
  typesDesignation: string = '';
  typesColor: string = '';

  categoryId: string = uuidv4();
  categoryDesignation: string = '';
  categoryColor: string = '';

  priorityId: string = uuidv4();
  priorityDesignation: string = '';
  priorityColor: string = '';

  frequencyId: string = uuidv4();
  frequencyCode: string = '';
  frequencyDesignation: string = '';
  frequencyFullDesignation: string = '';
  frequencyColor: string = '';

  gravityId: string = uuidv4();
  gravityCode: string = '';
  gravityDesignation: string = '';
  gravityFullDesignation: string = '';
  gravityColor: string = '';

  serviceId: string = uuidv4();
  serviceDesignation: string = '';

  closingRate: number = 0.0;
  realizationRate: number = 0.0;
  progressRate: number = 0.0;

  referenceSource: string = '';
  entitledSource: string = '';
  referenceEntitledSource: string = '';

  triggerSourceId: string = uuidv4();
  triggerAuditType: number = 0;
  hasSeveralSource: boolean = false;
  hasParent: boolean = false;
  isParent: boolean = false;
  overallCost: number = 0.0;

  nonConformitySourceStr: string = '';
  nonConformityNatureStr: string = '';
  stateStr: string = '';
  analysisStateStr: string = '';

  teamsSupervisor: string = '';
  teamsDetector: string = '';
  teamsRespAnalysis: string = '';
  teamsRespCorrection: string = '';
  teamsIsInformed: string = '';

  q: boolean = false;
  s: boolean = false;
  e: boolean = false;
  h: boolean = false;

  system: string = '';
  siteId: string = uuidv4();
  companyId: string = uuidv4();
  isShared: boolean = false;
  sharedWith: string = '';
  isBookmark: boolean = false;
  sharedWithNames: string = '';

  createdDate: any;
  createdBy: string = uuidv4();
  updatedDate: any;
  updatedBy: string | null = null;

  crudFrom: number = 0;
  currentUserId: string = uuidv4();
  currentEmployeeId: string = uuidv4();
  isSystem: boolean = false;
  crud: number = 0;

  // Collections avec les types
  nonConformityAnalysis: AnalyseNonConformity[] = [];
  nonConformityCorrections: CorrectionsNonConformity[] = [];
  nonConformityFiles: FilesNonConformity[] = [];
  nonConformityLinks: LinksNonConformity[] = [];
  nonConformityParticipants: ParticipantsNonConformity[] = [];
  triggerLink: TriggerLinkNonConformity[] = [];
  actionsList: any[] = [];
  nonConformityDocuments: any[] = [];
  nonConformityExternalDocuments: any[] = [];
  nonConformityChapters: any[] = [];
  nonConformityProducts: any[] = [];
  nonConformityRiskOpps: any[] = [];

  constructor(data?: Partial<NonConformity>) {
    if (data) {
      this.id = data.id ?? uuidv4();
      Object.assign(this, data);
    }
  }
}
