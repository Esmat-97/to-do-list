import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule,NgClass,NgStyle],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  title:string = 'To-Do App';
  toDoList:{name: string, completed: boolean,isEidt:boolean}[] = [];
  newTask:string = '';
  checked:boolean = false;
  editTaskvalue : string='';
gettasks:any=[];
id:any=''

  constructor(private http:HttpClient){}

ngOnInit(){
this.http.get(' http://localhost:3000').subscribe((res:any)=>{
  this.gettasks=res
console.log(this.gettasks)
})
}



insertdata(main:any){
  console.log(main.value)
  this.http.post(' http://localhost:3000',main.value).subscribe((res:any)=>{

  })
}


del(id:any){
  this.http.delete(` http://localhost:3000/documents/${id}`).subscribe((res:any)=>{

  })
}



editdata(main: any) {
  console.log(main.value.newTask);
  const ted={
    newTask:main.value.newTask
  }

  this.http.put(`http://localhost:3000/documents/${main.value._id}`, ted)
    .subscribe((res: any) => {
      console.log('PUT request successful', res);
    }, (error: any) => {
      console.error('Error making PUT request:', error);
    });
}


}
