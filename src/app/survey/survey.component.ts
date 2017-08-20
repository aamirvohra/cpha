import { AfterContentChecked, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorage } from '../../utils/local-storage';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  protected surveyForm: FormGroup;

  protected mobileSidebarVisiblity: boolean;

  protected modalRef: BsModalRef;

  @ViewChild('template')
  protected template: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private localStorage: LocalStorage) {
    this.surveyForm = this.formBuilder.group({
      userType: [null, Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(
      () => {
        this.openModal(this.template);
      }, 100
    )
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public submitSurveyForm() {
    this.modalService.hide(1);
    this.localStorage.setSurveyUserType(this.surveyForm.value.userType);
  }

}
