'use strict';

import React from 'react';

import ModalDelete from './common/ModalDelete.jsx';
import ModalUpdate from './common/ModalUpdate.jsx';
import ModalAdd from './common/ModalAdd.jsx';
import Alert from './layout/Alert.jsx';

import _ from 'lodash';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],

            onDelete: null,
            showDeleteModal: false,

            onUpdate: null,
            showUpdateModal: false,
            updateRow: {},

            showAddModal: false,
            onAdd: null,
        };
    }

    closeUpdateModal = () => {
        this.setState({
            showUpdateModal: false,
            onUpdate: null,
            updateRow: {}
        })
    };

    closeDeleteModal = () => {
        this.setState({
            onDelete: null,
            showDeleteModal: false,
        });

    };

    closeAddModal = () => {
        this.setState({
            showAddModal: false,
            onAdd: null
        });
    };

    list(callback) {
        $.get('/list', result => callback(result));
    }

    componentDidMount() {
        this.list(result => this.setState({
            activities: result,
        }));
    }

    handleDelete(_id) {
        return () => {
            let deleteFun = () => {
                $.post('/delete/'+_id,  () => {
                    _.remove(this.state.activities, e => {return e._id == _id});
                    this.setState({
                        activities: this.state.activities,
                    });

                    this.closeDeleteModal();
                });
            };

            this.setState({
                onDelete: deleteFun,
                showDeleteModal: true
            });

            console.log('handleDelete: ');
            console.log(this.state);
        }
    }

    handleUpdate(_id, row) {
        return () => {
            let updateFun = (rowData) => {
                if (rowData && rowData.name && rowData.url) {
                    let activity = _.find(this.state.activities, activity => {
                        return activity._id == _id;
                    });

                    activity.name = rowData.name;
                    activity.url = rowData.url;
                    this.setState({
                        activities: this.state.activities,
                    });
                    $.post('/edit/' + _id, rowData, () => {
                        this.closeUpdateModal();
                    });
                }
            };

            this.setState({
                onUpdate: updateFun,
                showUpdateModal: true,
                updateRow: row
            });

            console.log('handleUpdate: ');
            console.log(this.state);
        }
    }

    handleAdd = () => {
        let addFun = (row) => {
            if (row.name && row.url) {
                $.post('/add', row, (data) => {
                    if (data == 'error') {

                    } else {
                        this.setState({
                            activities: this.state.activities.concat([data])
                        });
                        this.closeAddModal();
                    }
                });
            }
        };

        this.setState({
            onAdd: addFun,
            showAddModal: true,
        });

        console.log('handleAdd: ');
        console.log(this.state);
    };

    render() {
        let activities = this.state.activities;
        let rows = activities.map((activity, index) => {
            return (
                <tr>
                    <td>{activity._id}</td>
                    <td>{activity.name}</td>
                    <td>{activity.url}</td>
                    <td>
                        <button className="btn btn-primary" onClick={this.handleUpdate(activity._id, {name: activity.name, url:activity.url})}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button> &nbsp;&nbsp;
                        <button className="btn btn-danger" onClick={this.handleDelete(activity._id)}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="row">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-success" onClick={this.handleAdd} style={{float:'right'}}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </button>

                <ModalDelete onDelete={this.state.onDelete}
                             closeModal={this.closeDeleteModal}
                             showModal={this.state.showDeleteModal} />

                <ModalAdd    onAdd={this.state.onAdd}
                             closeModal={this.closeAddModal}
                             showModal={this.state.showAddModal}
                             row={{name: "", url:""}} />

                <ModalUpdate onUpdate={this.state.onUpdate}
                             showModal={this.state.showUpdateModal}
                             closeModal={this.closeUpdateModal}
                             row={this.state.updateRow} />
            </div>
        );
    }
}

