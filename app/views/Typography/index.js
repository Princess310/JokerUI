import React, {Component} from 'react';
import { indigo, pink } from '../../components/styles/colors';

export default class Typography extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="markdown-body">
				<h5>样式</h5>

				<p>首先，我们先简单定义这个UI库的样式</p>

				<h5>调色板</h5>
				<p>基于Material的调色板，我们将Primary Color设置为<span style={{'color': indigo['500']}}>Indigo</span>，Second Color设置为<span style={{'color': pink['A200']}}>Pink</span></p>
				<p>考虑到可主题可扩展，所以很有必要创建一套material主题库供选择。</p>

				<h5>图标</h5>
				<p>图标都是用Material Icons</p>

				<h5>图像</h5>
				<p>图像都需要真实、材质性、具有高品质的图像，使用户界面更加美丽又有深度。</p>

				<h5>排版</h5>
				<p>文本内容都采用Roboto字体</p>

				<div className="app-bar">App bar</div>
				<h1>h1</h1>
				<h2>h2</h2>
				<h3>h3</h3>
				<h4>h4</h4>
				<h5>h5</h5>
				<h6>h6</h6>
				<div className="sub-head">Sub head</div>
				<div className="caption">Caption</div>
				<div className="menu">Menu</div>
				<button>Button</button>
			</div>
		)
	}
}