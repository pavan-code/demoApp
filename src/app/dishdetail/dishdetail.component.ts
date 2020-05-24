import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Comment } from '../shared/Comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMsg: string;
  commentForm: FormGroup;
  dishCopy: Dish;
  comment: Comment;
  commentErrors = {
    'author' : '',
    'comment': ''
  }
  validationMessages = {
    'author' : {
      'required': 'Author Name is required',
      'minlength': 'Author Name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required'
    }
  }
  Date: string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') public baseURL) { 
      this.createFrom();
    }
    createFrom() {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2)]],
        rating: ['5'],
        comment: ['', [Validators.required]]
      });
      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    }
    onValueChanged(data?: any) {
      if (!this.commentForm) { return; } 
      const form = this.commentForm;
      for (const field in this.commentErrors) {
        if (this.commentErrors.hasOwnProperty(field)) {
          // clear previuos error messages if any
          this.commentErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.commentErrors[field] += messages[key];
              }
            }
          }
        }
      }
    }
    submit() {
      this.comment = this.commentForm.value;
      this.Date = new Date().toString();
      this.comment.date = this.Date;
      this.dishCopy.comments.push(this.comment);
      this.dishservice.pustDish(this.dishCopy)
      .subscribe(dish=> {
        this.dish = dish;
        this.dishCopy = dish;
      },
        errmess => { this.dish = null;
        this.dishCopy = null; this.errMsg = <any>errmess})

      this.commentForm.reset({
        author:'',
        rating: '5',
        comment: ''
      });
    }
  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds);
     let id = this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
     .subscribe(dish => {
       this.dish = dish;
       this.dishCopy = dish;
       this.setPrevNext(dish.id);
      },
      errMsg => this.errMsg = <any>errMsg);
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)% this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)% this.dishIds.length];

  }

  goBack(): void {
    this.location.back();
  }

}
