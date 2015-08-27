import React from 'react'
import jQuery from 'jquery'
import CommentList from './comment-list'
import CommentForm from './comment-form'

export default class CommentBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      url: props.url,
      data: []
    }
  }

  loadCommentsFromServer () {
    jQuery.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    })
  }

  handleCommentSubmit (comment) {
    var comments = this.state.data
    this.setState({data: comments.concat([comment])})

    jQuery.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    })
  }

  componentDidMount () {
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval)
  }

  render () {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    )
  }
}
