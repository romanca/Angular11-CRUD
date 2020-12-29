import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { TodoService } from '../../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.todoService.getTodo(this.getId).subscribe(res => {
      this.updateForm.setValue({
        title: res['title'],
        description: res['description']
      });
    });

    this.updateForm = this.formBuilder.group({
      title: [''],
      description: ['']
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this.todoService.updateTodo(this.getId, this.updateForm.value)
    .subscribe(() => {
        this.ngZone.run(() => this.router.navigateByUrl('/todos-list'))
        this.snackBar.open('Task updated', 'OK', {
          duration: 1500
        });
      }, (err) => {
        console.log(err);
    });
  }

}
