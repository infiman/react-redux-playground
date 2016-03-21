import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MovablePages from '../components/MovablePages';
import SideBar from '../components/SideBar';
import Page from './Page';

export default class Main extends React.Component {
  render() {
    return (
      <section className="bsb-content">
        <SideBar />
        <MovablePages>
          <Page id="1" customClassName="bsb-left-page" />
          <Page id="2" customClassName="bsb-right-page" />
        </MovablePages>
      </section>
    );
  }
}

/* eslint new-cap:0 */
/* eslint react/prefer-stateless-function:0  */
export default DragDropContext(HTML5Backend)(Main);
