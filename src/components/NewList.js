import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form, Input, Radio } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增数据"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="年龄">
              {getFieldDecorator('age')(<Input type="textarea" />)}
            </Form.Item>
            
            <Form.Item label="地址">
              {getFieldDecorator('address')(<Input type="textarea" />)}
            </Form.Item>
            
          </Form>
        </Modal>
      );
    }
  },
)

class CollectionsPage extends React.Component {
    state = {
      visible: false,
    };
  
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };
  
    handleCreate = () => {
      const { form } = this.formRef.props;
      let { pushItem, list } = this.props
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        

        values.key = list.length + 1
        pushItem(values)
        console.log(values);
        form.resetFields();
        this.setState({ visible: false });
      });
    };
  
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
  
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>
            新增
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }

export class NewList extends Component {
    render() {
        let { pushItem, list } = this.props
        return (
            <div>
                <CollectionsPage list = { list } pushItem = { pushItem } />
            </div>
        )
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
        pushItem(item) {
            dispatch({ type: 'PUSH_ITEM', item })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewList)
