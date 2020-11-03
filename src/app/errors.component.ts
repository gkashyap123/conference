import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
   <ul *ngIf="shouldShowErrors()" class="validation-errors">
     <li style="color: red">{{getError()}}</li>
   </ul>
 `,
})

export class ShowErrorsComponent {
  private static readonly errorMessages = {
    'required': (params) => 'This Field Is Required',
    'minlength': (params) => 'Should Be Of Minimum ' + params.requiredLength + ' Characters',
    'maxlength': (params) => 'Should Not Be Greater Than ' + params.requiredLength + ' Characters',
    'pattern': (params) => 'Should Be A Valid',
    'age': (params) => params.message,
    'vaildEmail': (params) => params.message,
    'vaildPhone': (params) => params.message,
    'numbersOnly': (params) => params.message,
    'validPhone': (params) => params.message,
    'webMail': (params) => params.message,
    'address1': (params) => params.message,
    'address2': (params) => params.message,
    'city': (params) => params.message,
    'country': (params) => params.message,
    'company': (params) => params.message,
    'validName': (params) => params.message,
    'termCost': (params) => params.message,
    'postalCode': (params) => params.message,
    'refCost': (params) => params.message,
    'gracePeriod': (params) => params.message,
    'vaildDate': (params) => params.message,
    'vaildPhoneFormat': (params) => params.message,
    'vaildfax': (params) => params.message,
    'vaildPoastalCode': (params) => params.message,
    'vaildCity': (params) => params.message,
    'vaildCountry': (params) => params.message,
    'onlyAlphabets': (params) => params.message,
    'vaildNumber': (params) => params.message,
    'companyAlreadyExist': (params) => 'Company No. Already Exist',
    'planAlreadyExist': (params) => 'Plan No. Already Exist',
    'alphaNumeric': (params) => params.message,
    'alphaNumericWithoutSpace': (params) => params.message,
    'onlyNumbers': (params) => params.message,
    'postalcodeNotFound': (params) => 'Postal Code Not Found',
    'countryValidate': (params) => 'Country Not Found',
    'cityValidate': (params) => 'City Not Found',
    'provinceValidate': (params) => 'Province Not Found',
    'brokerIdExist': (params) => 'Broker Id Already Exist.',
    'max': (params) => 'Maximum Value Should Be 99.99',
    'range': (params) => params.message,
    'digitWithDecimal': (params) => params.message,
    'dateNotValid': (params) => 'Please Enter Valid Date.',
    'adjustedPAPEndDateRequired': (params) => 'Adjusted PAP End Date Is Required',
    'Card_ID_Already_Exist': (params) => 'Card Id Already Exists',
    'suspensionDateNotValid': (params) => "Resume Date Can't Be Less Than Suspension Date",
    'placesAfterDecimal': (params) => params.message,
    'creditLimitMultiplier': (params) => params.message,
    'ageCompare': (params) => 'Age 2 Should Be Greater Than Age 1',
    'validBankNo': (params) => params.message,
    'ExpiryDateNotValid': (params) => "Expiry Date Can't Be Less Than Effective Date",
    'EffectiveDateNotValid': (params) => "CardHolder Effective Date Can't Be Less Than  Card Effective Date",
    'PlanEffDateNotValid': (params) => "Plan Effective Date can't be less than Company Effective Date",
    'feeGuideDateNotValid': (params) => "Date can't be less than Plan Effective Date.",
    'rulesDateNotValid': (params) => "Date can't be less than Plan Effective Date.",
    'notEmpty': (params) => params.message,
    'number': (params) => params.message,
    'travelEffectiveRequired': (params) => 'Effective Date Is Required',
    'commissionRateTwoDecimal': (params) => params.message,
    'deductibleAmountWithTwoDecimals': (params) => params.message,
    'TrusteeTerminationDateVsTodayDate': (params) => "Termination Date should be greater than Today Date",
    'TrusteeTerminationDateVsCreatedDate': (params) => "Termination Date should be greater than Created Date",
    'age1RangeNonTravelCompany': (params) => params.message,
    'age2RangeNonTravelCompany': (params) => params.message,
    'age1RangeTravelCompany': (params) => params.message,
    'age2RangeTravelCompany': (params) => params.message,
    'valueLengthBetweenTwoAndFive': (params) => params.message,
    'percValue': (params) => params.message,

    'cardIdNotExist': (params) => "Card Doesn't Exist",
    'LicnseNumNotExist': (params) => "License Number Doesn't Exist",
    'ReceiveDateFutureData': (params) => "Receive Date can not be in future.",
    'cardHolderDob': (params) => "Date of Birth can't greater than today date",
    'ExpiryDateGreaterThanPlan': (params) => "Card Effective Date can't be less than or equal to Plan's Effective Date",
    'cardBankAccountNumNumAlreadyUsed': (params) => "Combination of Branch No., Bank No., and Account No. should be Unique.",
    'brokerEffectiveDateLessNotValid': (params) => "Effective Date Should Be Greater than Broker Effective Date.",
    'disciplineTypeNotMatched': (params) => "Selected Discipline Type Is Not Covered In Cardholders Current Plan",
    'age1NotGreaterThanAge2': (params) => 'Age 1 Should Be Less Than Age 2',
    'bankPreviousEffDateError': (params) => 'Effective Date Should Be Greater Than Previous Effective Date',
    'HSAclaim': (params) => ' HSA Claim Cannot Pay To Provider!',
    'FakelicenseNo': (params) => 'Cannot Pay To Fake Provider!',
    'recieveDateNotGrtr': (params) => 'Receive Date Cannot Be Less Than Service Date',
    'ProratingEffDateNotValid': (params) => "Effective Date can't be less than Plan Effective Date",
    'DeductibleEffDateNotValid': (params) => "Effective Date can't be less than Plan Effective Date",
    'ProratingEffectiveRequired': (params) => 'Effective Date Is Required',
    'DeductibleEffectiveRequired': (params) => 'Effective Date Is Required',
    'isValidAdjustedPapAmount': (params) => 'This Field Should Not Be Greater Than 999999.999',
    'serviceCodeNotExist': (params) => "Service Code Doesn't Exist",
    'diagnosticPrimaryNotExist': (params) => "Diagnostic Primary Doesn't Exist!",
    'toothSurfacesNotExist': (params) => "Tooth Surface Doesn't Exist!",
    'providerUliExist': (params) => "Provider ULI Already Exist!",
    'Claim_Number_Already_Exist': (params) => "Claim Number Already Exist",
    "dentistNotValid": (params) => "Dentist Doesn't Exist!",
    "Claim_Item_Number_Already_Exist": (params) => "Claim Item Number Already Exist",
    "patientHCNotValid": (params) => "Patient HC No. Already Exist",
    'passwordMismatch': (params) => 'New Password And Confirm Password Does Not Match',
    'validPassword': (params) => params.message,
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;
  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
    // (this.control.touched);

  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field], this.control));
  }

  getError(): string {
    var errors = Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field], this.control));
    return errors[0];
  }

  private getMessage(type: string, params: any, control: any) {
    var fname = this.getControlName(control);
    fname = fname.replace("_", " ").replace(" id", "").toLowerCase();
    fname = fname.replace(/\b\w/g, l => l.toUpperCase())
    var msg = ShowErrorsComponent.errorMessages[type](params);
    return msg;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

}