import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { addElementToPage } from 'actions';
import Element from '../components/Element';

const containerSource = {
  drop(props, monitor, component) {
    component.store.dispatch(addElementToPage(props.id));
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Page extends React.Component {
  static propTypes = {
    customClassName: React.PropTypes.string,
    connectDropTarget: React.PropTypes.func,
    elements: React.PropTypes.array,
    width: React.PropTypes.string,
    isOver: React.PropTypes.bool,
    id: React.PropTypes.string,
  };

  static childContextTypes = {
    pageId: React.PropTypes.string,
  }

  getChildContext() {
    return {
      pageId: this.props.id,
    };
  }

  get elements() {
    return this.props.elements.map((item, index) =>
      <Element id={item.elementId} key={index} isDraggable={false} />
    );
  }

  render() {
    const { customClassName, width, isOver, connectDropTarget } = this.props;
    const style = { width };

    if (isOver) {
      Object.assign(style, {
        background: '#BBB',
        border: '25px solid #555',
      });
    }

    return connectDropTarget(
      <section
        className={customClassName}
        style={style}
      >
        {this.elements}
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (!state.pages || !state.pages[props.id]) return { elements: [] };

  const elements = state.pages[props.id].elements || [];

  return { elements };
};

/* eslint new-cap:0 */
export default DropTarget(
  'ElementToContainer', containerSource, collect
)(connect(mapStateToProps)(Page));
