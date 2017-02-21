import React, {Component} from 'react';
import styles from './styles.less'

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="markdown-body">
				<h5>概述</h5>

				<p>众所周知，Material风格的UI设计，这几年很流行，2017年也是设计师们的爱宠。</p>

				<p>对于Web端来说，已经有很多开源的Materail UI库，效果也很好。但对于我来说，之前还没有花时间做过自己的UI框架，借这个机会想自己花时间造一下轮子</p>

				<p>可以借鉴别人的思路，但一定不要copy代码，要多尝试用自己的想法来实现。因为直接复制UI效果代码的话，用不了很长时间的，也没必要专门来造轮子。</p>

				<p>另外一个原因是因为很多自己想要的特效这些UI库还没实现，所以想用自己的想法来做一下。</p>
			</div>
		)
	}
}