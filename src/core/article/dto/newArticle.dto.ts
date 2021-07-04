export interface INewArticle {
    title: string;
    content: string
}

export function NewArticleDto({title, content}: any): INewArticle {
    return {
        title,
        content
    }
};
