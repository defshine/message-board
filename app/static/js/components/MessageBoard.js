var React = require("react");
var MessageList = require("./MessageList");
var SearchBar = require("./SearchBar");
var MessageForm = require("./MessageForm");
var Pager =  require("./Pager");

var MessageBoard = React.createClass({
    getInitialState : function(){
        return {
            messages: [],
            page:1,
            pages:1,
            searchValue:''
        }
    },
    submitMessage : function (author, content) {
        $.ajax({
            type:'post',
            url:'/message',
            data:{author:author,content:content}
        }).done(function (data) {

            this.listMessage(1);
        }.bind(this));
    },
    searchHandler : function (searchValue) {
        //There is no guarantee that `this.state` will be immediately updated, so
	    //accessing `this.state` after calling this method may return the old value.
        //so call listMessage in callback
        this.setState({
            searchValue:searchValue
        }, function () {
            this.listMessage(1);
        }.bind(this));
    },
    listMessage : function(page){

        var data = {
            page : page
        };
        var searchValue = this.state.searchValue;
        if(searchValue){
            data.searchValue = searchValue;
        }

        $.ajax({
            type:'get',
            url:'/messages',
            data:data
        }).done(function (resp) {
            if(resp.status == "success"){
                var pager = resp.pager;
                this.setState({
                    messages:pager.messages,
                    page:pager.page,
                    pages:pager.pages
                });
            }
        }.bind(this));
    },
    componentDidMount : function(){
        this.listMessage(1);
    },
    render : function(){
        var pager_props = {
            page : this.state.page,
            pages : this.state.pages,
            listMessage : this.listMessage
        };
        return(
            <div>
                <MessageForm submitMessage={this.submitMessage}/>
                <div className="well">
                    <SearchBar searchHandler={this.searchHandler}/>
                    <MessageList messages = {this.state.messages}/>
                    <Pager {...pager_props}/>
                </div>
            </div>
        )
    }
});

module.exports = MessageBoard;
