(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{169:function(e,t,n){e.exports=n(404)},174:function(e,t,n){},178:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},179:function(e,t,n){},205:function(e,t){},207:function(e,t){},239:function(e,t){},240:function(e,t){},309:function(e,t){},404:function(e,t,n){"use strict";n.r(t);var a=n(16),r=n.n(a),o=n(162),i=n.n(o),c=(n(174),n(29)),s=n.n(c),u=n(62),l=n(163),f=n(164),p=n(167),m=n(165),d=n(168),h=n(48),v=(n(178),n(179),n(166)),w=n.n(v),y=n(63),g=n.n(y);window._=g.a;var b=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).state={items:[],searchInput:"",favItems:[],itemsToDisplay:[]},window.findme=Object(h.a)(Object(h.a)(n)),n}return Object(d.a)(t,e),Object(f.a)(t,[{key:"onChangeSearch",value:function(e){this.setState({searchInput:e.target.value}),console.log()}},{key:"getItems",value:function(){var e=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000",{json:!0});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(u.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"onSubmitSearch",value:function(){var e=Object(u.a)(s.a.mark(function e(){var t,n,a=this;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("seach submited"),e.next=3,this.getItems();case 3:t=e.sent,this.setState({items:t}),console.log(t),n=g.a.filter(t,function(e){if(-1!==e.keywords.indexOf(a.state.searchInput))return!0}),this.setState({itemsToDisplay:n});case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getDecodedString",value:function(e){var t=document.createElement("textarea");return t.innerHTML=e,t.value}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onChange:function(t){e.onChangeSearch(t)},style:{display:"flex"}},r.a.createElement("input",{style:{flex:"2"},type:"text"}),r.a.createElement("input",{onClick:function(t){t.preventDefault(),e.onSubmitSearch()},type:"submit"})),g.a.map(this.state.itemsToDisplay,function(t){return r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",{style:{flex:1}},t.keywords),r.a.createElement("div",{style:{flex:1},dangerouslySetInnerHTML:{__html:e.getDecodedString(t.body)}}))}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[169,2,1]]]);
//# sourceMappingURL=main.53a6e11a.chunk.js.map