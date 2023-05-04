import { Rule } from 'antd/es/form';

export const usernameValidationRules: Rule[] = [{ required: true, max: 20, min: 4 }];

export const passwordValidationRules: Rule[] = [
    { required: true, max: 20, min: 6 },
    {
        pattern: new RegExp(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
        message: 'Password too weak',
    },
];
