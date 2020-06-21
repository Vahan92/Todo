import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { deleteTodoAction, editTodoAction } from "../actions/TodoActions";
import { func, array } from "prop-types";
import { ReactComponent as Edit } from "../images/pencil.svg";
import { ReactComponent as Delete } from "../images/trash.svg";

class List extends Component {
  render() {
    return (
      <div>
        <Table responsive>
          <tbody>
            {this.props.todoList.map((todo, index) => {
              return (
                <tr key={todo + index + Math.random()}>
                  <td style={{ width: "80%" }}>{todo}</td>
                  <td>
                    <Edit
                      onClick={() => {
                        this.props.edit(index, todo);
                      }}
                    />
                  </td>
                  <td>
                    <Delete
                      onClick={() => {
                        this.props.delete(index, todo);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todoList: state.todoReducer.todoList,
  lastDeleted: state.todoReducer.lastDeleted,
});

const mapDispatchToProps = {
  delete: deleteTodoAction,
  edit: editTodoAction,
};

List.propTypes = {
  todoList: array.isRequired,
  delete: func.isRequired,
  edit: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
