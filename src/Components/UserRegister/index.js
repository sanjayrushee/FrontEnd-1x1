import { Component } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

class UserRegister extends Component {
    state = {
        AreaofInterest : null,
        name: '',
        email: '',
        phonenumber: ''
    }
    options = [
        { value: 'finance', label: 'Finance' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'operations-management', label: 'Operations Management' },
        { value: 'strategic-management', label: 'Strategic Management' },
        { value: 'human-resources', label: 'Human Resources' },
        { value: 'product-management', label: 'Product Management' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'sales-distribution', label: 'Sales and Distribution' },
        { value: 'business-development', label: 'Business Development' },
        { value: 'entrepreneurship', label: 'Entrepreneurship' },
    ];

    getAreaofInterest = (event, newValue) => {
      this.setState({ AreaofInterest: newValue ? newValue.value : '' });
  };

    onChangeName = (event) => {
        this.setState({ name : event.target.value });
    }
    onChangeEmail = (event) => {
      this.setState({ email : event.target.value });
    }
  
  onChangePhoneNumber = (event) => {
    this.setState({ phonenumber : event.target.value });
    }

    onSubmitFunction = async(event) => {
      event.preventDefault()

        const {name,AreaofInterest,phonenumber,email} = this.state
        const userDetails = {name,area_of_interest: AreaofInterest,phonenumber,email}

        if (name === '' || email === '' || phonenumber === '') {
          alert('Please fill out all the fields.');
          return;
      }
        const url = "http://localhost:3005/saveuser/"
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
            
        }
        const response = await fetch(url, option)
        const data = await response.json()
        if (response.ok === true) {
          console.log("okk")
          alert("user Registed")
          localStorage.setItem("userDetails",JSON.stringify(this.state))
          this.props.handleNextStep();
        } else {
          alert(data.message)
        }
        console.log(JSON.parse(localStorage.getItem("userDetails")))   
    }

    render() {
        const { AreaofInterest,name,email,phonenumber } = this.state;
        console.log(name,email,phonenumber)
      return (
        <form className='max-h-full' onSubmit={this.onSubmitFunction}>
                <h2 className="text-2xl mb-4">Step 1</h2>
                <p className='text-xl mb-4 mt-4'>Enter your Details</p>
                <div>
                    <label className="block mb-2">Name</label>
                    <input
                        value={name}
                        type="text"
                        className="border p-2 mb-4 block w-full"
                        placeholder="Enter your Name"
                        onChange={this.onChangeName}
                    />
                </div>
                <div>
                    <label className="block mb-2">Email</label>
                    <input
                        value={email}
                        type="email"
                        className="border p-2 mb-4 block w-full"
                        placeholder="Enter your email"
                        onChange={this.onChangeEmail}
                    />
                </div>
                <div>
                    <label className="block mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={phonenumber}
                        className="border p-2 mb-4 block w-full"
                        placeholder="+91 9898 987894"
                        onChange={this.onChangePhoneNumber}
                        maxLength="15"
                    />
                </div>
                <div className='mb-4'>
                    <p className="block mb-2">Select the area of interest</p>
                    <div className="relative">
                        <Autocomplete
                           options={this.options}
                           getOptionLabel={(option) => option.value}
                           value={this.options.find(option => option.value === AreaofInterest) || null}
                           onChange={this.getAreaofInterest}
                           renderInput={(params) => (
                               <TextField {...params} label="Type to search..." variant="outlined" />
                           )}
                      />
                    </div>
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
  
  export default UserRegister;