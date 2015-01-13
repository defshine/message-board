var React = require("react");

var SearchBar = React.createClass({
    clickHandler: function () {
        var searchContent = this.refs.content.getDOMNode().value.trim();
        this.props.searchHandler(searchContent);
    },
    render: function () {
        return(
            <div className="input-group">
                <input ref="content" type="text" className="form-control" placeholder="Search for..."/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={this.clickHandler}>Go!</button>
                </span>
            </div>
        )
    }
});

module.exports=SearchBar;