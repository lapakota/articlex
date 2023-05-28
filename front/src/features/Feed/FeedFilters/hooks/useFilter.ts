import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeedFilter, getFilter, stringifyFilter } from '../helpers/filter.helper';

export function useFilterValue() {
    const { search } = useLocation();

    return useMemo(() => getFilter(search), [search]);
}

export function useFilter() {
    const filter = useFilterValue();

    const navigate = useNavigate();
    const location = useLocation();

    const handleFilterChange = useCallback(
        (newValue: Partial<FeedFilter>) => {
            const search = stringifyFilter({ ...filter, ...newValue });
            navigate({ pathname: location.pathname, search: search }, { replace: true });
        },
        [filter, navigate, location],
    );

    const handleClearFilter = useCallback(() => {
        navigate(location.pathname);
    }, [location.pathname, navigate]);

    const getSkipTakeQuery = useCallback(
        (page: number, entitiesPerPageCount: number) => {
            return {
                take: entitiesPerPageCount,
                skip: entitiesPerPageCount * (page - 1),
            };
        },
        [filter],
    );

    const getIsFilterEmpty = useCallback(() => Object.keys(filter).length === 0, [filter]);

    const getFeedSearchParams = useCallback(
        (postsPerPage: number, currentPage: number) => ({
            ...getSkipTakeQuery(currentPage, postsPerPage),
            filters: {
                onlySubscriptions: filter.onlySubscriptions,
                fromDate: filter.fromDate,
                endDate: filter.endDate,
            },
        }),
        [filter],
    );

    return {
        filter,
        handleFilterChange,
        handleClearFilter,
        getFeedSearchParams,
        getIsFilterEmpty,
    };
}
