/** @js React.DOM */
'use strict';
// React.initializeTouchEvents(true);

var HelloWorld = React.createClass({
	getInitialState: function() {
		return {message: 'Hello World!!1111'};
	},
	goodbye: function(event) {
		this.setState({message: 'Goodbye World.'});
	},
	render: function() {
		return (
			<h1 onClick={this.goodbye}>{this.state.message}</h1>
		);
	}
});

var otherComponent = React.createClass({

	render: function() { 
		return (
			<span>hello</span>
		);
	}

});

// 来回切换值
var LikeToggle = React.createClass({
	getInitialState: function() {
		return {
			coument: true 
		};
	},
	handlerClick: function(e){
		this.setState({
			coument: !this.state.coument 
		});
	},
    render: function() {
    	var text = this.state.coument ? 'like1' : 'dislike';
        return (
            <div onClick={this.handlerClick}>
            	You {text} to toggle.
            </div>
        );
    }
});

// ajax 获取数据然后渲染
var UserList = React.createClass({
	getInitialState: function() {
		return {
			username: 'chenpeng',
			lastGistUrl: null,
			loading: true
		};
	},
	componentDidMount: function() {
		this.setState({
			loading: false
		})
	},
	handleClick: function (e){
		$.get(this.props.url, function(data) {
			console.log(data);
			var lastGist = data[0];
			if (this.isMounted()) {
				this.setState({
					username: lastGist.owner.id, 
					lastGistUrl: lastGist.html_url
				});
			}
		}.bind(this));
	},
    render: function() {
    	if (this.state.loading) {
    		return <div>Loading</div>
    	}else{
    		return (
    		    <div onClick={this.handleClick}>
    		    	{this.state.username} 
    		    	{this.state.lastGistUrl}
    		    </div>
    		)
    	}
    }
});

React.render(
	<div>
		<HelloWorld />
		<LikeToggle />
		<UserList url="https://api.github.com/users/octocat/gists" />
	</div>,
	document.getElementById('app')
);
