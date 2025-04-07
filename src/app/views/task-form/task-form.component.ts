import { Component, OnInit } from '@angular/core';
import { CommonAppModuleModule } from "../../common-app-module/common-app-module";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WelcomeBarComponent } from "../partials/welcome-bar/welcome-bar.component";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonAppModuleModule, IonicModule, WelcomeBarComponent
  ]
})
export class TaskFormComponent  implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      completed: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {}

}
