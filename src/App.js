import { Menu, Input, Button } from 'antd';
import { cloneDeep, isEmpty } from 'lodash';
import './App.css';
import { useState } from 'react';
const items = [
  {
    key: '1',
    label: '1',
    children: [
      {
        key: '1-1',
        label: '1-1',
        parent: '0'
      },
      {
        key: '1-2',
        label: '1-2',
        parent: '0'
      }
    ]
  },
  {
    key: '2',
    label: '2',
    children: [
      {
        key: '2-1',
        label: '2-1',
        parent: '1'
      },
      {
        key: '2-2',
        label: '2-2',
        parent: '1'
      }
    ]
  }
]
const findObj = (treeArray, findKey, findValue, childrenKey) => {
  let resultObj = {};
  const childrenKeyTemp = childrenKey || 'children';
  const deepSearch = (tree) => {
    return tree.some((t) => {
      if (t[findKey] === findValue) {
        resultObj = t;
        return true;
      }
      if (!isEmpty(t[childrenKeyTemp])) {
        return deepSearch(t[childrenKeyTemp]);
      }
      return false;
    });
  };

  deepSearch(treeArray);

  return resultObj;
};

function App() {
  const [selectKey, setSelectKey] = useState('1-1')
  const [inputValue, setInputValue] = useState(selectKey)
  const [menuItems, setMenuItems] = useState(items)
  const onClick = (e) => {
    let findItem = findObj(menuItems, 'key', e.key)
    console.log(e)
    setSelectKey(e.key)
    setInputValue(findItem.label)
  }
  const save = () => {
    let data = cloneDeep(menuItems);
    let findItem = findObj(data, 'key', selectKey)
    let findIndex = data[findItem.parent].children.findIndex((i) => i.key === findItem.key)
    data[findItem.parent].children[findIndex].label = inputValue
    setMenuItems(data)
  }
  console.log(menuItems)
  return (
    <div className="box">
      <div className='menu'>
        <Menu
          onClick={onClick}
          style={{ width: 260 }}
          defaultSelectedKeys={selectKey}
          defaultOpenKeys={["1", "2"]}
          mode="inline"
          items={menuItems}
        />
      </div>
      <div className='inputArea'>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Button onClick={save}>保存</Button>
      </div>
    </div>
  );
}

export default App;
