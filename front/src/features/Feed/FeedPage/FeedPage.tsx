import { PageContent } from 'src/components/PageContent';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { ArticleCard } from 'src/features/Article';
import { Space, Spin, Tabs } from 'antd';
import { useFilter } from '../FeedFilters/hooks/useFilter';
import { useEffect } from 'react';
import styles from './FeedPage.module.scss';

enum FeedTabs {
    Feed = 'feed',
    Subscriptions = 'subscriptions',
}

const POSTS_PER_PAGE = 10;

export function FeedPage() {
    const { filter, getFeedSearchParams, handleFilterChange } = useFilter();

    const {
        isLoading,
        isFetching,
        data: feed,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: reactQueryHelper.getFeedKey(filter),
        queryFn: ({ pageParam = 1 }) =>
            api.article.getArticlesFeed(getFeedSearchParams(POSTS_PER_PAGE, pageParam)).then((x) => x.data),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.content.length !== 0 ? nextPage : undefined;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        let fetching = false;
        const handleScroll = async (e: any) => {
            const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
                fetching = true;
                if (hasNextPage) await fetchNextPage();
                fetching = false;
            }
        };
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, hasNextPage]);

    const handleTabChange = (activeKey: string) => {
        const feedKey = activeKey as FeedTabs;

        switch (feedKey) {
            case FeedTabs.Feed:
                handleFilterChange({ onlySubscriptions: undefined });
                break;
            case FeedTabs.Subscriptions:
                handleFilterChange({ onlySubscriptions: true });
                break;
        }
    };

    const isEmptyFeed = !isFetching && (!feed || feed?.pages.length === 0 || feed.pages[0].content.length === 0);

    const pageContent = (
        <PageContent.Body className={styles.content} active={isLoading}>
            <Spin size='large' spinning={isFetching}>
                {isEmptyFeed && <span>No articles was found by your request</span>}

                {feed?.pages.map((p, pageNumber) => (
                    <Space
                        key={pageNumber}
                        direction='vertical'
                        size='middle'
                        style={{ width: '100%', padding: '8px 16px' }}
                    >
                        {p.content.map((article) => (
                            <ArticleCard key={article.id} articleInfo={article} />
                        ))}
                    </Space>
                ))}
            </Spin>
        </PageContent.Body>
    );

    const tabItems = [
        {
            label: 'Feed',
            key: FeedTabs.Feed,
            children: pageContent,
        },
        {
            label: 'Subscriptions',
            key: FeedTabs.Subscriptions,
            children: pageContent,
        },
    ];

    return (
        <PageContent>
            <Tabs
                defaultActiveKey={filter.onlySubscriptions ? FeedTabs.Subscriptions : FeedTabs.Feed}
                items={tabItems}
                onChange={handleTabChange}
            />
        </PageContent>
    );
}
