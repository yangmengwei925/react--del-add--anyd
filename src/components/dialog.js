import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Input } from 'antd';
import store from '../store';

export class dialog extends Component {
    render() {
        return (
            <div>
                <App />
            </div>
        )
    }
}



class App extends React.Component {

  showModal = () => {
    store.dispatch({ type: 'VIS_TRUE' })
  };

  handleOk = e => {
    store.dispatch({ type: 'VIS_FALSE' })
  };

  handleCancel = e => {
    store.dispatch({ type: 'VIS_FALSE' })
  };
  render() {
    let { visible } = this.props
    let { obj } = store.getState()
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Input value = { obj.name } onChange = { (ev) => {
            obj.name = ev.target.value
            this.setState({})
        }} placeholder="请输入姓名" />
        <Input value = { obj.age } onChange = { (ev) => {
            obj.age = ev.target.value
            this.setState({})
        }} placeholder="请输入年龄" />
        <Input value = { obj.address } onChange = { (ev) => {
            obj.address = ev.target.value
            this.setState({})
        }} placeholder="请输入地址" />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    let { visible } = state
    return {
        visible
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default dialog
