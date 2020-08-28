/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createUser } from '../actions/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      password_confirmation: '',
      errors: '',
    };
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  }

  handleChangePasswordConfirm = e => {
    e.preventDefault();
    this.setState({
      password_confirmation: e.target.value,
    });
  }

   handleSubmit = async e => {
     e.preventDefault();
     const {
       name,
       password,
       password_confirmation,
     } = this.state;

     const { createUser } = this.props;

     const response = await createUser({
       name,
       password,
       password_confirmation,
     });
     if (response && response.status === 200) {
       const { history } = this.props;
       history.push('/');
     } else {
       const { error } = this.props;
       this.setState({
         errors: error,
       });
     }
   }

   handleErrors = () => {
     const { errors } = this.state;
     setTimeout(() => this.setState(
       { errors: '' },
     ), 3000);
     return (
       <ul>
         {errors.map(
           error => (
             <li
               key={error}
             >
               {error}
             </li>
           ),
         )}
       </ul>
     );
   }

   render() {
     const {
       name,
       errors,
       password,
       password_confirmation,
     } = this.state;

     return (
       <section className="signin-page">
         <div className="signin-page-cover">

           <div className="error">
             {errors ? this.handleErrors() : null}
           </div>
           <div className="signin-page-main">
             <h2>Sign Up</h2>
             <form onSubmit={this.handleSubmit}>
               <input
                 className="signup-input"
                 placeholder="Name"
                 type="text"
                 name="name"
                 value={name}
                 onChange={this.handleChangeName}
                 required
               />

               <input
                 className="signup-input"
                 placeholder="Password"
                 type="password"
                 name="password"
                 value={password}
                 onChange={this.handleChangePassword}
                 required
               />

               <input
                 className="signup-input"
                 placeholder="Confirm Password"
                 type="password"
                 name="passwordConfirmation"
                 value={password_confirmation}
                 onChange={this.handleChangePasswordConfirm}
                 required
               />
               <button
                 className="signup-btn"
                 type="submit"
               >
                 Create Account
               </button>
             </form>
           </div>
         </div>
       </section>
     );
   }
}

const mapStateToProps = state => ({
  user: state.user,
  isLogin: state.user.isLogin,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUser(data)),
});

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  createUser: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Array),

};

Signup.defaultProps = {
  error: [],
  history: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Signup),
);
