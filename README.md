# s-pager项目

> 一个自定义的分页组件（A custom paging widget）

### 项目安装

``` bash
npm install
npm run dev
```

# npm安装使用：s-pager

``` bash
npm i s-pager

import sPager from 's-pager'

<s-pager ref="pager" 
	:themecolor="themecolor" 
	:current-page.sync="currentpage" 
	:pagesize="pagesize" 
	:total="total" 
	@current-change="gotopage" 
	@prev-click-change="handleprevchange" 
	@next-click-change="handlenextchange" 
/>
```
### Attributes

|     参数     |       说明       |  类型  |  默认值   |
|:------------:|:----------------:|:------:|:---------:|
|   prevText   | 首页按钮显示文字 | String |  '首页'   |
| prevPageText |  上一页显示文字  | String | '上一页'  |
|   nextText   | 末页按钮显示文字 | String |  '末页'   |
| nextPageText |  下一页显示文字  | String | '下一页'  |
| currentPage  |      当前页      | Number |     1     |
|   pageSize   |   每页显示个数   | Number |    10     |
|    total     |      总个数      | Number |     0     |
|  themeColor  |     主题色值     | String | '#409eff' |

### Events

|     事件名称      |                说明                |  回调参数  |
|:-----------------:|:----------------------------------:|:----------:|
|  current-change   |         用户点击页码后触发         | 当前页码号 |
| prev-click-change | 用户点击上一页按钮改变当前页后触发 | 当前页码号 |
| next-click-change | 用户点击下一页按钮改变当前页后触发 | 当前页码号 |


### 效果图
![s-pager.png](https://github.com/ShiWewe/s-pager/blob/master/src/screenshots/s-pager.png)