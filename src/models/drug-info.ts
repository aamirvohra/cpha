/**
 * Created by avohra on 6/23/2017.
 */

export class Drug {
  cphaDrugId: string;
  drugInfo: BasicDrugInfo;
  subCategoryDrug: Array<SubCategoryDrug>;
}

export class SubCategoryDrug {
  drugInfo: BasicDrugInfo;
  contents: Array<DrugContents>;
}


export class BasicDrugInfo {
  brandName: string;
  genericName: string;
  therapeuticClass: string;
  manufacturers: string;
  revisionDate: string;
}
export class DrugContents {
  header: string;
  anchorIdReference: string;
  htmlElement: string;
}
