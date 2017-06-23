/**
 * Created by avohra on 6/23/2017.
 */

import * as $ from 'jquery';
import { DrugInfo } from '../models/drug-info';

export class DrugInfoHtmlParser {

  private readonly SPACER = ' ';
  private readonly DRUG_INFO_WRAPPER_CLASS = '.brands .brand';
  private readonly DRUG_BRAND_NAME = '.brandname';
  private readonly DRUG_GENERIC_NAME = '.genericname';
  private readonly DRUG_THERAPEUTIC_CLASS = '.therapeuticclass';
  private readonly MANUFACTURER = '.manufacturers .manufacturer';

  private htmlData: any;

  constructor(data: string) {
    const parser = new DOMParser();
    this.htmlData = parser.parseFromString(data, 'text/html');
  }

  parse() {
    let drugInfo = this.parseDrugInfo();
  }

  parseDrugInfo(): DrugInfo {
    let drugInfo = new DrugInfo();

    drugInfo.brandName = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_BRAND_NAME );
    drugInfo.genericName = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_GENERIC_NAME);
    drugInfo.therapeuticClass = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_THERAPEUTIC_CLASS);
    drugInfo.manufacturers = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.MANUFACTURER);

    console.log(drugInfo);

    return drugInfo;
  }

  parseDrugContent() {

  }

  private getElementText(classString: string) {
    return this.elementFinder(classString).text();
  }

  private elementFinder(classString: string) {
    return $(this.htmlData).find(classString);
  }

}