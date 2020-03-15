import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

let initState = {
    list: [],
    visible: false,
    obj: {}
}

let reducer = (state = initState, action) => {
    let newArr = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'GET_LIST': 
            newArr.list = action.list
            return newArr
        case 'PUSH_ITEM':
            newArr.list.push(action.item)
            return newArr
        case 'DEL_ITEM':
            newArr.list.splice(action.index, 1)
            return newArr
        case 'VIS_TRUE':
            newArr.visible = true
            newArr.obj = newArr.list[action.index]
            return newArr
        case 'VIS_FALSE':
            newArr.visible = false
            return newArr
        case 'CHANG_VAL':
            let arr = newArr.list.filter(item => {
                // return !item.name.indexOf(action.val)
                return item.name.includes(action.val)
            })
            newArr.list = arr
            console.log(newArr)
            
            return newArr
        default :
            return state
    }
}

let store = createStore(reducer, applyMiddleware(thunk))

export default store