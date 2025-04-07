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
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  imports: [
    CommonAppModuleModule, IonicModule, WelcomeBarComponent
  ]
})
export class CategoryFormComponent  implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      prioridad: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {}

}
