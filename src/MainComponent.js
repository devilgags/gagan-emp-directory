import React, { Component } from 'react';
import './index.css';
import FormComponent from './FormComponent';
import EmployeeListComponent from './EmployeeListComponent';
import toastr from 'toastr';
import update from 'react-addons-update';
var axios = require('axios');


class MainComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      editable_employee: {
      },
      employee_id: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddEmployee = this.handleAddEmployee.bind(this);
  }

  handleChange = (new_editable_employee) => {
    this.setState({
      editable_employee: new_editable_employee
    });
  }


  handleAddEmployee = (e) => {
    e.preventDefault();
    axios.post('/emp-dir-services/employees', this.state.editable_employee)
      .then(function (data) {
        axios.get('/emp-dir-services/employees')
          .then(function (data) {
            var new_emp = {
              name: "",
              email: "",
              date_of_birth: "",
              age: "",
              department: "",
              gender: ""
            };
            this.setState({
              employees: data.data, editable_employee: new_emp
            });
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
        toastr.remove();
        if (data.data === "Employee with this email id already exists !") {
          toastr.warning(data.data);
        }
        else {
          toastr.success("Employee added successfully");
        }
      }.bind(this))
      .catch(function (err) {
        console.log(err);
        toastr.error("Employee could not be added !!")
      })

  }

  handleDelete = (id) => {
    axios.delete("/emp-dir-services/employees/" + id)
      .then(function (data) {
        this.setState({ editable_employee: {} });
        axios.get('/emp-dir-services/employees')
          .then(function (data) {
            this.setState({ employees: data.data });
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
        toastr.remove();
        toastr.success("Employee deleted successfully !!");
      }.bind(this))
      .catch(function (err) {
        console.log(err);
        toastr.error("Employee could not be deleted !!")
      })
  }

  handleEditClick = (id) => {
    var selectedEmployee = this.state.employees.filter(function (emp) {
      return emp._id === id;
    });
    this.setState({
      editable_employee: selectedEmployee[0],
      employee_id: selectedEmployee[0]._id
    });
  }

  handleEdit = () => {
    axios.put("/emp-dir-services/employees/" + this.state.employee_id, this.state.editable_employee)
      .then(function (data) {
        this.setState({ editable_employee: {} });
        axios.get('/emp-dir-services/employees')
          .then(function (data) {
            var new_emp = {
              name: "",
              email: "",
              date_of_birth: "",
              age: "",
              department: "",
              gender: ""
            };
            this.setState({ employees: data.data, editable_employee: new_emp });
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          })
        toastr.remove();
        toastr.success("Employee updated successfully !!");
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        toastr.error("Employee could not be updated !!");
      })
  }

  handleNameChange = (e) => {
    if (/^[A-Za-z ]+$/.test(e.target.value) === false) {
      toastr.remove();
      toastr.error("Name should only contain alphabets !");
       var temp = update(this.state.editable_employee, { name: { $set:"" } });
      this.setState({ editable_employee: temp });
    }
    else {
      var temp1 = update(this.state.editable_employee, { name: { $set:e.target.value } });
      this.setState({ editable_employee: temp1 });
    }
  }

  handleEmailChange = (e) => {
    var temp = update(this.state.editable_employee, { email: { $set: e.target.value } });
    this.setState({ editable_employee: temp });
  }

  handleDOBChange = (e) => {
    var ageDifMs = Date.now() - Date.parse(e.target.value);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    document.getElementById("myAge").value = age;
    var temp = update(this.state.editable_employee, { date_of_birth: { $set: e.target.value } });
    var temp1 = update(temp, { age: { $set: age } });
    this.setState({ editable_employee: temp1 });
  }

  handleDepartmentChange = (e) => {
    var temp = update(this.state.editable_employee, { department: { $set: e.target.value } });
    this.setState({ editable_employee: temp });
  }

  handleGenderChange = (e) => {
    var temp = update(this.state.editable_employee, { gender: { $set: e.target.value } });
    this.setState({ editable_employee: temp });
  }


  componentDidMount() {
    axios.get('/emp-dir-services/employees')
      .then(function (data) {
        this.setState({ employees: data.data });
      }.bind(this))
      .catch(function (err) {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
        <div className="app-center">
          <div className="app-header">
            <h1>edureka! MEAN Application - Employee Directory App</h1>
          </div>
        </div>
        <FormComponent onSubmit={this.handleAddEmployee}
          handleChange={this.handleChange}
          editable_employee={this.state.editable_employee}
          handleAddEmployee={this.handleAddEmployee}
          handleEditClick={this.handleEditClick}
          handleEdit={this.handleEdit}
          handleNameChange={this.handleNameChange}
          handleEmailChange={this.handleEmailChange}
          handleDOBChange={this.handleDOBChange}
          handleDepartmentChange={this.handleDepartmentChange}
          handleGenderChange={this.handleGenderChange}
          />
        <br />

        <EmployeeListComponent employees={this.state.employees}
          editable_employee={this.state.editable_employee}
          handleDelete={this.handleDelete}
          handleEditClick={this.handleEditClick} />
      </div>
    );
  }
}

export default MainComponent;
