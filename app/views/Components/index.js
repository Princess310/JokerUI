import React, {Component} from 'react';
import { indigo, pink } from '../../components/styles/colors';
import FontIcon from '../../components/FontIcon';

export default class Components extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="markdown-body">
				<h5>Components</h5>
				<p>这里将一步一步实现Material提到的组件，再实现一些自己想要的组件(Swiper等)</p>

				<h5>字体图标Font Icon</h5>
				<p>对于图标来说：</p>
				<p>1.可以指定颜色，如果没有指定，则应该用主题调色板颜色。</p>
				<p>2.字体图标的优势就是可以任意放大缩小，所以可以重载其样式</p>
				<p>3.我们会遇到一种场景，一个爱心的Icon按钮，点击以后，爱心被点亮。再次渲染，如果爱心被点亮过，那么它应该属于active状态。这个active状态显示的图标颜色应该和hover color一致。</p>
				<FontIcon className="mdi mdi-motorbike" />
				<FontIcon className="mdi mdi-mouse-off" hoverColor={indigo['500']} />
				<FontIcon className="mdi mdi-mouse" hoverColor={pink['500']} active={true}/>
				<FontIcon className="mdi mdi-mouse-variant" active={true}/>
			</div>
		)
	}
}