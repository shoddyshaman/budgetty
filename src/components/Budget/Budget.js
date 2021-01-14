import React, { Component } from 'react';
import {connect} from 'react-redux';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { requestUserData } from './../../ducks/userReducer'
import { requestBudgetData,addPurchase, removePurchase } from './../../ducks/budgetReducer';




class Budget extends Component {

  componentDidMount() {
    this.props.requestBudgetData();
    this.props.requestUserData();
  }

  render() {
    const {loading, purchases, budgetLimit} = this.props.budget;
    const { firstName, lastName} = this.props.user;
    const{addPurchase, removePurchase} = this.props;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName}/>
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={addPurchase}/>
              <DisplayPurchases purchases={purchases} removePurchase={removePurchase}/>
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit}/>
              <Chart2 purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    budget: state.budget,
    user: state.user
  }
}

export default connect(mapStateToProps,{requestBudgetData, requestUserData, addPurchase, removePurchase})(Budget);
