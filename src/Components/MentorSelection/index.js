
import React, { Component } from 'react';

class MentorSelection extends Component {
  state ={
      mentors: [],
      area_of_expertise: null,
      selectedMentorId: '',
      isPremium:'',
      feedback:'',
      mentorAvailability:'',
      isloading: false,
      mentorName:'',
      duration: '30'

  }

  componentDidMount() {

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
 
    if (userDetails) {
        this.setState({ area_of_expertise: userDetails.AreaofInterest }, () => {
            this.getMentor();
        });
    }
  }

  getMentor = async() =>{  
    const {area_of_expertise} = this.state
      const url = `http://localhost:3005/mentor/?area_of_expertise=${area_of_expertise}`
      const option = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }
  
      const response = await fetch(url,option);
      const data = await response.json()
      if (response.ok) {
          this.setState({ mentors: data }); 
      }
      else{
      console.log('Error fetching mentor data:', data.message);
      }

  }

  handleMentorSelect = (event) => {
      const {mentors} = this.state
      const id = event.target.value
      this.setState({ selectedMentorId: id });
      const mentor_details = mentors.find((m) => m.mentor_id === Number(id));
      this.setState({
        mentorName: mentor_details.mentor_name,
        isPremium: mentor_details.is_premium,
        feedback: mentor_details.feedback,
        mentorAvailability:mentor_details.mentor_availability,
        isloading:true
      })

  
};

  getduration  = (event) => {
      this.setState({ duration: event.target.value });
    }

    onSubmitMentor = (event) =>{
      event.preventDefault()
      localStorage.setItem("MentorDetails",JSON.stringify(this.state))
      this.props.handleNextStep();
    }


  render() {
      const { duration,mentors,isloading,isPremium,feedback,mentorAvailability } = this.state;

    return (
      <form onSubmit={this.onSubmitMentor}>

     <div className="">
     <label className="block mb-2 mt-2" >Choose a time duration:</label>
     <select
       className="border p-2 mb-4 block w-full"

       value={duration}
       onChange={this.getduration}
     >
       <option value="30">30 minutes</option>
       <option value="40">40 minutes</option>
       <option value="50">50 minutes</option>
     </select>
   </div>
   <div>
      <h1>Mentors</h1>
      <select onChange={this.handleMentorSelect} className="border p-2 mb-4 block w-full" defaultValue="">
          <option value="" disabled>
               Select mentor
           </option>
          {mentors.map((eachIteam) => (
              <option 
              key={eachIteam.mentor_id} value={eachIteam.mentor_id}>
                  {eachIteam.mentor_name}
              </option>
          ))}
      </select>
    </div>
    <div>
      {isloading?(
      <div>
          <h4 className="text-xl mb-4">{isPremium === 'yes'? 'Premium mentor': ''}</h4>
          <h2 className="text-xl mb-4">Available Timing: <span className='text-xl'>{mentorAvailability}</span></h2>
          <p className="text-xl mb-4">Feedback: {feedback} Rating</p>
      </div>):''}
  </div>
  <div className="flex justify-end mt-4">
      <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
      >
          Next
      </button>
  </div>
   </form>
      
    );
  }
}

export default MentorSelection;
