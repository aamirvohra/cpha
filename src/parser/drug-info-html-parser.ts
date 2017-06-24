/**
 * Created by avohra on 6/23/2017.
 */

import * as $ from 'jquery';
import { DrugInfo } from '../models/drug-info';
import { DrugInfoContents } from '../models/drug-info-contents';

export class DrugInfoHtmlParser {

  private readonly SPACER = ' ';
  private readonly DRUG_INFO_WRAPPER_CLASS = '.chapter-wrap .brands .brand';
  private readonly DRUG_BRAND_NAME = '.brandname';
  private readonly DRUG_GENERIC_NAME = '.genericname';
  private readonly DRUG_THERAPEUTIC_CLASS = '.therapeuticclass';
  private readonly MANUFACTURER = '.manufacturers .manufacturer .dita-xref';
  private readonly REVISION_DATE = '.chapter-info td p';

  private readonly DRUG_CONTENT_WRAPPER_CLASS = '.dita-topic .dita-nav-subtopics-ifp li';
  private readonly DRUG_CONTENT_NAVIGATOR_CLASS = 'a.navigator-section';


  private htmlData: any;

  constructor(data: string) {
    const parser = new DOMParser();
    this.htmlData = parser.parseFromString(data, 'text/html');
  }

  parse() {
    const drugInfo = this.parseDrugInfo();
    drugInfo.contents = this.parseDrugContent();
    return drugInfo;
  }

  parseDrugInfo(): DrugInfo {
    let drugInfo = new DrugInfo();
    drugInfo.cphaDrugId = $(this.htmlData).find('div:first-child').attr('id').replace('cpha_', '');
    drugInfo.brandName = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_BRAND_NAME );
    drugInfo.genericName = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_GENERIC_NAME);
    drugInfo.therapeuticClass = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_THERAPEUTIC_CLASS);
    drugInfo.manufacturers = this.getElementText(this.DRUG_INFO_WRAPPER_CLASS + this.SPACER + this.MANUFACTURER);
    drugInfo.revisionDate = this.getElementText(this.REVISION_DATE);

    return drugInfo;
  }


  parseDrugContent(): Array<DrugInfoContents> {
    const arrayContents: Array<DrugInfoContents> = [];
    const self = this;
    $(this.htmlData).find(this.DRUG_CONTENT_WRAPPER_CLASS).each(
      function() {
        const drugContents = new DrugInfoContents();
        drugContents.text = $(this).find(self.DRUG_CONTENT_NAVIGATOR_CLASS).text().trim();
        drugContents.anchorId = $(this).find(self.DRUG_CONTENT_NAVIGATOR_CLASS).attr('href');
        arrayContents.push(drugContents);
      }
    );

    return arrayContents;
  }

  private getElementText(classString: string) {
    return this.elementFinder(classString).text().trim();
  }

  private getElementsDirectText(classString: string) {
    return (this.elementFinder(classString)
      .contents()
      .filter(
        function() {
          return this.nodeType === 3;
        }
      )[0].nodeValue).trim();
  }

  private elementFinder(classString: string) {
    return $(this.htmlData).find(classString);
  }

}