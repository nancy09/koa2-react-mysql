import React from 'react'
import ReactDOM from 'react-dom'
import './svg.less'

class Svg extends React.Component {
  render() {
    return (
      <svg version="1.1" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <symbol id="text">
          <text x="30%" y="35%" className="text">Alloy</text>
          <text x="30%" y="70%" className="text">Team</text>
        </symbol>

        <g>
          {/* React JSX中：1）xlink:href="#text"不支持，需要改写成xlinkHref；2）class="use-text"要改成className=".." */}
          <use xlinkHref="#text" className="use-text"></use>
          <use xlinkHref="#text" className="use-text"></use>
          <use xlinkHref="#text" className="use-text"></use>
          <use xlinkHref="#text" className="use-text"></use>
          <use xlinkHref="#text" className="use-text"></use>
        </g>
      </svg>
    )
  }
}


ReactDOM.render(<Svg />,
  document.getElementById('app'))