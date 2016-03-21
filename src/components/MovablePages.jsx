import React from 'react';
import { connect } from 'react-redux';
import MiddleLever from './MiddleLever';

class MovablePages extends React.Component {
  static propTypes = {
    children: React.PropTypes.array,
    progress: React.PropTypes.number,
  };

  get children() {
    const { progress } = this.props;

    return React.Children.map(
      this.props.children,
      (child, index) => React.cloneElement(child, {
        progress,
        width: index ? `calc(100% - ${progress * 100}%)` : `${progress * 100}%`,
      })
    );
  }

  get lever() {
    return this.props.children.length ?
      <MiddleLever progress={this.props.progress} /> :
      null;
  }

  render() {
    return (
      <section className="bsb-workspace">
        {this.children}
        {this.lever}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  progress: state.progress,
});

export default connect(mapStateToProps)(MovablePages);
