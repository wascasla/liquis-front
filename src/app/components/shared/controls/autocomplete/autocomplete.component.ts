import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Constantes } from 'src/app/util/Constantes';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnChanges {


  @Input() dataSourceInput: any[];
  @Input() nombre: string;

  autocompleteCampo: FormControl = new FormControl();
  search: string;
  filteredOptions: Observable<string[]>;
  options: string[];

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAutoSelect = new EventEmitter();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onAutoKeyPress = new EventEmitter();

  constructor() {
  }

  ngOnChanges() {
    this.options = this.dataSourceInput;
  }

  ngOnInit() {
    this.filteredOptions = this.autocompleteCampo.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.filter(val) : [])
      );
  }

  filter(value: string): string[] {
    console.log('filter');
    console.log(this.options);
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  updateSelectedOption(event) {
    // Usamos el método emit
    this.onAutoSelect.emit({ search: this.search });
  }

  onClickSelect(event: any) {
    // Usamos el método emit
    this.updateSelectedOption(event);
  }

  onBlur(event: any) {
    this.onAutoKeyPress.emit({ search: this.search });
  }

  onKeyPress(event: any) {
    // Usamos el método emit
    console.log('onKeyPress');
    console.log(event);
    if (event.keyCode !== Constantes.KEY_ENTER) {
      this.onAutoKeyPress.emit({ search: this.search });
    } else {
      this.updateSelectedOption(event);
    }
  }
}
