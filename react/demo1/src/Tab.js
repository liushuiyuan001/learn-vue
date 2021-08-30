import React, { Component } from 'react'
import { Tabs, Collapse } from 'antd';
const { Panel } = Collapse;

const { TabPane } = Tabs;

export default class Tab extends Component {
	render() {
		return (
			<div>
				<Collapse defaultActiveKey={['1']}>
					<Panel header="This is panel header 1" key="1">
						<Tabs activeKey={this.props.tab} onChange={this.props.callback}>
							<TabPane tab="Tab 1" key="1">
								Content of Tab Pane 1
							</TabPane>
							<TabPane tab="Tab 2" key="2">
								Content of Tab Pane 2
							</TabPane>
							<TabPane tab="Tab 3" key="3">
								Content of Tab Pane 3
							</TabPane>
						</Tabs>
					</Panel>
				</Collapse>
			</div>
		)
	}
}
