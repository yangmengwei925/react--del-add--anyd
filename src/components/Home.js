import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Divider, Input, Popconfirm, message, Button } from 'antd';
import Axios from 'axios';
import NewList from './NewList'
import Dialog from './dialog'
import store from '../store'

function confirm(e, index) {
  store.dispatch({ type: 'DEL_ITEM' , index})
  message.success('删除成功')
}

function cancel(e) {
  message.error('已取消');
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <span>
        <a onClick = { () => {
            store.dispatch({ type: 'VIS_TRUE', index })
        }}>编辑</a>
        <Divider type="vertical" />
        {/* <a onClick = { () => {
            store.dispatch({ type: 'DEL_ITEM' , index})
        }}></a> */}
        <Popconfirm
          title="确定要删除么"
          onConfirm={() => {
            confirm(index)
          }}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">删除</a>
        </Popconfirm>
      </span>
    ),
  },
]

export class Home extends Component {
  state = {
    val: ''
  }
  change = (ev) => {
    this.setState({
      val: ev.target.value
    })
    this.props.contrast(this.state.val)
  }
    render() {
        let { list, contrast } = this.props
        let { val } = this.state
        return (
            <div>
                <Input value = { val } onChange={(ev) => {
                  this.change(ev)
                }} placeholder="输入要查找的内容" />
                {/* <Button onClick={ () => {
                  contrast(val)
                }}>点击查找</Button> */}
                <Dialog/>
                <NewList/>
                <Table columns={columns} dataSource={ list } />
            </div>
        )
    }
    componentDidMount() {
        let { getList } = this.props
        getList()
    }
}

const mapStateToProps = (state) => {
    let { list } = state
    return {
        list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList() {
            dispatch((next) => {
                Axios.get('/getList').then(res => {
                    next({ type: 'GET_LIST', list: res.data })
                })
            })
        },
        contrast(val) {
          dispatch({ type: 'CHANG_VAL', val })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
