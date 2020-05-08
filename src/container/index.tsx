import React from 'react';
const Container: React.FC = props => {
  console.log(props, "Container")
  return (
    <div className="app">
      {props.children}
    </div>
  )
}
export default Container;