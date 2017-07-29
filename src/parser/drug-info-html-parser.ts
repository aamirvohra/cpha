/**
 * Created by avohra on 6/23/2017.
 */

import * as $ from 'jquery';
import { BasicDrugInfo, Drug, DrugContents, SubCategoryDrug } from '../models/drug-info';

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
  private readonly DRUG_NESTED_NAVIGATOR_CLASS = this.DRUG_CONTENT_NAVIGATOR_CLASS + ' span.MatchedText';
  private readonly DRUG_SUBCATEGORY_IDENTIFIER = 'Information for the Patient:';


  private htmlData: any;

  constructor(data: string) {
    const parser = new DOMParser();
    this.htmlData = parser.parseFromString(data, 'text/html');
  }

  parse() {
    const drug = new Drug();
    drug.cphaDrugId = $(this.htmlData).find('div[id^="cpha_"]').attr('id');

    if (this.hasSubCategories()) {
      drug.subCategoryDrug = this.collectSubCategoryInfo();
    }
    else {
      drug.drugInfo = this.getBasicDrugInfo();
    }
  }

  hasSubCategories(): boolean {
    if ($(this.htmlData).find(this.DRUG_CONTENT_WRAPPER_CLASS
        + ' ' + this.DRUG_NESTED_NAVIGATOR_CLASS).length){
      return true;
    }

    return false;
  }

  collectSubCategoryInfo(): Array<SubCategoryDrug> {
    const subCategories: Array<SubCategoryDrug> = [];
    let subCategory: SubCategoryDrug;
    const self = this;

    $(this.htmlData).find(this.DRUG_CONTENT_WRAPPER_CLASS).each(
      function(index) {
        const subContents = new DrugContents();
        // the first index information for patients in subcategory is meant to
        // be for top-level drug info
        if (index !== 0 && $(this).find('a').text().indexOf(self.DRUG_SUBCATEGORY_IDENTIFIER) !== -1) {
          subCategory = new SubCategoryDrug();
          subCategory.drugInfo = new BasicDrugInfo();
          subCategory.contents = [];

          subCategories.push(subCategory);
        }

        if (subCategory) {
          subContents.header = $(this).find('a').text().replace(self.DRUG_SUBCATEGORY_IDENTIFIER, '').trim();
          subContents.anchorIdReference =  $(this).find('a').attr('href');
          subContents.htmlElement = $(self.htmlData).find(
            subContents.anchorIdReference).attr('name', subContents.anchorIdReference.replace('#', ''));

          subCategory.contents.push(subContents);
        }
      }
    );

    return subCategories;
  }

  getBasicDrugInfo(): BasicDrugInfo {
    const drugInfo = new BasicDrugInfo();
    return drugInfo;
  }

  // parse() {
  //   const drug = new Drug();
  //   drug.cphaDrugId = $(this.htmlData).find('div[id^="cpha_"]').attr('id');

    // const basicDrugInfo = this.parseDrugInfo();
    // const drugsRecord = new DrugRecords();
    // drugsRecord.cphaDrugId = $(this.htmlData).find('div[id^="cpha_"]').attr('id');
    // drugsRecord.revisionDate = this.getElementText(this.REVISION_DATE);
    // drugsRecord.records = this.parseDrugRecords();
    // drugsRecord.contents = this.parseDrugContent();

    // return drugsRecord;
    // console.log(drugsRecord);
    // const drugInfo = this.parseDrugInfo();
    // drugInfo.contents = this.parseDrugContent();
    // return drugInfo;
  // }

  // parseDrugRecords(): Array<DrugInfo> {
  //   const record: Array<DrugInfo> = [];
  //   const self = this;
  //   // loop through all brands and collect the basic info
  //   $(this.htmlData).find(this.DRUG_BRAND_INFO_WRAPPER_CLASS).each(
  //     function() {
  //       record.push(self.parseDrugInfo(this));
  //     }
  //   );
  //
  //   return record;
  // }

  // parseDrugInfo(brandElement: HTMLElement): DrugInfo {
  //   const drugInfo = new DrugInfo();
  //   drugInfo.brandName = this.getElementText(this.DRUG_BRAND_NAME, brandElement);
  //   drugInfo.genericName = this.getElementText(this.DRUG_GENERIC_NAME, brandElement);
  //   drugInfo.therapeuticClass = this.getElementText(this.DRUG_THERAPEUTIC_CLASS, brandElement);
  //   drugInfo.manufacturers = this.getElementText(this.MANUFACTURER, brandElement);
  //   return drugInfo;
  // }

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


  // parseDrugContent(): Array<DrugInfoContents> {
  //   const arrayContents: Array<DrugInfoContents> = [];
  //   const self = this;
  //   $(this.htmlData).find(this.DRUG_CONTENT_WRAPPER_CLASS).each(
  //     function() {
  //       const drugContents = new DrugInfoContents();
  //
  //       drugContents.text = $(this).find(
  //         self.DRUG_CONTENT_NAVIGATOR_CLASS).text().trim();
  //
  //       drugContents.anchorId = $(this).find(
  //         self.DRUG_CONTENT_NAVIGATOR_CLASS).attr('href');
  //
  //       // add fragment for navigation
  //       // $(self.htmlData).find(
  //       //   drugContents.anchorId).attr('name', drugContents.anchorId.replace('#', ''));
  //
  //       drugContents.htmlElement = $(self.htmlData).find(
  //         drugContents.anchorId).prop('outerHTML');
  //
  //       arrayContents.push(drugContents);
  //     }
  //   );
  //
  //   return arrayContents;
  // }

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
