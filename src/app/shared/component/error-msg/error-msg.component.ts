import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() otherLabel: string;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {

    for (const propertyName in this.control.errors) {

      if (this.control.errors.hasOwnProperty(propertyName)
        && this.control.touched) {

        return this.getErrorMessage(this.label, propertyName, this.control.errors[propertyName], this.otherLabel);

      }
    }

    return null;
  }

  getErrorMessage(fieldName: string, validatorName: string, validatorValue?: string, otherField?: string) {

    const config = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue} caracteres.`,
      equalTo: `${fieldName} deve ser igual a ${otherField}`,
      number: `${fieldName} deve ser um número`,
      email: `E-mail inválido.`
    };

    return config[validatorName];

  }

}
