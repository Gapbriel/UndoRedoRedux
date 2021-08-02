import React from 'react';
import { connect } from 'react-redux';
import { undoAble, redoAble } from '../actions';

let Undo = ({ canUndo, onUndo , canRedo, onRedo}) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
);

const mapStateToProps = (state) => {
  const historyLength = state.todos?.history?.length;
  return { canUndo: state.todos.history[historyLength-1]?.past.length > 0 &&  state.todos.presentHistory > -1 ,
  canRedo: state.todos.history.length > state.todos.presentHistory + 1 && state.todos.history.length > 0}
};

const mapDispatchToProps = (dispatch) => ({
  onUndo: () => {
    dispatch(undoAble);
  },
  onRedo: () => {
    dispatch(redoAble);
  },
});

Undo = connect(mapStateToProps, mapDispatchToProps)(Undo);

export default Undo;
