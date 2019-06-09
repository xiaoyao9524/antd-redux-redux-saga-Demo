import { put, takeEvery } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes';
import axios from 'axios'
import { getSetListAction } from './actionCreators';
// 文档地址：https://github.com/redux-saga/redux-saga

function* initList(action) {
  console.log('initList');
  try {
      const {data} = yield axios.get('/index/recommend.json');
      // const data = await axios.get('/list.json');
      let {list} = data;
      list = list.map(item => item.title);
      console.log(list);
      const action = getSetListAction(list);
      console.log(action);
      yield put(action);
    } catch (err) {
      console.error(err.message);
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    console.log('takeEvery');
    yield takeEvery(GET_INIT_LIST, initList);
}

export default mySaga;