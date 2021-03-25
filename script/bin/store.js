const path = require('path');
const fileSave = require('file-save');
const { exec } = require('child_process');

async function asyncExec(cmdStr) {
  return new Promise((resolve, reject) => {
    exec(cmdStr, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

process.on('exit', () => {
  console.log('exit');
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const inputName = process.argv[2];

const componentName = inputName.slice(0, 1).toUpperCase() + inputName.slice(1).toLowerCase();

const storePath = path.resolve(__dirname, '../../src/views', componentName, 'store');

/**
 * 写入 config 文件
 */
const storeList = require('../store.config.json');

if (storeList.indexOf(componentName) > -1) {
  console.error(`${componentName} stroe 已存在.`);
  process.exit(1);
}

storeList.push(componentName);
fileSave(path.join(__dirname, '../store.config.json'))
  .write(JSON.stringify(storeList, null, '  '), 'utf8')
  .end('\n');

/**
 * 创建 store 文件结构
 */

const Files = [
  {
    filename: 'reducer.ts',
    content: `import { fromJS } from 'immutable';
import * as actionTypes from './constants';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  data: {},
});

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_STORE1:
      return state.set('data', action.data);
    default:
      return state;
  }
};`,
  },
  {
    filename: 'actions.ts',
    content: `import { fromJS } from 'immutable';
import * as actionTypes from './constants';

export const changeStore1 = (data: any) => ({
  type: actionTypes.CHANGE_STORE1,
  data: fromJS(data),
});
export const getStore1 = () => {
  return (dispatch: any) => {
    const action = changeStore1({});
    dispatch(action);
  };
};`,
  },
  {
    filename: 'constants.ts',
    content: `export const CHANGE_STORE1 = 'change/store1';
export const CHANGE_STORE2 = 'change/store2';`,
  },
  {
    filename: 'index.ts',
    content: `import reducer from './reducer';
import * as actionCreators from './actions';
import * as constants from './constants';

export { reducer, actionCreators, constants };`,
  },
];

Files.forEach(file => {
  fileSave(path.join(storePath, file.filename)).write(file.content, 'utf8').end('\n');
});

/**
 * 引入 store 模块
 */
const rootStorePath = path.resolve(__dirname, '../../src/store/index.ts');

let storeImportText = `import { combineReducers } from 'redux-immutable';`;

storeList.forEach(item => {
  storeImportText += `import { reducer as ${item.toLowerCase()} } from '../views/${item}/store/index';`;
});
storeImportText += `export default combineReducers({
  ${storeList.map(item => item.toLowerCase()).join(',')}
});`;

fileSave(rootStorePath).write(storeImportText, 'utf8').end('\n');

asyncExec('npm run prettier');
