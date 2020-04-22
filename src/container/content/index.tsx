import React, { Component } from 'react';
class content extends Component {
  public render() {
    return (
      <div >
        <div>content</div>
        { this.props.children }
      </div>
    );
  }
}
export default content;