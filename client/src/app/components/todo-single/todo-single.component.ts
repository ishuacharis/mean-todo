import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoInterface } from '../../models/todo/todo-interface'
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { UserInterface } from 'src/app/models/user/user-interface';


@Component({
  selector: 'app-todo-single',
  templateUrl: './todo-single.component.html',
  styleUrls: ['./todo-single.component.css']
})
export class TodoSingleComponent implements OnInit {
  
  @Input() todo: TodoInterface
  @Input() username: string
  @Output() onChecked = new EventEmitter<TodoInterface>()
  @Output() onDeleted = new EventEmitter<number>()
  @Output() onTagDeleted = new EventEmitter<any>()

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    
  }

  onCheck(event,todo) {
    todo.isCompleted =  !todo.isCompleted
    this.onChecked.emit(todo)
  }
  onDelete(event,id: number) {
    this.onDeleted.emit(id)
  }

  onDeleteTag(todo,tag) {
    todo.todoTags = todo.todoTags.filter(v => v.toLowerCase() !== tag.toLowerCase())
    this.onTagDeleted.emit(todo)
  }




}
