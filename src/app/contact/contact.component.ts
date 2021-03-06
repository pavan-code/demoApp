import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { feedback, contactType } from '../shared/feedback';
import { flyInOut,expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: feedback;
  contactType = contactType;

  @ViewChild('fform') feedbackFormDirective;
   
  formErrors = {
    'firstname' : '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }

  validationMessages = {
    'firstname' :{
      'required': 'First name is required.',
      'minlength': 'First name must be atleast 2 characters long.',
      'maxlength': 'First name cannot be more than 20 characters.'
    }, 
    'lastname' : {
      'required': 'Last name is required.',
      'minlength': 'Last name must be atleast 2 characters long.',
      'maxlength': 'Last name cannot be more than 20 characters.'
    },
    'telnum': {
      'required': 'Telephone number is required',
      'pattern': 'Telephone number must contain only numbers'
    },
    'email': {
      'required': 'Email id is required',
      'email': 'Invalid email id'
    }
  }
  feedbackCopy: feedback;
  errMsg: any;
  display: boolean = false;

  constructor(private fb: FormBuilder,
    private FeedbackService: FeedbackService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }   
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.display = true;
    this.feedback = this.feedbackForm.value;
    // console.log(this.feedback);
    this.FeedbackService.submitFeedback(this.feedback)
    .subscribe(feedback => {
      this.feedback = feedback;
      this.feedbackCopy = feedback;
    },
    errmess => {
      this.feedback = null;
      this.feedbackCopy = null;
      this.errMsg = <any>errmess;
    });
    setTimeout(() => {
      this.feedbackCopy = null;
      this.display = false;
    }, 5000);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email:'',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    // this.feedbackFormDirective.resetForm();
    }

}
