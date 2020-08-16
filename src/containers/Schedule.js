/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInStatus } from '../actions/auth';
import ScheduleForm from '../components/ScheduleForm';
import {
  fetchUserSchedule,
  createSchedule,
  deleteSchedule,
} from '../actions/schedule';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false,
      editForm: false,
      scheduleId: '0',
    };
  }

  componentDidMount() {
    const { user, fetchUserSchedule } = this.props;
    const ID = user.user.id;
    fetchUserSchedule(ID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { schedule } = this.props;
    const {
      addForm, editForm,
    } = this.state;

    return schedule !== nextProps.schedule
    || addForm !== nextState.addForm
    || editForm !== nextState.editForm;
  }

  addSchedule = title => {
    const { createSchedule, user } = this.props;
    const { addForm } = this.state;
    const user_id = user.user.id;

    createSchedule({ title, user_id });
    this.setState({
      addForm: !addForm,
    });
  };

  displayForm = () => {
    const { addForm } = this.state;
    this.setState({
      addForm: !addForm,
    });
  }

  displayEdit= e => {
    const { editForm } = this.state;
    this.setState({
      editForm: !editForm,
      scheduleId: e.target.id,
    });
  }

  deleteSchedule = id => {
    const { user } = this.props;
    const { deleteSchedule } = this.props;
    const user_id = user.user.id;
    deleteSchedule({ user_id, id });
  }

   changeEditForm = () => {
     const { editForm } = this.state;
     this.setState({
       editForm: !editForm,
     });
   }

   changeAddForm = () => {
     const { addForm } = this.state;
     this.setState({
       addForm: !addForm,
     });
   }

   render() {
     const { schedule } = this.props;
     const {
       addForm, editForm, scheduleId,
     } = this.state;

     return (
       <main className="main">
         <button
           type="button"
           className="add-schedule"
           onClick={this.displayForm}
         >
           +
         </button>

         <div className="schedules">
           { !editForm && !addForm && <h3>Your schedules</h3>}

           {schedule.length === 0
           && !addForm
           && (
           <div className="task">
             Add your Schedules here!
           </div>
           )}
           {schedule.map(sched => (
             <div key={sched.id}>
               { !editForm && !addForm && (
               <div className="one-schedule">
                 <div className="buttons">
                   <button
                     type="button"
                     onClick={() => this.deleteSchedule(sched.id)}
                   >
                     <i className="fa fa-trash-o" />
                   </button>

                   <button
                     type="button"
                     onClick={this.displayEdit}
                   >
                     <i
                       className="fa fa-pencil-square-o"
                       id={sched.id}
                     />
                   </button>

                 </div>
                 <div
                   className="schedule-info"
                 >
                   <Link to={{
                     pathname: `schedule/${sched.id}`,
                     state: {
                       scheduleTitle: sched.title,
                     },
                   }}
                   >
                     {!editForm && (
                     <div>
                       <div className="schedule-header">
                         <p>Title:</p>
                       </div>
                       <div
                         className="schedule-title"
                       >
                         <p>{sched.title}</p>
                       </div>
                     </div>
                     )}
                   </Link>
                 </div>
               </div>
               )}
               { editForm
               && sched.id.toString()
               === scheduleId
               && (
               <ScheduleForm
                 actionToPerform="Save Changes"
                 buttonId={scheduleId}
                 changeEditForm={this.changeEditForm}
               />
               )}
             </div>
           ))}
         </div>

         <div className="newSchedule">
           {addForm
           && (
           <ScheduleForm
             addSchedules={this.addSchedules}
             actionToPerform="Add"
             changeAddForm={this.changeAddForm}
           />
           )}
         </div>
       </main>
     );
   }
}

const mapStateToProps = state => (
  {
    user: state.user,
    isSignIn: state.user.isSignIn,
    schedule: state.schedule,
  });

const mapDispatchToProps = dispatch => ({
  fetchUserSchedule: data => dispatch(fetchUserSchedule(data)),
  createSchedule: data => dispatch(createSchedule(data)),
  deleteSchedule: id => dispatch(deleteSchedule(id)),
  signInStatus: () => dispatch(signInStatus()),
});

Schedule.propTypes = {
  fetchUserSchedule: PropTypes.func,
  createSchedule: PropTypes.func,
  deleteSchedule: PropTypes.func,
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),

  schedule: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })),
};

Schedule.defaultProps = {
  user: {},
  schedule: {},
  createSchedule: () => {},
  deleteSchedule: () => {},
  fetchUserSchedule: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Schedule);
