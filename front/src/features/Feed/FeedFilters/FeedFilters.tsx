import { Button, DatePicker } from 'antd';
import { ArticleEditorRoute } from 'src/routes';
import { useNavigate } from 'react-router-dom';
import styles from './FeedFilters.module.scss';
import { useFilter } from './hooks/useFilter';
import dayjs, { Dayjs } from 'dayjs';

export function FeedFilters() {
    const { filter, handleFilterChange } = useFilter();
    const navigate = useNavigate();

    const onRedirectToArticleEditor = () => {
        navigate(ArticleEditorRoute.getHref());
    };

    const onRangeChange = (dates: null | (Dayjs | null)[]) => {
        if (dates && dates[0] && dates[1]) {
            handleFilterChange({
                fromDate: dates[0].startOf('day').toISOString(),
                endDate: dates[1].endOf('day').toISOString(),
            });
        } else {
            handleFilterChange({ fromDate: undefined, endDate: undefined });
        }
    };

    const fromDate = filter.fromDate ? dayjs(filter.fromDate, 'YYYY-MM-DD') : null;
    const endDate = filter.endDate ? dayjs(filter.endDate, 'YYYY-MM-DD') : null;

    return (
        <div className={styles.feedFilters}>
            <DatePicker.RangePicker value={[fromDate, endDate]} onChange={onRangeChange} />

            <Button type='default' onClick={onRedirectToArticleEditor} size='middle'>
                Write new article
            </Button>
        </div>
    );
}
