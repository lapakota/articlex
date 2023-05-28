import _ from 'lodash';

export interface FeedFilter {
    page?: number;
    onlySubscriptions?: boolean;
    fromDate?: string;
    endDate?: string;
}

export function stringifyFilter(filter: FeedFilter) {
    const search = new URLSearchParams();
    Object.keys(filter).forEach((key) => {
        const filterValue = filter[key as keyof FeedFilter];

        if (filterValue == null) return;
        if (typeof filterValue !== 'object' && filterValue != null) search.append(key, String(filterValue));
        else
            Object.keys(filterValue).forEach((key2) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (filterValue[key2]) search.append(`${key}.${key2}`, String(filterValue[key2]));
            });
    });
    return search.toString();
}

export function getFilter(search: string): FeedFilter {
    const query = new URLSearchParams(search);
    return paramsToObject(query) as FeedFilter;
}

function paramsToObject(entries: URLSearchParams) {
    const result = {};
    for (const [key, value] of entries) _.set(result, key.split('.'), value);

    return result;
}
