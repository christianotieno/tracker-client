/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { loginStatus } from '../actions/user';
import TaskForm from '../components/TaskForm';
import {
  fetchScheduleTasks,
  createTask,
  deleteTask,
} from '../actions/task';
import '../styles/task.css';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.match.params.id,
      addEdit: false,
      buttonId: '0',
    };
  }

  componentDidMount() {
    const {
      user,
      fetchScheduleTasks,
    } = this.props;

    const { ID } = this.state;
    const userID = user.user.id;
    fetchScheduleTasks(userID, ID);
  }

  createDate = date => {
    const dateFormat = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return dateFormat.toUTCString(undefined, options);
  }

  displayInfo = () => {
    const { displayForm } = this.props;
    displayForm();
  }

  addTask = (
    name, notes, date, done, user_id,
  ) => {
    const { ID } = this.state;
    const { createTask } = this.props;
    const schedule_id = ID;
    createTask({
      schedule_id, name, notes, date, done, user_id,
    });
  }

  deleteTask = id => {
    const { ID } = this.state;
    const { deleteTask, user } = this.props;
    const user_id = user.user.id;
    const schedule_id = ID;
    deleteTask({ schedule_id, id, user_id });
  }

  changeEditForm = () => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
    });
  }

  changeAddForm = () => {
    const { displayForm } = this.props;
    displayForm();
  }

  displayEdit = e => {
    const { addEdit } = this.state;
    this.setState({
      addEdit: !addEdit,
      buttonId: e.target.id,
    });
  }

  displayTask = () => {
    const { location } = this.props;
    const { state } = location;
    if (state) {
      const { scheduleTitle } = state;
      return scheduleTitle;
    }
    const { history } = this.props;
    history.push('/main');
    return null;
  }

  render() {
    const { addEdit, buttonId } = this.state;
    const { tasks, addForm } = this.props;

    const name = this.displayTask();

    return (
      <div className="tasks">
        <div className="tasks-buttons">
          <button
            type="button"
            className="go-back"
            onClick={this.displayInfo}
          >
            <Link to="/main">
              <span>Go back to schedules</span>
            </Link>
          </button>

          <button
            type="button"
            className="add-task"
            onClick={this.displayInfo}
          >
            Click here to add Tasks
          </button>
        </div>

        {!addEdit && !addForm && (
        <h3 className="title">
          Scheduled Tasks:
          {' '}
          {name && <span>{name}</span>}
        </h3>
        )}
        {tasks.map(task => (
          <div key={task.id}>
            {!addEdit && !addForm && (
              <div>
                <div className="task">
                  <div className="date">
                    <p>
                      Date created:
                      {' '}
                      {this.createDate(task.date).slice(0, 16)}
                      {' '}
                    </p>
                  </div>
                  <div className="name">
                    <p>{task.name}</p>
                  </div>
                  <div>
                    <button
                      className="delete-task-btn"
                      type="button"
                      onClick={() => this.deleteTask(task.id)}
                    >
                      <p>Delete task</p>
                    </button>
                    <button
                      type="button"
                      className="update-task-btn"
                      onClick={this.displayEdit}
                    >
                      <p id={task.id}>Update task</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {addEdit && buttonId === task.id.toString() && (
            <TaskForm
              actionToPerform="Save Changes"
              buttonId={buttonId}
              changeEditForm={this.changeEditForm}
            />
            )}
          </div>
        ))}
        {addForm
        && (
        <TaskForm
          actionToPerform="Add"
          addTask={this.addTask}
          changeAddForm={this.changeAddForm}
        />
        ) }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  tasks: state.task,
});

const mapDispatchToProps = dispatch => ({
  fetchScheduleTasks: (
    datauser, dataschedule,
  ) => dispatch(
    fetchScheduleTasks(datauser, dataschedule),
  ),
  loginStatus: () => dispatch(loginStatus()),
  createTask: data => dispatch(createTask(data)),
  deleteTask: (id, id2) => dispatch(deleteTask(id, id2)),
});

Tasks.propTypes = {
  addForm: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  fetchScheduleTasks: PropTypes.func,
  deleteTask: PropTypes.func,
  createTask: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  tasks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  location: PropTypes.shape({
    state: PropTypes.shape({ scheduleTitle: PropTypes.string }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  displayForm: PropTypes.func,

};

Tasks.defaultProps = {
  user: {},
  tasks: [],
  history: {},
  location: {},
  addForm: false,
  deleteTask: () => {},
  createTask: () => {},
  displayForm: () => {},
  fetchScheduleTasks: () => {},
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks));
