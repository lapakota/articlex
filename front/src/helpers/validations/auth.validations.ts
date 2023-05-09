import { Rule } from 'antd/es/form';

export const usernameValidationRules: Rule[] = [{ required: true, max: 20, min: 4 }];

export const passwordValidationRules: Rule[] = [
    { required: true, max: 35, min: 6 },
    {
        pattern: new RegExp(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
        message: 'Your password is too weak',
    },
];

export const emailValidationRules: Rule[] = [
    { required: true, min: 4 },
    {
        pattern: new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
        message: 'Please enter valid email',
    },
];

export const genderValidationRules: Rule[] = [{ required: true, message: 'Please select gender' }];

export const fullNameValidationRules: Rule[] = [{ required: true, min: 4, message: 'Please enter your name' }];
