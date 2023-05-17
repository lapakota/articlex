import { Rule } from 'antd/es/form';

export const articleCoverRules: Rule[] = [{ required: true }, { type: 'array' }];

export const articleTitleRules: Rule[] = [{ required: true, max: 100, min: 4 }];

export const articleDescriptionRules: Rule[] = [{ required: true, max: 400, min: 4 }];
