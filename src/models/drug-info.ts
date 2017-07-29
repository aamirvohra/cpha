/**
 * Created by avohra on 6/23/2017.
 */

export class Drug {
  cphaDrugId: string;
  drugInfo: Array<BasicDrugInfo>;
  topLevelDrugContents: Array<DrugContents>;
  subCategoryDrug: Array<SubCategoryDrug>;
  revisionDate: string;
}

export class SubCategoryDrug {
  // drugInfo: BasicDrugInfo;
  contents: Array<DrugContents>;
}


export class BasicDrugInfo {
  brandName: string;
  genericName: string;
  therapeuticClass: string;
  manufacturers: string;
}
export class DrugContents {
  header: string;
  anchorIdReference: string;
  htmlElement: string;
}
