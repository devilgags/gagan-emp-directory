import React, { Component } from 'react';

class EmployeeItemComponent extends Component {

handleDelete=()=>{
this.props.handleDelete(this.props.emp._id);
}

handleEditClick=()=>{
    this.props.handleEditClick(this.props.emp._id);
}

    render() {
        return (
            <tr>
                <td  className="row-align-table">
                    {this.props.emp.name}
                </td>
                <td  className="row-align-table">
                    {this.props.emp.email}
                </td>
                <td  className="row-align-table">
                    {this.props.emp.date_of_birth}
                </td>
                <td  className="row-align-table">
                    {this.props.emp.department}
                </td>
                <td  className="row-align-table">
                    {this.props.emp.gender}
                </td>
                <td  className="row-align-table">
                    {this.props.emp.age}
                </td>
                <td>
                    <button type="button" className="btn btn-success btn-sm" onClick={this.handleEditClick}>
                         <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp; Edit
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger btn-sm" onClick={this.handleDelete} >
                         <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>&nbsp; Delete
                    </button>
                </td>



            </tr>
        );
    }
}

export default EmployeeItemComponent;