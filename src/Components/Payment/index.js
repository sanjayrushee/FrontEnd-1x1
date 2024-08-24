import React, { Component } from 'react';

class Payment extends Component {
    state = {
        mentorName: '',
        isPremium: '',
        duration: '',
        mentorAvailability:'',
        paymentAmount: 2000, 


    };

    componentDidMount() {
        //const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const mentorDetails = JSON.parse(localStorage.getItem("MentorDetails"));
        this.setState({mentorName: mentorDetails.mentorName,
            isPremium: mentorDetails.isPremium,
            duration: mentorDetails.duration,
            mentorAvailability: mentorDetails.mentorAvailability
        })
    }

    updatePaymentAmount = () => {
        const { duration } = this.state;
        let paymentAmount = 0;

        switch (duration) {
            case '30':
                paymentAmount = 2000;
                break;
            case '45':
                paymentAmount = 3000;
                break;
            case '60':
                paymentAmount = 4000;
                break;
            default:
                paymentAmount = 2000;
        }

        this.setState({ paymentAmount });
    }

render() {
    const { mentorName,paymentAmount, isPremium, duration, mentorAvailability } = this.state;

    return (
    <>
    <div>
        <h2 className="text-xl mb-4">Step 3</h2>

        <div className="mb-4">
            <label className="block mb-2">Mentor Name</label>
            <p className="border p-2 mb-4 block w-full">{mentorName}</p>
        </div>

        <div className="mb-4">
            <label className="block mb-2">Is Premium</label>
            <p className="border p-2 mb-4 block w-full">{isPremium}</p>
        </div>

        <div className="mb-4">
            <label className="block mb-2">Duration</label>
            <p className="border p-2 mb-4 block w-full">{duration}</p>
        </div>

        <div className="mb-4">
            <label className="block mb-2">Mentor Availability</label>
            <p className="border p-2 mb-4 block w-full">{mentorAvailability}</p>
        </div>
        <div className="mb-4">
            <label className="block mb-2">Total Payment</label>
            <p className="border p-2">${paymentAmount}</p>
        </div>
    </div>
    
    </>
    );
}
}

export default Payment;