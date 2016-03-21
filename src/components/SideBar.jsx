import React from 'react';
import { connect } from 'react-redux';
import { openSideBar } from 'actions';
import Element from './Element';

const IS_DRAGGABLE = true;

class SideBar extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    isVisible: React.PropTypes.bool,
  };

  toggleSideBar = () => {
    this.props.dispatch(openSideBar(!this.props.isVisible));
  }

  get sidebarCssClass() {
    return `bsb-sidebar${this.props.isVisible ? ' is-visible' : ''}`;
  }

  get buttonCssClass() {
    return `bsb-sidebar-button${this.props.isVisible ? ' is-opened' : ''}`;
  }

  render() {
    return (
      <nav className={this.sidebarCssClass}>
        <div className={this.buttonCssClass} onClick={this.toggleSideBar}>
          <span></span>
          <span></span>
        </div>
        <Element isDraggable={IS_DRAGGABLE} />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isVisible: state.sidebar.isVisible,
});

export default connect(mapStateToProps)(SideBar);
