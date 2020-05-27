import { Component, OnInit , Input, Output, EventEmitter, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms'

import { TitleCustomValidators } from "../../validators/title-validators";
import { TagCustomValidators } from "../../validators/tags-valdators";
import { DescCustomValidators } from "../../validators/desc-validators";

import { TodoInterface } from "../../models/todo/todo-interface";
import { TodoService } from "../../services/todo/todo-service.service";

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit {

  @Input() isModalOpen: boolean
  @Output() onModalClosed = new EventEmitter<boolean>()
  @Output() onTodoAdd = new EventEmitter<TodoInterface>()

  private lastTodoId: number
  user: string
  todoForm: FormGroup
  @ViewChild('todoFormDirective') private todoFormDirective: NgForm;
 // @ViewChild('close', { static: false }) close: ElementRef;
  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.todoForm = this.formGroup()
    
  }

  addTodo(event) {
    this.todoService.lastId().subscribe(id => this.lastTodoId = id)
    const newTodo: TodoInterface = {
      id: this.lastTodoId,
      title: this.title.value,
      desc: this.desc.value,
      tags: this.tags.value.split(','),
      created_date: this.fullDate,
      is_completed: false
    } 

    this.todoForm.reset()
    //console.log(newTodo)
    //return;
    this.onModalClose(!this.isModalOpen)
  
    this.onTodoAdd.emit(newTodo)
  }


  formGroup() {
    return this.fb.group(
      {
        title: ['', [Validators.required,TitleCustomValidators.titleValidate ]],
        desc: ['', [Validators.required, DescCustomValidators.descValidate]],
        tags: ['', [Validators.required,TagCustomValidators.tagValidate]]
      }
    )
  }

  //get form values
  get title() {
    return this.todoForm.get('title')
  }
  get desc() {
    return this.todoForm.get('desc')
  }
  get tags() {
    return this.todoForm.get('tags')
  }

  get fullDate(): string {
    const date = new Date()
    const day = "0" + (date.getDay() + 1)
    const month = date.getMonth().toString().split("").length > 1 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    const year = date.getUTCFullYear()
    const time = date.toLocaleTimeString().split(" ")[0]
    const fullDate = year + "-" + month + "-" + day + " " + time
    return fullDate
  }

  onModalClose(event) {
    this.todoFormDirective.resetForm()
    this.isModalOpen = false
    this.onModalClosed.emit(this.isModalOpen)
  }

  parentWillCall(parent) {
    console.log("i will show in parent "+ parent)
  }
  
















}
