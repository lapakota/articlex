import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getImageLink } from 'src/helpers/images.helper';
import { ArticleRoute } from 'src/routes';

interface ArticleCardProps {
    id: string;
    cover: string;
    title: string;
    description: string;
    creator: string;
}

export function ArticleCard({ id, cover, title, description, creator }: ArticleCardProps) {
    const navigate = useNavigate();

    const onRedirectToArticlePage = () => {
        navigate(ArticleRoute.getHref(id));
    };

    return (
        <Card
            hoverable
            cover={<img src={getImageLink(cover)} style={{ objectFit: 'cover', height: 250 }} alt='article cover' />}
            onClick={onRedirectToArticlePage}
        >
            <Card.Meta
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{title}</div>
                        <div>{creator}</div>
                    </div>
                }
                description={description}
            />
        </Card>
    );
}
