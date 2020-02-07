import {
  Component, OnInit, Output, OnChanges, EventEmitter, Renderer, ElementRef, Self,
  ChangeDetectorRef, AfterContentChecked, Optional
} from '@angular/core';
import { SearchCuiseComponent } from '../../dialog/search-cuise/search-cuise.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormControl, Validators, NgControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/providers/security/auth-service.service';
import { MyErrorStateMatcher } from 'src/app/util/error-matcher ';
import { ControlValueAccessor } from '@angular/forms';
import { ValueAccessorBase } from '../ValueAccessorBase';

@Component({
  selector: 'app-user-cuise',
  templateUrl: './user-cuise.component.html',
  styleUrls: ['./user-cuise.component.css']
})
export class UserCuiseComponent extends ValueAccessorBase<string> implements OnInit, OnChanges, ControlValueAccessor, AfterContentChecked {

  dsCUISE: any;
  currentUser: any;
  matcher = new MyErrorStateMatcher();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelect = new EventEmitter();

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private authServiceService: AuthServiceService,
              @Self() @Optional()  public ngControl: NgControl, private renderer: Renderer, private elementRef: ElementRef,
              private changeDetector: ChangeDetectorRef) {
    super();
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.currentUser = this.authServiceService.getConcurrentUser();
    console.log(this.currentUser);
  }

  ngAfterContentChecked(): void {
    if (this.currentUser.user.Modo !== '1') {
      this.dsCUISE = this.currentUser.reparticion;
      this.ngControl.control.setValidators([Validators.required]);
    } else {
      this.ngControl.control.setValidators(null);
    }
    this.ngControl.control.updateValueAndValidity();
    this.changeDetector.detectChanges();
  }

  ngOnChanges() {
  }

  onCuiseSelect(event) {
    console.log(event);
    this.value = event.value;
  }

  openCUISEDialog() {
    const dialogRef = this.dialog.open(SearchCuiseComponent, {
      width: '850px',
      data: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.value = result;
      }
    });
    return false;
  }
}
