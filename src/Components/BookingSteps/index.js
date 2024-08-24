import React, { Component } from 'react';
import UserRegister from '../UserRegister';
import MentorSelection from '../MentorSelection';
import Payment from '../Payment';


class RegistersHome extends Component {

  state = {
    currentStep: 0,
    };

    handleNextStep = () => {
        const { currentStep } = this.state;
        this.setState({ currentStep: currentStep + 1 });
    };

    render() {
        const { currentStep } = this.state;

        return (
            <div className="max-w-md mx-auto mt-10">
                <div>
                    {currentStep === 0 && (
                        <UserRegister handleNextStep={this.handleNextStep} />
                    )}
                    {currentStep === 1 && (
                        <MentorSelection handleNextStep={this.handleNextStep} />
                    )}
                    {currentStep === 2 && (
                        <Payment handleNextStep={this.handleNextStep} />
                    )}
                </div>
            </div>
        );
    }
}

export default RegistersHome;
