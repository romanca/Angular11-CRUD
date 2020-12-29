import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TodoService } from '../../todo.service';
import { Todo } from '../../Todo';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit  {

  todos:any = [];
  displayedColumns: string[] = ['title', 'description','actions'];
  dataSource = new MatTableDataSource<Todo>([]);
  

  @ViewChild(MatPaginator)  paginator: MatPaginator 

  constructor(private todoService: TodoService) { }                                        
  
  ngOnInit(){
     this.getTodos()        
  }
   
  

  getTodos(): void{
    this.todoService.getTodos().subscribe(res => {
      this.todos =res;
      this.dataSource = new MatTableDataSource<Todo>(this.todos);
       this.dataSource.paginator = this.paginator
     });
  }
 
  delete(_id: string) {
    this.todoService.deleteTodo(_id).subscribe(() => {
      this.getTodos();
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();  
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
