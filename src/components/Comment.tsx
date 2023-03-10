import { useEffect, useState } from "react";
import { CommentObject, fetchCommentsById, convertDate } from "../api/api";
import "../styles/Comment.css";

type CommentProps = {
    id: number;
}

function Comment(props: CommentProps): JSX.Element {
    const commentId = props.id;
    const [commentItem, setCommentItem] = useState<CommentObject>();
    const [active, setActive] = useState<boolean>(true);
    const [kidsIds, setKidsIds] = useState<number[]>();

    useEffect(() => {
        fetchCommentsById(commentId)
            .then((value) => {
                setCommentItem(value);
            })
    }, [])

    function renderKidsComments(kidsIds: number[]): JSX.Element[] {
        return kidsIds.map((kidId) => {
            return <Comment key={kidId} id={kidId} />;
        })
    }

    const btnClassName = active? "comment__replies-btn":"comment__replies-btn-inactive"

    function createMarkup(commentItem: CommentObject) {
        return {__html: commentItem.text};
    };

    return (
        <>
            {commentItem &&
                <section className="comment__container">
                    <div className="comment__content">
                        <div className="comment__text-container">
                            <div className="comment__text" dangerouslySetInnerHTML={createMarkup(commentItem)}></div>
                        </div>
                        <p className="comment__description"> <span>Author:</span> {commentItem.by}</p>
                        <p className="comment__description"><span>Published at:</span> {convertDate(commentItem.time)}</p>
                    </div>
                    {commentItem.kids ?
                        <button className={btnClassName}
                            onClick={() => {
                                setActive(false);
                                setKidsIds(commentItem.kids);
                            }}>
                            Load replies
                        </button>
                        :
                        <div className="comment__no-replies"><p>No replies</p></div>
                    }
                </section>
            }
            {kidsIds && <div className="comment__kids-container"> {renderKidsComments(kidsIds)} </div>}
        </>
    );
}

export default Comment;