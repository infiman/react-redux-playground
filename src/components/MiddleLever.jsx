import React from 'react';
import { connect } from 'react-redux';
import { updateProgress } from 'actions';

const LEVER_WIDTH = 36;
const HOLE_CONST = 54;

class MiddleLever extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    progress: React.PropTypes.number,
  };

  state = {
    hoverStarted: false,
    dragStarted: false,
  };

  componentDidMount() {
    this.forceUpdate();
  }

  startDrag = () => {
    this.setState({ dragStarted: true });
  }

  endDragOnLeave = () => this.setState({
    hoverStarted: false,
    dragStarted: false,
  });

  endDragOnKeyUp = () => this.setState({ dragStarted: false });

  drag = e => {
    if (!this.state.dragStarted) return;

    this.props.dispatch(updateProgress((e.clientX - this.delta) / this.leverContainerWidth));
  };

  hover = () => this.setState({ hoverStarted: true });

  disableNativeDrag = () => false;

  get delta() {
    return document.documentElement.clientWidth - this.leverContainerWidth;
  }

  get leverWidth() {
    return LEVER_WIDTH;
  }

  get leverPosition() {
    return `${(this.props.progress * this.leverContainerWidth) - (this.leverWidth / 2)}px`;
  }

  get leverContainerWidth() {
    return this.refs.lever ? this.refs.lever.offsetWidth : 0;
  }

  get widthTransition() {
    return (this.state.hoverStarted && this.state.dragStarted) ? '' : 'bsb-width-transition';
  }

  get leftBarWidth() {
    return this.leverContainerWidth * this.props.progress;
  }

  get rightBarWidth() {
    return this.leverContainerWidth - this.leftBarWidth;
  }

  get holePadding() {
    return this.state.hoverStarted ? HOLE_CONST : 0;
  }

  render() {
    return (
      <div
        className="bsb-lever-bar"

        ref="lever"

        onDrag={this.disableNativeDrag}
        onDrop={this.disableNativeDrag}

        onMouseUp={this.endDragOnKeyUp}
        onMouseMove={this.drag}
        onMouseEnter={this.hover}
        onMouseLeave={this.endDragOnLeave}

        onTouchStart={this.hover}
        onTouchEnd={this.endDragOnKeyUp}
        onTouchMove={this.drag}
        onTouchCancel={this.endDragOnLeave}
      >
        <span
          className={`bsb-lever-progress-left ${this.widthTransition}`}
          style={{ width: `${this.leftBarWidth - this.holePadding}px` }}
        />
        <span
          className="bsb-middle-lever"
          onMouseDown={this.startDrag}
          onTouchStart={this.startDrag}
          style={{ left: this.leverPosition }}
        >
          <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle id="bar" r="16" cx="18" cy="18" fill="transparent"></circle>
          </svg>
        </span>
        <span
          className={`bsb-lever-progress-right ${this.widthTransition}`}
          style={{ width: (this.rightBarWidth - this.holePadding > 0) ?
            `${this.rightBarWidth - this.holePadding}px` :
            '0',
          }}
        />
      </div>
    );
  }
}

export default connect()(MiddleLever);
