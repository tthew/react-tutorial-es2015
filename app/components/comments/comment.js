import React from 'react'
import marked from 'marked'
export default class Comment extends React.Component {
  render () {
    var markup = marked(this.props.children.toString(), { sanitize: true })
    return (
      <div className="comment">
        <h2 className="comment__author">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: markup}} />
      </div>
    )
  }
}
