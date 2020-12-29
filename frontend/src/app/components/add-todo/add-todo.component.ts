import { Component, OnInit,  NgZone } from '@angular/core';
import { Router } from '@angular/router';
 
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TodoService } from '../../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
   
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todoForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
  ) { 
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit() { }
  
  onSubmit(): any {
    this.todoService.addTodo(this.todoForm.value)
    .subscribe(() => {
        this.ngZone.run(() => this.router.navigateByUrl('/todos-list'))
        this.snackBar.open('Task added', 'OK', {
          duration: 1500
        });
      }, (err) => {
        console.log(err);
    });
  }
}
