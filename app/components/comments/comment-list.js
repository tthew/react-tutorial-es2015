import React from 'react'
import Comment from './comment'
export default class CommentList extends React.Component {
  render () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      )
    })

    return  (
      <div className="comment-list">
        {commentNodes}
      </div>
    )
  }
}
