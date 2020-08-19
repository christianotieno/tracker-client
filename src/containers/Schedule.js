/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginStatus } from '../actions/user';
import ScheduleForm from '../components/ScheduleForm';
import '../styles/schedule.css';
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
      addForm,
      editForm,
    } = this.state;

    return schedule !== nextProps.schedule
    || addForm !== nextState.addForm
    || editForm !== nextState.editForm;
  }

  addSchedule = title => {
    const {
      user,
      createSchedule,
    } = this.props;

    const { addForm } = this.state;
    const user_id = user.user.id;

    createSchedule({
      title,
      user_id,
    });
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
       addForm,
       editForm,
       scheduleId,
     } = this.state;

     return (
       <main className="main">
         <div className="sched-button">
           <button
             type="button"
             className="add-schedule"
             onClick={this.displayForm}
           >
             Click here to add schedules
           </button>
         </div>
         <div className="schedules">
           {
             !editForm
             && !addForm
             && <h3>Your schedules</h3>
}
           {schedule.length === 0
           && !addForm
           && (
           <div
             className="task"
           >
             Click the above button to add schedules!
           </div>
           )}
           {schedule.map(sched => (
             <div key={sched.id}>
               { !editForm && !addForm && (
               <div className="one-schedule">
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
                     <div
                       className="schedule-title"
                     >
                       <p>{sched.title}</p>

                     </div>
                     )}
                   </Link>
                 </div>
                 <div className="buttons">
                   <button
                     type="button"
                     className="button delete-sched"
                     onClick={() => this.deleteSchedule(sched.id)}
                   >
                     Delete Schedule
                   </button>

                   <button
                     type="button"
                     className="button update-sched"
                     onClick={this.displayEdit}
                   >
                     <span id={sched.id}>
                       Update Schedule
                     </span>
                   </button>
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
    isLogin: state.user.isLogin,
    schedule: state.schedule,
  });

const mapDispatchToProps = dispatch => ({
  fetchUserSchedule: data => dispatch(fetchUserSchedule(data)),
  createSchedule: data => dispatch(createSchedule(data)),
  deleteSchedule: id => dispatch(deleteSchedule(id)),
  signInStatus: () => dispatch(loginStatus()),
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
