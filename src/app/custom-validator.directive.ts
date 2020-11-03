import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {

    //Validation of phone Format to be used by all
    static vaildPhoneFormat(c: FormControl): ValidationErrors {
        ;
        const phone = c.value;
        var reg = /^(?:\(\d{3}\)-|\d{3}-)\d{3}-\d{4}$/
        var isValid = true;
        const message = {
            'vaildPhone': {
                'message': 'Phone Must Be A Valid Number'
            }
        };
        if (reg.test(phone)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    static vaildFaxFormat(c: FormControl): ValidationErrors {
        const phone = c.value;
        var reg = /^(?:\(\d{3}\)-|\d{3}-)\d{3}-\d{4}$/
        var isValid = true;
        const message = {
            'vaildPhone': {
                'message': 'Fax Must Be A Valid Number'
            }
        };
        if (reg.test(phone)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static vaildEmail(c: FormControl): ValidationErrors {
        const email = c.value;
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        var isValid = true;
        const message = {
            'vaildEmail': {
                'message': 'Please Enter Valid Email'
            }
        };
        if (reg.test(email)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    static age(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= 18 && num <= 85;
        const message = {
            'age': {
                'message': 'The Age Must Be A Valid Number Between 18 And 85' // Will changes the error defined in errors helper.
            }
        };
        return isValid ? null : message;
    }

    static vaildDate(c: FormControl): ValidationErrors {
        const date = c.value;
        var reg = /^[0-9/]*$/
        var isValid = true;
        const message = {
            'vaildDate': {
                'message': 'Should Be A Valid Date.'
            }
        };
        if (reg.test(date)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static vaildNumber(c: FormControl): ValidationErrors {
        const number = c.value;
        var reg = /^[0-9]*$/
        var isValid = true;
        const message = {
            'vaildNumber': {
                'message': 'Should Be In Numeric Form.'
            }
        };
        if (reg.test(number)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static dateMask(dateMask) {
        dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
        return dateMask;
    }

    static validPhone(c: FormControl): ValidationErrors {     // It used for phone field of add/edit company form
        const phone = c.value;
        var reg = /^\d{10}$/
        var isValid = true;
        const message = {
            'validPhone': {
                'message': 'Phone Must Be A Valid Number Of 10 Digits'  //It will through the error if digits are not equal to 10
            }
        };
        if (reg.test(phone)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static webMail(c: FormControl): ValidationErrors {  //It used for websiteAddress field of add/edit company form
        const websiteAddress = c.value;
        //var reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        //var reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
        var reg = /^(|https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)$/
        var isValid = true;
        const message = {
            'webMail': {
                'message': 'Should Be Valid Website Address.' //it will through the error if websiteAddress not correct
            }
        };
        if (reg.test(websiteAddress)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    static Alphanumric(c: FormControl): ValidationErrors {   //It used for address1 field of add/edit company form
        const address1 = c.value;
        var reg = /^[a-zA-Z0-9]+$/                   // alphanumerical
        // const isValid = !isNaN(num) ;
        var isValid = true
        const message = {
            'address1': {
                'message': 'Please Add Valid Value' // This message will through if address1 not valid
            }
        };
        if (reg.test(address1)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }


    static Alphabetic(c: FormControl): ValidationErrors {  // It used for address2 field of add/edit company form
        const address2 = c.value;
        var reg = /^[a-zA-Z]+$/
        var isValid = true
        const message = {
            'address2': {
                'message': 'Please Add Valid Alphabets' // This will show if address pattern not matched
            }
        };
        if (reg.test(address2)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    static address1(c: FormControl): ValidationErrors {   //It used for address1 field of add/edit company form
        const address1 = c.value;
        var reg = /^[a-zA-Z0-9]+$/                   // alphanumerical
        // const isValid = !isNaN(num) ;
        var isValid = true
        const message = {
            'address1': {
                'message': 'Please Enter Valid Address 1' // This message will through if address1 not valid
            }
        };
        if (reg.test(address1)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }


    static address2(c: FormControl): ValidationErrors {  // It used for address2 field of add/edit company form
        const address2 = c.value;
        var reg = /^[a-zA-Z0-9]+$/
        var isValid = true
        const message = {
            'address2': {
                'message': 'Please Enter Valid Address 2' // This will show if address pattern not matched
            }
        };
        if (reg.test(address2)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static city(c: FormControl): ValidationErrors {  //It used for city field of add/edit company form
        const city = c.value;
        var reg = /^[a-zA-Z]+$/
        var isValid = true
        const message = {
            'city': {
                'message': 'Please Enter Valid City Name' //Show the error message when city pattern not true
            }
        };
        if (reg.test(city)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }


    static country(c: FormControl): ValidationErrors {  // It used for country field of add/edit company form
        const country = c.value;
        var reg = /^[a-zA-Z]+$/
        var isValid = true
        const message = {
            'country': {
                'message': 'Please Enter Valid Country Name' // will Show the error message if pattren not match
            }
        };
        if (reg.test(country)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static company(c: FormControl): ValidationErrors { //It used for company field of add/edit comapny form
        const company = c.value;
        var reg = /^[a-zA-Z]+$/
        var isValid = true
        const message = {
            'company': {
                'message': 'Please Enter Valid Company Name' //This will show the message if pattern no match
            }
        };
        if (reg.test(company)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static validName(c: FormControl): ValidationErrors {  // It used for the name field of add/edit company form
        const name = c.value;
        var reg = /^[a-zA-Z]+$/
        var isValid = true
        const message = {
            'validName': {
                'message': 'Name Should Be Alphabets' //It will dispaly the message if name pattern not match
            }
        };
        if (reg.test(name)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static termCost(c: FormControl): ValidationErrors {  // It used for the termCost field of add/edit company form
        const cost = c.value;
        var reg = /^[0-9]+$/
        var isValid = true
        const message = {
            'termCost': {
                'message': 'Term Cost Should Be Numerical' //It will dispaly the message if pattern not match
            }
        };
        if (reg.test(cost)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static postalCode(c: FormControl): ValidationErrors {  //It used for the postalCode field of add/edit company form
        const code = c.value;
        var reg = /^[0-9]+$/
        var isValid = true
        const message = {
            'postalCode': {
                'message': 'Postal Code Should Be Numerical' //This will show the message if pattern not match
            }
        };
        if (reg.test(code)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static refCost(c: FormControl): ValidationErrors {  //It used for refCost field of add/edit company form
        const cost = c.value;
        var reg = /^[0-9]+$/
        var isValid = true
        const message = {
            'refCost': {
                'message': 'Ref Cost Should Be Numerical' // This message will display if pattern not true
            }
        };
        if (reg.test(cost)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static gracePeriod(c: FormControl): ValidationErrors { /// It used for gracePeriod of add/edit company form
        const period = c.value;
        var reg = /^[0-9]+$/
        var isValid = true
        const message = {
            'gracePeriod': {
                'message': 'Grace Period Should Be In Numerical Form' //This message will display if pattern not match
            }
        };
        if (reg.test(period)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static vaildPhone(c: FormControl): ValidationErrors {
        const phone = c.value;
        var reg = /^\d{10}$/
        var isValid = true;
        const message = {
            'vaildPhone': {
                'message': 'Phone Must Be A Valid Number Of 10 Digits'
            }
        };
        if (reg.test(phone)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    //Validation od cca_line Field
    static vaildLine(c: FormControl): ValidationErrors {
        const line = c.value;
        var reg = /^[a-zA-Z0-9]{2,20}$/
        var isValid = true;
        const message = {
            'vaildLine': {
                'message': 'Should Be Only 20 Characters Exist'
            }
        };
        if (reg.test(line)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    //Validation of cca_line2 Field
    static vaildLine2(c: FormControl): ValidationErrors {
        const line2 = c.value;
        var reg = /^[a-zA-Z0-9]{2,20}$/
        var isValid = true;
        const message = {
            'vaildLine2': {
                'message': 'Should Be Only 20 Characters Exist.'
            }
        };
        if (reg.test(line2)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    //Validation of cca_fax Field
    static vaildfax(c: FormControl): ValidationErrors {
        const fax = c.value;
        var reg = /^[0-9-+() ]{10}$/
        var isValid = true;
        const message = {
            'vaildfax': {
                'message': 'Fax Must Be A Valid Number Of 10 Digits'
            }
        };
        if (reg.test(fax)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    //Validation of cca_country Field
    static vaildCountry(c: FormControl): ValidationErrors {
        const country = c.value;
        var reg = /^[a-z]+$/
        var isValid = true;
        const message = {
            'vaildCountry': {
                'message': 'Country Should Be In Characters.'
            }
        };
        if (reg.test(country)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }


    //Validation of cca_city Field
    static vaildCity(c: FormControl): ValidationErrors {
        const city = c.value;
        var reg = /^[a-zA-Z]*$/
        var isValid = true;
        const message = {
            'vaildCity': {
                'message': 'City Should Be In Characters.'
            }
        };
        if (reg.test(city)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    //Validation of cca_postalcode Field
    static vaildPoastalCode(c: FormControl): ValidationErrors {
        const PostalCode = c.value;
        var reg = /^\d{6}$/
        var isValid = true;
        const message = {
            'vaildPoastalCode': {
                'message': 'Postal Code Should Be Numeric Only.'
            }
        };
        if (reg.test(PostalCode)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    //Import Mask Module library first
    //Use this validation in CCa_email Field
    static phoneMask(phoneMask) {

        phoneMask = ['(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

        return phoneMask;

    }

    //Import Mask Module library first
    //Use this validation in CCa_email Field
    static sinMask(sinMask) {

        sinMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

        return sinMask;

    }

    /**
    * @description : Validator "numbersOnly" allow user to enter only numbers in form field
    */
    static numbersOnly(c: FormControl): ValidationErrors {
        const inputFieldValue = c.value;
        var reg = /[0-9]|\./
        var isValid = true;
        const message = {
            'numbersOnly': {
                'message': 'Please Enter Numbers Only'
            }
        };
        if (reg.test(inputFieldValue)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static onlyAlphabets(c: FormControl): ValidationErrors {
        const phone = c.value;
        var reg = /^[a-zA-Z\s]+$/
        var isValid = true;
        const message = {
            'onlyAlphabets': {
                'message': 'Should Be Alphabets Only'
            }
        };
        if (reg.test(phone)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    // Alphanumeric Validation By Balwinder
    static alphaNumeric(c: FormControl): ValidationErrors {  // It used for Company name as well as address field of add/edit company form
        const add = c.value;
        var reg = /^[a-zA-Z0-9 ]*$/
        var isValid = true
        const message = {
            'alphaNumeric': {
                'message': 'Please Enter Valid AlphaNumeric' // This will show if address pattern not matched
            }
        };
        if (reg.test(add)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
    // Alphanumeric Validation By Balwinder
    static alphaNumericWithoutSpace(c: FormControl): ValidationErrors {  // It used for Company name as well as address field of add/edit company form
        const add = c.value;
        var reg = /^[a-zA-Z0-9]*$/
        var isValid = true
        const message = {
            'alphaNumericWithoutSpace': {
                'message': 'Please Enter Valid AlphaNumeric' // This will show if address pattern not matched
            }
        };
        if (reg.test(add)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    ///OnlyNumbers for all numeric values By Balwinder
    static onlyNumbers(c: FormControl): ValidationErrors { /// It used for all numeric fields of add/edit company form
        const num = c.value;
        var reg = /^[0-9]+$/
        var isValid = true
        const message = {
            'onlyNumbers': {
                'message': 'Please Enter Only Number' //This message will display if pattern not match
            }
        };
        if (reg.test(num)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static range(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= 0 && num <= 365;
        const message = {
            'range': {
                'message': 'Grace Period Must Be Between 0 And 365 Days' // Will changes the error defined in errors helper.
            }
        };
        return isValid ? null : message;
    }

    // Decimal validation on Admin Rate by Balwinder
    static digitWithDecimal(c: FormControl): ValidationErrors { // This method used for Admin Rate field in Add Financial Data
        const num = c.value;
        var reg = /^[0-9]\d{0,1}(\.\d{0,2})?%?$/
        var isValid = true
        const message = {
            'digitWithDecimal': {
                'message': 'Admin Rate Should Not Be Greater Than 99.99' //This message will display if pattern not match
            }
        };
        if (reg.test(num) && num <= 99.99) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    // Decimal validation on Admin Rate by Balwinder
    static digitWithDecimalCommRate(c: FormControl): ValidationErrors { // This method used for Admin Rate field in Add Financial Data
        const num = c.value;
        var reg = /^[0-9]\d{0,1}(\.\d{0,3})?%?$/
        var isValid = true
        const message = {
            'digitWithDecimal': {
                'message': 'Commission Rate Should Not Be Greater Than 99.999' //This message will display if pattern not match
            }
        };
        if (reg.test(num) && num <= 99.999) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    // Decimal and max value validation on Commision Rate by Pawanjeet
    static onlyDigitWithDecimal(c: FormControl): ValidationErrors { // This method used for Admin Rate field in Add Financial Data
        const num = c.value;
        var reg = /^[0-9]\d{1}(\.\d)?%?$/
        var isValid = true
        const message = {
            'digitWithDecimal': {
                'message': 'Commission Rate Should Not Be Greater Than 99.999' //This message will display if pattern not match
            }
        };
        if (reg.test(num) || num <= 99.999) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    // Only Three Digits after decimal validation on Commision Rate by Pawanjeet
    static onlyThreeDigisAfterDecimal(c: FormControl): ValidationErrors { // This method used for Admin Rate field in Add Financial Data
        const num = c.value;
        var reg = /^\d+(\.\d{0,3})?$/
        var isValid = true
        const message = {
            'digitWithDecimal': {
                'message': 'Please Enter Only Three Digits After Decimal' //This message will display if pattern not match
            }
        };
        if (reg.test(num)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    /* Decimal Validation on Standard & Adjusted Pap Amount
     * which allows 3 places after decimal By Balwinder
     * This method used for Standard Pap Amount field in Add Financial Data
     */

    static placesAfterDecimal(c: FormControl): ValidationErrors {

        const num = c.value;
        var reg = /^[0-9]\d{0,5}(\.\d{0,3})?%?$/
        var isValid = true
        const message = {
            'placesAfterDecimal': {
                'message': ' This Field Should Not Be Greater Than 999999.999'
            }
        };
        if (reg.test(num) && num <= 999999.999) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    /* Author : Pawanjeet Kaur
     * Description : Decimal Validation on Single Deductible Amount
     * That Allows 2 Digits After Decimal.
     * Use : This method is used To Validate Single Deductible Amount field in Add Plan > Plan Info Tab
     */

    static deductibleAmountWithTwoDecimals(c: FormControl): ValidationErrors {

        const num = c.value;
        var reg = /^\d{0,6}(\.\d{0,2})?%?$/
        var isValid = true
        const message = {
            'placesAfterDecimal': {
                'message': 'Should Be Less Than 999999.99 With Only Two Digits After Decimal'
            }
        };

        if (num != undefined && num != null && num != "") {
            if (reg.test(num) && num <= 999999.99) {
                isValid = true;
            }
            else {
                isValid = false;
            }
        }
        else {
            isValid = true;
            // console.log("Number Undefined")
        }
        return isValid ? null : message;
    }

    //CreditLimitMultiplier validation on Credit Limit Multiplier By Balwinder
    static creditLimitMultiplier(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= -5 && num <= 5;
        const message = {
            'creditLimitMultiplier': {
                'message': 'Credit Limit Multiplier Must Be Between -5 And 5' // Will changes the error defined in errors helper.
            }
        };
        return isValid ? null : message;
    }

    //ValidBankNo validation on Add Bank Account  By Balwinder
    static validBankNo(c: FormControl): ValidationErrors {
        const num = c.value;
        var reg = /^[A-Za-z0-9][0-9A-Za-z]*$/
        var isValid = true
        const message = {
            'validBankNo': {
                'message': ' Please Enter Valid Number'
            }
        };
        if (reg.test(num) && num != 0) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    //ValidBankNo validation on Add Bank Account  By Balwinder
    static notEmpty(c: FormControl): ValidationErrors {

        const num = c.value;
        var regexp = /^\S*$/;
        var isValid = true
        const message = {
            'notEmpty': {
                'message': ' Blank space not allowed'
            }
        };
        if (/^\s/.test(num)) {
            isValid = false;
        } else {
            isValid = true;
        }
        return isValid ? null : message;
    }

    ///number for all numeric values By Balwinder
    static number(c: FormControl): ValidationErrors { /// It used for all numeric fields of add/edit company form
        const num = c.value;
        var reg = /^[0-9]\d{0,9}(\.\d{0,9})?%?$/
        //var reg=/^[0-9]+$/
        var isValid = true
        const message = {
            'number': {
                'message': 'Please Enter Only Number' //This message will display if pattern not match
            }
        };
        if (reg.test(num)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    /* AlphaNumeric with Special Character validation on all Address lines
     It used for address field of add/edit company form By Balwinder*/

    static alphaNumericWithSpecialChar(c: FormControl): ValidationErrors {
        const flag = c.value;
        var reg = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/
        var isValid = true
        const message = {
            'alphaNumericWithSpecialChar': {
                'message': 'Please Enter Valid Address' // This will show if address pattern not matched
            }
        };
        if (reg.test(flag)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    // Decimal validation on Commission Rate in Link Broker by Balwinder
    static commissionRateTwoDecimal(c: FormControl): ValidationErrors { // This method used for Commission Rate field in Add Link Broker
        const num = c.value;
        var reg = /^[0-9]\d{0,1}(\.\d{0,2})?%?$/
        var isValid = true
        const message = {
            'commissionRateTwoDecimal': {
                'message': 'Commission Rate should be less than 99.99' //This message will display if pattern not match
            }
        };
        if (reg.test(num) && num <= 99.99) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static age1RangeNonTravelCompany(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= 14 && num <= 27;
        const message = {
            'range': {
                'message': 'Min Value will be 14 and Max value will be 27'
            }
        };
        return isValid ? null : message;
    }

    static age1RangeTravelCompany(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= 15 && num <= 28;
        const message = {
            'range': {
                'message': 'Min Value will be 15 and Max value will be 28'
            }
        };
        return isValid ? null : message;
    }

    static age2RangeNonTravelCompany(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= 17 && num <= 34;
        const message = {
            'range': {
                'message': 'Min Value will be 17 and Max value will be 34'
            }
        };
        return isValid ? null : message;
    }

    static age2RangeTravelCompany(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num) && num >= 18 && num <= 35;
        const message = {
            'range': {
                'message': 'Min Value will be 18 and Max value will be 35'
            }
        };
        return isValid ? null : message;
    }

    //Validation of cca_postalcode Field
    static CarryForwardYears(c: FormControl): ValidationErrors {
        const yearValue = c.value;
        var reg = /^\d{1}$/
        var isValid = true;
        const message = {
            'vaildCarryForwardYear': {
                'message': 'Please Enter year only (1 or 2).'
            }
        };

        if (reg.test(yearValue) && (yearValue == 0 || yearValue == 1 || yearValue == 2)) {
            isValid = true;
        }
        else {
            isValid = false;
        }

        if (yearValue == "" || yearValue == undefined) {
            isValid = true;
        }

        return isValid ? null : message;
    }

    static ConvertAmountToDecimal(value) {
        if (value != '' && value != undefined) {
            value = value.toString(); //If it's not already a String
            if (value.indexOf(".") > -1) {
                value = value.slice(0, (value.indexOf(".")) + 3); //With 3 exposing the hundredths place
            }
            return parseFloat(value).toFixed(2);
        }
        else {
            return parseFloat('0').toFixed(2);
        }
    }

    /**
     * @Author : Parveen
     * @description : This function is used to check only two decimal places after number
     */
    static onlyTwoDigisAfterDecimal(c: FormControl): ValidationErrors {
        const num = c.value;
        var reg = /^\d+(\.\d{0,2})?$/
        var isValid = true
        const message = {
            'onlyTwoDigisAfterDecimal': {
                'message': 'Please Enter Only Two Digits After Decimal' //This message will display if pattern not match
            }
        };
        if (reg.test(num)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    /**
     * @Author : Parveen
     * @description : This function is used to check only two decimal places after number
     */
    static numberWithDot(c: FormControl): ValidationErrors {
        const num = c.value;
        var reg = /^[0-9]\d{0,50}(\.\d{0,9})?%?$/
        var isValid = true
        const message = {
            'numberWithDot': {
                'message': ' Please Enter Only Number.'
            }
        };
        if (reg.test(num)) {
            var decPart = (num + "").split(".");

            if (decPart[0].length > 8) {
                message.numberWithDot.message = "Maximum 8 Numbers Allowed without Decimal.";
                isValid = false;
            } else {

                if (decPart.length == 2 && decPart[1].length > 2) {
                    message.numberWithDot.message = "Please Enter Only Two Digits After Decimal.";
                    isValid = false;
                } else {
                    isValid = true;
                }
            }
        } else {
            isValid = false;
        }
        return isValid ? null : message;
    }


    static percValue(c: FormControl): ValidationErrors {
        const num = Number(c.value);
        const isValid = !isNaN(num)  && num <=100;
        const message = {
            'percValue': {
                'message': 'Must be a number and should not be more than 100' //This message will display if pattern not match
            }
        };

        return isValid ? null : message;
    }

    static valueLengthBetweenTwoAndFive(c: FormControl): ValidationErrors {
        const num = c.value;
        var reg = /^[0-9]{2,5}$/
        var isValid = true
        const message = {
            'valueLengthBetweenTwoAndFive': {
                'message': 'The length Must Be Between 2 to 5' //This message will display if pattern not match
            }
        };
        if (reg.test(num)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }

    static validPassword(c: FormControl): ValidationErrors {
        const password = c.value;
        var reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{9,16}$/
        var isValid = true;
        const message = {
            'validPassword': {
                'message': 'Password must be including uppercase, lowercase letters, numbers and must be greater than 9 & less than 16'
            }
        };
        if (reg.test(password)) {
            isValid = true;
        }
        else {
            isValid = false;
        }
        return isValid ? null : message;
    }
}
