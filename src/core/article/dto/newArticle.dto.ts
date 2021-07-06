export interface INewArticle {
    title: string;
    content: string;
    thumbnail: string;
}

export function NewArticleDto({title, content, thumbnail}: any): INewArticle {
    return {
        title,
        content,
        thumbnail
    }
};
