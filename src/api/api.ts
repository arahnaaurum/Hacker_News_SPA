import { NewsObject } from "../store/news/newsSlice";

export async function fetchLatestStoriesIds(): Promise<number[]> {
    let response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
    let result = await response.json();
    return result;
};

export async function fetchNewsbyId(id: number): Promise<NewsObject> {
    let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    let result = await response.json();
    return result;
};

export type CommentObject = {
    by : string;
    id : number;
    kids : number[];
    parent : number;
    text : string;
    time : number;
    type : string;
}

export async function fetchCommentsByIds(ids: number[]): Promise<CommentObject[]> {
    let commentsList: CommentObject[] = [];
    if (ids) {
        for (let id of ids) {
            let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            let result = await response.json();
            commentsList.push(result);
        }
    }
    return commentsList;
};

export async function fetchCommentsById(id: number): Promise<CommentObject> {
        let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        let result = await response.json();
    return result;
};

export function convertDate(seconds: number): string {
    let date = new Date(seconds * 1000);
    return date.toString().slice(0, 25);
}