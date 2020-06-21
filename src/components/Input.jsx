import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  addTodoAction,
  undoTodoAction,
  confirmEditAction,
} from "../actions/TodoActions";
import { func, object } from "prop-types";
import styled from "styled-components";

class Input extends Component {
  state = {
    todo: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.editTodo.index !== prevProps.editTodo.index) {
      this.setState({
        todo: this.props.editTodo.todo,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = (e) => {
    e.preventDefault();
    if (this.state.todo.trim() < 1) {
      alert("empty value is not allowed");
    } else {
      this.props.addTodo(this.state.todo);
      this.setState({
        todo: "",
      });
    }
  };

  confirmEdit = (index, todo) => {
    if (this.state.todo.trim() < 1) {
      alert("empty value is not allowed");
    } else {
      this.props.confirmEdit(index, todo);
      this.setState({
        todo: "",
      });
    }
  };

  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.submit}>
          <Button variant="outline-primary" type="submit">
            Add Todo
          </Button>
          <Form.Group controlId="formBasicName">
            <Form.Control
              required
              onChange={this.onChange}
              type="text"
              name="todo"
              placeholder="Enter todo"
              value={this.state.todo || ""}
            />
          </Form.Group>
          {Object.keys(this.props.lastDeleted).length > 0 && (
            <Button variant="outline-primary" onClick={this.props.undo}>
              Undo
            </Button>
          )}
          {this.state.todo !== this.props.editTodo.todo &&
            Object.keys(this.props.editTodo).length > 0 &&
            this.state.todo.length > 0 && (
              <Button
                variant="outline-success"
                onClick={() => {
                  this.confirmEdit(this.props.editTodo.index, this.state.todo);
                }}
              >
                update
              </Button>
            )}
        </Form>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  lastDeleted: state.todoReducer.lastDeleted,
  editTodo: state.todoReducer.editTodo,
});

const mapDispatchToProps = {
  addTodo: addTodoAction,
  undo: undoTodoAction,
  confirmEdit: confirmEditAction,
};

Input.propTypes = {
  addTodo: func.isRequired,
  undo: func.isRequired,
  lastDeleted: object.isRequired,
  editTodo: object.isRequired,
  confirmEdit: func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Input);
