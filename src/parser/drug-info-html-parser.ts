/**
 * Created by avohra on 6/23/2017.
 */

import * as $ from 'jquery';
import { BasicDrugInfo, Drug, DrugContents, SubCategoryDrug } from '../models/drug-info';
import { AppConstants } from '../utils/app.constants';
import { environment } from '../environments/environment';

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
  // private readonly DRUG_NESTED_NAVIGATOR_CLASS = this.DRUG_CONTENT_NAVIGATOR_CLASS + ' span.MatchedText';
  private readonly DRUG_NESTED_NAVIGATOR_CLASS = this.DRUG_CONTENT_NAVIGATOR_CLASS;
  private readonly DRUG_SUBCATEGORY_IDENTIFIER = 'Information for the Patient:';

  private readonly DRUG_IMAGE_CLASS = '.contentImg';


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

    drug.topLevelDrugContents = this.getTopLevelDrugContents();
    drug.drugInfo = this.getBasicDrugInfo();
    drug.revisionDate = this.getElementText(this.REVISION_DATE);

    this.resetLinks(drug);

    return drug;
  }

  public resetLinks(drug: Drug) {
    const self = this;
    drug.topLevelDrugContents.forEach(
      function(drugContent: DrugContents) {
        self.reset(drugContent.htmlElement);
      }
    )
  }

  public reset(el) {
    // const elements = [];

    $(el).find(this.DRUG_IMAGE_CLASS).each(
      function() {
        let srcURL;

        if ($(this).attr('src').indexOf(AppConstants.ENGLISH_CODE) !== -1) {
          srcURL = $(this).attr('src').substring($(this).attr('src').indexOf(AppConstants.ENGLISH_CODE));
        }
        else if ($(this).attr('src').indexOf(AppConstants.FRENCH_CODE) !== -1) {
          srcURL = $(this).attr('src').substring($(this).attr('src').indexOf(AppConstants.FRENCH_CODE));
        }

        srcURL = environment.API_NAMESPACE + '/' + environment.STATIC_CONTENT_NAMESPACE + '/' + srcURL;

        // $(this).attr('src', srcURL);
        $(this)[0].attributes.src.nodeValue = srcURL;
        // $(this).attr('src', function(index, element) {
        //   console.log($(this));
        //   element.replace($(this).attr('src'), srcURL);
        // })
        // elements.push({ replace: $(this).attr('src'), replaceWith: srcURL });
      }
    );

    // elements.forEach( function(element) {
    //   $(el).replace(element.replace, element.replaceWith);
    //   console.log(el);
    // });
    //
    // console.log(el);
  }

  hasSubCategories(): boolean {
    if ($(this.htmlData).find(this.DRUG_CONTENT_WRAPPER_CLASS
        + ' ' + this.DRUG_NESTED_NAVIGATOR_CLASS).length) {
      return true;
    }

    return false;
  }

  getTopLevelDrugContents(): Array<DrugContents> {
    const drugContents = [];
    const self = this;

    $(this.htmlData).find(this.DRUG_CONTENT_WRAPPER_CLASS).each(
      function(index) {

        if (index !== 0 && $(this).find('a').text().indexOf(self.DRUG_SUBCATEGORY_IDENTIFIER) !== -1) {
          return false;
        }

        const drugContent = new DrugContents();
        drugContent.header = $(this).find('a').text().replace(self.DRUG_SUBCATEGORY_IDENTIFIER, '').trim();
        drugContent.anchorIdReference =  $(this).find('a').attr('href');
        drugContent.htmlElement = $(self.htmlData).find(
          drugContent.anchorIdReference).prop('outerHTML');

        drugContents.push(drugContent);
      }
    );
    return drugContents;
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
          // subCategory.drugInfo = new BasicDrugInfo();
          subCategory.contents = [];

          subCategories.push(subCategory);
        }

        if (subCategory) {
          subContents.header = $(this).find('a').text().replace(self.DRUG_SUBCATEGORY_IDENTIFIER, '').trim();
          subContents.anchorIdReference =  $(this).find('a').attr('href');
          subContents.htmlElement = $(self.htmlData).find(
            subContents.anchorIdReference).prop('outerHTML');

          subCategory.contents.push(subContents);
        }
      }
    );

    return subCategories;
  }

  getBasicDrugInfo(): Array<BasicDrugInfo> {
    const drugInfoRecords: Array<BasicDrugInfo> = [];
    const self = this;
    $(this.htmlData).find(this.DRUG_BRAND_INFO_WRAPPER_CLASS).each(
      function() {
        drugInfoRecords.push(self.parseDrugInfo(this));
      }
    );

    return drugInfoRecords;
  }

  parseDrugInfo(brandElement: HTMLElement): BasicDrugInfo {
    const drugInfo = new BasicDrugInfo();
    drugInfo.brandName = this.getElementText(this.DRUG_BRAND_NAME, brandElement);
    drugInfo.genericName = this.getElementText(this.DRUG_GENERIC_NAME, brandElement);
    drugInfo.therapeuticClass = this.getElementText(this.DRUG_THERAPEUTIC_CLASS, brandElement);
    drugInfo.manufacturers = this.getElementText(this.MANUFACTURER, brandElement);
    return drugInfo;
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
