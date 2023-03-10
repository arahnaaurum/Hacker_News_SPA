import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchNewsbyId, convertDate } from "../../api/api";
import { NewsObject } from "../../store/news/newsSlice";
import Comment from "../../components/Comment";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import "../../styles/News.css";


function News(): JSX.Element {
    const { id } = useParams();
    const itemId = Number(id);
    const [newsItem, setNewsItem] = useState<NewsObject>();
    const [rootCommentsIds, setRootCommentsIds] = useState<number[]>([]);

    useEffect(() => {
        fetchNewsbyId(itemId)
            .then((value) => {
                setNewsItem(value);
            })
    }, [])

    useEffect(() => {
        if (newsItem?.kids) {
            setRootCommentsIds(newsItem.kids);
        }
    }, [newsItem])

    function renderComments(array: number[]): JSX.Element[] {
        return array.map((commentId) => {
            return <Comment key={commentId} id={commentId} />
        })
    }

    function renewComments() {
        setRootCommentsIds([]);
        fetchNewsbyId(itemId)
            .then((value) => {
                if (value.kids) {
                    setRootCommentsIds(value.kids);
                }
            });
    }

    if (newsItem && rootCommentsIds) {
        return (
            <div className="news__container">
                <div className="news__content-container">
                    <h3>{newsItem.title}</h3>
                    <a href={`${newsItem.url}`} className="news__link">Check story</a>
                    <p className="news__description"><span>Author:</span> {newsItem.by}</p>
                    <p className="news__description"><span>Published at:</span> {convertDate(newsItem.time)}</p>
                    <p className="news__description"><span>Commets:</span> {newsItem.descendants}</p>
                    <h3 className="news__comments_title">Comments:</h3>
                    {newsItem.descendants !== 0 ?
                        renderComments(rootCommentsIds) :
                        <p>There are no comments to this story yet.</p>
                    }
                </div>
                <div className="news__btns" >
                    <button className="news__btn" onClick={renewComments}>Renew comments</button>
                    <Link to={'/'} className="news__btn"> Return to all news </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="news__container">
            <Loader />
        </div>
    );
}
export default News;