import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLatestStoriesIds, fetchNewsbyId, convertDate } from "../../api/api";
import Loader from "../../components/Loader";
import { addNews, deleteNews, selectNews } from "../../store/news/newsSlice";
import "../../styles/Main.css";


function Main(): JSX.Element {
    const dispatch = useDispatch();
    const newsList = useSelector(selectNews);
    const [newsReady, setNewsReady] = useState(false);

    useEffect(() => {
        if (newsList.length === 0) {
            fetchLatestStoriesIds()
                .then((value) => {
                    fetchHundredNews(value);
                })
        } else {
            setNewsReady(true);
        }
        const interval = setInterval(() => {
                updateNewsList();
              }, 60000);

        return () => {
                clearInterval(interval);
            };
    }, [])

    async function fetchHundredNews(latestNewsIds: number[]) {
        for (let id of latestNewsIds.slice(0, 100)) {
            let news = await fetchNewsbyId(id);
            dispatch(addNews(news));
        }
        setNewsReady(true);
    }

    function updateNewsList() {
        dispatch(deleteNews([]));
        fetchLatestStoriesIds()
            .then((value) => {
                fetchHundredNews(value);
            })
    }

    function renderNewsList() {
        return newsList.map((item) => {
            return <li key={item.id} className="main__news-item">
                <Link to={`news/${item.id ? item.id : ""}`} className="main__news-item_title"><h4> {item.title ? item.title : null}</h4></Link>
                <p className="main__news-item_description"><span>Rating:</span> {item.score ? item.score : null}</p>
                <p className="main__news-item_description"><span>Author</span>: {item.by ? item.by : null}</p>
                <p className="main__news-item_description"><span>Published at</span>:{item.time ? convertDate(item.time) : null}</p>
                <p className="main__news-item_description"><span>Comments:</span> {(item.descendants ? item.descendants : 0)}</p>
            </li>
        })
    }

    return (
        <div className="main__container">
            <button className="main__upd-btn" onClick={updateNewsList}>Update news</button>
            <ul className="main__news-list">
                {newsReady ? renderNewsList() : <Loader/>}
            </ul>

        </div>
    );
}
export default Main;