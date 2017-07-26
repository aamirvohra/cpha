import { DrugInfoContents } from './drug-info-contents';
/**
 * Created by avohra on 6/23/2017.
 */


export class DrugInfo {
  brandName: string;
  genericName: string;
  therapeuticClass: string;
  manufacturers: string;
}

export class DrugRecords {
  cphaDrugId: string;
  records: Array<DrugInfo>;
  revisionDate: string;
  contents: Array<DrugInfoContents>;
}
