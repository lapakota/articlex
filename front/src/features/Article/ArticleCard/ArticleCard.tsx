import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleListItem } from 'src/api/contracts';
import { getImageLink } from 'src/helpers/images.helper';
import { ArticleRoute } from 'src/routes';
import { UserAvatarWithName } from 'src/components/User/UserAvatarWithName';
import { renderDate } from 'src/helpers/dates.helper';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
    articleInfo: ArticleListItem;
}

const gridLeftStyle: React.CSSProperties = {
    width: '70%',
    textAlign: 'left',
    boxShadow: 'none',
};

const gridRightStyle: React.CSSProperties = {
    width: '30%',
    textAlign: 'right',
    boxShadow: 'none',
};

export function ArticleCard({ articleInfo }: ArticleCardProps) {
    const navigate = useNavigate();

    const onRedirectToArticlePage = () => {
        navigate(ArticleRoute.getHref(articleInfo.id));
    };

    return (
        <Card
            hoverable
            cover={
                <img
                    src={getImageLink(articleInfo.cover)}
                    style={{ objectFit: 'cover', height: 250 }}
                    alt='article cover'
                />
            }
            onClick={onRedirectToArticlePage}
        >
            <Card.Grid className={styles.title} hoverable={false} style={gridLeftStyle}>
                <div>{articleInfo.title}</div>
            </Card.Grid>
            <Card.Grid className={styles.creator} hoverable={false} style={gridRightStyle}>
                <UserAvatarWithName username={articleInfo.creator} avatar={articleInfo.creatorAvatar} position='left' />
            </Card.Grid>
            <Card.Grid className={styles.description} hoverable={false} style={gridLeftStyle}>
                {articleInfo.description}
            </Card.Grid>
            <Card.Grid className={styles.date} hoverable={false} style={gridRightStyle}>
                {renderDate(articleInfo.createdDate)}
            </Card.Grid>
        </Card>
    );
}
