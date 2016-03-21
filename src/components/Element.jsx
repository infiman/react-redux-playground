import React from 'react';
import { connect } from 'react-redux';
import { removeElementFromPage } from 'actions';
import { DragSource } from 'react-dnd';

const elementSource = {
  beginDrag({ id }) {
    return {
      id,
      type: 'Element',
    };
  },
  canDrag({ isDraggable }) {
    return isDraggable;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class Element extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    connectDragSource: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    isDraggable: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
  };

  static contextTypes = {
    pageId: React.PropTypes.string,
  };

  deleteElement = () => {
    this.props.dispatch(removeElementFromPage(this.context.pageId, this.props.id));
  };

  get deleteButton() {
    return this.props.isDraggable ?
      null :
      <span className="bsb-item-delete-button" onClick={this.deleteElement}>x</span>;
  }

  render() {
    const { id, connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div className="bsb-sidebar-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {typeof(id) === 'undefined' ? 'DRAG' : id}
        {this.deleteButton}
      </div>
    );
  }
}

Element.propTypes = {
  connectDragSource: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
};

/* eslint new-cap:0 */
export default DragSource('ElementToContainer', elementSource, collect)(connect()(Element));
