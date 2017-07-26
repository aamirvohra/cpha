/**
 * Created by avohra on 6/23/2017.
 */

import * as $ from 'jquery';
import { DrugInfo, DrugRecords } from '../models/drug-info';
import { DrugInfoContents } from '../models/drug-info-contents';

export class DrugInfoHtmlParser {

  private readonly SPACER = ' ';
  private readonly DRUG_BRANDS_WRAPPER_CLASS = '.brands';
  private readonly DRUG_BRAND_INFO_WRAPPER_CLASS = this.DRUG_BRANDS_WRAPPER_CLASS + ' .brand';
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
    const drugsRecord = new DrugRecords();
    drugsRecord.cphaDrugId = $(this.htmlData).find('div[id^="cpha_"]').attr('id');
    drugsRecord.revisionDate = this.getElementText(this.REVISION_DATE);
    drugsRecord.records = this.parseDrugRecords();
    drugsRecord.contents = this.parseDrugContent();

    return drugsRecord;
    // console.log(drugsRecord);
    // const drugInfo = this.parseDrugInfo();
    // drugInfo.contents = this.parseDrugContent();
    // return drugInfo;
  }

  parseDrugRecords(): Array<DrugInfo> {
    const record: Array<DrugInfo> = [];
    const self = this;
    // loop through all brands and collect the basic info
    $(this.htmlData).find(this.DRUG_BRAND_INFO_WRAPPER_CLASS).each(
      function() {
        record.push(self.parseDrugInfo(this));
      }
    );

    return record;
  }

  parseDrugInfo(brandElement: HTMLElement): DrugInfo {
    const drugInfo = new DrugInfo();
    drugInfo.brandName = this.getElementText(this.DRUG_BRAND_NAME, brandElement);
    drugInfo.genericName = this.getElementText(this.DRUG_GENERIC_NAME, brandElement);
    drugInfo.therapeuticClass = this.getElementText(this.DRUG_THERAPEUTIC_CLASS, brandElement);
    drugInfo.manufacturers = this.getElementText(this.MANUFACTURER, brandElement);
    return drugInfo;
  }

  // parseDrugInfo(): DrugInfo {
  //   const drugInfo = new DrugInfo();
  //   drugInfo.cphaDrugId = $(this.htmlData).find('div[id^="cpha_"]').attr('id');
  //   drugInfo.brandName = this.getElementText(this.DRUG_BRAND_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_BRAND_NAME);
  //   drugInfo.genericName = this.getElementText(this.DRUG_BRAND_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_GENERIC_NAME);
  //   drugInfo.therapeuticClass = this.getElementText(this.DRUG_BRAND_INFO_WRAPPER_CLASS + this.SPACER + this.DRUG_THERAPEUTIC_CLASS);
  //   drugInfo.manufacturers = this.getElementText(this.DRUG_BRAND_INFO_WRAPPER_CLASS + this.SPACER + this.MANUFACTURER);
  //   drugInfo.revisionDate = this.getElementText(this.REVISION_DATE);
  //
  //   return drugInfo;
  // }


  parseDrugContent(): Array<DrugInfoContents> {
    const arrayContents: Array<DrugInfoContents> = [];
    const self = this;
    $(this.htmlData).find(this.DRUG_CONTENT_WRAPPER_CLASS).each(
      function() {
        const drugContents = new DrugInfoContents();
        drugContents.text = $(this).find(
          self.DRUG_CONTENT_NAVIGATOR_CLASS).text().trim();

        drugContents.anchorId = $(this).find(
          self.DRUG_CONTENT_NAVIGATOR_CLASS).attr('href');

        // add fragment for navigation
        // $(self.htmlData).find(
        //   drugContents.anchorId).attr('name', drugContents.anchorId.replace('#', ''));

        drugContents.htmlElement = $(self.htmlData).find(
          drugContents.anchorId).prop('outerHTML');

        arrayContents.push(drugContents);
      }
    );

    return arrayContents;
  }

  private getElementText(classString: string, element?) {
    return this.elementFinder(classString, element).text().trim();
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

  private elementFinder(classString: string, element?) {
    if (element) {
      return $(element).find(classString);
    }

    return $(this.htmlData).find(classString);
  }

}
