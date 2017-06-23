import { DrugInfoContents } from './drug-info-contents';
/**
 * Created by avohra on 6/23/2017.
 */


export class DrugInfo {
  cphaDrugId: string;
  brandName: string;
  genericName: string;
  therapeuticClass: string;
  manufacturers: string;
  revisionDate: string;
  contents: Array<DrugInfoContents>;
}
