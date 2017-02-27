import React, {Component} from 'react';
import { indigo, pink } from '../../components/styles/colors';
import FontIcon from '../../components/FontIcon';
import Paper from '../../components/Paper';
import EnhancedButton from '../../components/internal/EnhancedButton';
import FlatButton from '../../components/FlatButton';
import RaisedButton from '../../components/RaisedButton';
import MyRipple from '../../components/Test/MyRipple';

export default class Components extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="markdown-body">
				<h5>Components</h5>
				<p>这里将一步一步实现Material提到的组件，再实现一些自己想要的组件(Swiper等)</p>

				<h5>字体图标 Font Icon</h5>
				<p>对于图标来说：</p>
				<p>1.可以指定颜色，如果没有指定，则应该用主题调色板颜色。</p>
				<p>2.字体图标的优势就是可以任意放大缩小，所以可以重载其样式</p>
				<p>3.我们会遇到一种场景，一个爱心的Icon按钮，点击以后，爱心被点亮。再次渲染，如果爱心被点亮过，那么它应该属于active状态。这个active状态显示的图标颜色应该和hover color一致。</p>
				<FontIcon className="mdi mdi-motorbike" />
				<FontIcon className="mdi mdi-mouse-off" hoverColor={indigo['500']} />
				<FontIcon className="mdi mdi-mouse" hoverColor={pink['500']} active={true}/>
				<FontIcon className="mdi mdi-mouse-variant" active={true}/>

				<h5>Paper</h5>
				<p>主要用来显示应用层级关系的组件</p>
				<Paper style={{width: 100, height: 100, margin: 20, display: 'inline-block'}}/>
				<Paper style={{width: 100, height: 100, margin: 20, display: 'inline-block'}} zDepth={2}/>
				<Paper style={{width: 100, height: 100, margin: 20, display: 'inline-block'}} zDepth={3}/>
				<Paper style={{width: 100, height: 100, margin: 20, display: 'inline-block'}} zDepth={4}/>
				<Paper style={{width: 100, height: 100, margin: 20, display: 'inline-block'}} zDepth={5}/>

				<h5>按钮 Button</h5>
				<p>按钮又文字和/或图标组成，文字及图标必须能让人轻易地和点击后展示的内容联系起来。</p>
				<p>主要的按钮有三种：</p>
				<ul>
					<li>悬浮相应按钮(Float action button)，点击后会产生墨水扩散效果的圆形按钮</li>
					<li>浮动按钮(Raised button)，常见的方形纸片按钮，点击后会产生水墨扩散效果。</li>
					<li>扁平按钮(Flat button)，点击后产生水墨扩散效果，和浮动按钮的区别是没有浮起的效果。</li>
				</ul>
				<p>所以我们可以先创建一个扁平按钮，然后给它添加浮动效果就成了浮动按钮。</p>
				<EnhancedButton>EnhancedButton</EnhancedButton>

				<h5>Flat Button</h5>
				<FlatButton label='Flat Button' />
				<FlatButton label='Primary Button' primary={true} />
				<FlatButton label='Secondary Button' secondary={true} />
				<FlatButton label='Before Label' labelPosition='before' icon={<FontIcon className="mdi mdi-motorbike" />} primary={true} />
				<FlatButton label='Before Label' labelPosition='after' icon={<FontIcon className="mdi mdi-mouse" style={{color: indigo['200']}} />} secondary={true} />
				<FlatButton label='Disabled Button' disabled={true} />
				<p>这里主要借鉴Material UI的思路，确实不错。我也简单实现一下涟漪效果：</p>

				<MyRipple style={{width: 88, height: 36, marginBottom: 24, lineHeight: '36px'}}>My Ripple</MyRipple>
				<MyRipple />

				<p>这里只画了一个涟漪，但应该清楚了大概原理，就是基于当前元素画一个大于本身高宽的圆，通过过渡伸缩和透明度效果实现。Material UI 则是多个Circle Ripple组件通过组件的装载和卸载实现。</p>

				<h5>Raised Button</h5>
				<p>这里我看Material UI重写的样式和事件，但我想可以复用Flat Button的代码，只是样式和click事件表现有所不同。</p>
				<RaisedButton label='Raised Button' style={{margin: 12, width: '200px'}}/>
				<RaisedButton label='Flat Button' style={{margin: 12, height: '64px'}}/>
				<RaisedButton label='Primary Button' primary={true} style={{margin: 12}} />
				<RaisedButton label='Secondary Button' secondary={true} style={{margin: 12}} />
				<RaisedButton label='Before Label' labelPosition='before' style={{margin: 12}} icon={<FontIcon className="mdi mdi-motorbike" />} primary={true} />
				<RaisedButton label='Before Label' labelPosition='after' style={{margin: 12}} icon={<FontIcon className="mdi mdi-mouse" />} secondary={true} />
				<RaisedButton label='Disabled Button' disabled={true} />
			</div>
		)
	}
}