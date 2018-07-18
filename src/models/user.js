import { query as queryUsers, queryCurrent } from '../services/user';
import  { DEFAULT_PAGE_SIZE }  from '../utils/constant'

export default {
  namespace: 'user',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    currentUser: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers,payload);
      const data = {
        list: response.rows,
        pagination: {
          total: response.total,
          pageSize: payload && payload.pageSize ? payload.pageSize : DEFAULT_PAGE_SIZE,
          current: payload && payload.currentPage? parseInt(payload.currentPage, 10) : 1,
        },
      }
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
