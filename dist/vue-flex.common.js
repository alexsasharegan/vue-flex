"use strict";function concat(){return Array.prototype.concat.apply([],arguments)}function mergeData(){for(var e=arguments,n=__assign({},arguments[0]),t=1;t<arguments.length;t++)for(var r=0,a=keys(arguments[t]);r<a.length;r++){var o=a[r];if(void 0!==n[o])switch(o){case"class":case"style":case"directives":n[o]=concat(n[o],e[t][o]);break;case"staticClass":n[o]&&(n[o]=n[o].trim()+" "),n[o]+=e[t][o].trim();break;case"on":case"nativeOn":for(var l=0,s=keys(arguments[t][o]);l<s.length;l++){var i=s[l];n[o][i]?n[o][i]=concat(e[t][o][i],n[o][i]):n[o][i]=e[t][o][i]}break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":n[o]=__assign({},n[o],e[t][o]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:n[o]=e[t][o]}else n[o]=e[t][o]}return n}function boolPropFactory(){for(var e=arguments,n={},t=0;t<arguments.length;t++)n[e[t]]={type:Boolean,default:!1};return n}var __assign=Object.assign||function(e){for(var n,t=arguments,r=1,a=arguments.length;r<a;r++){n=t[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},keys=Object.keys,SHARED=["start","end","center"],JUSTIFY_CONTENT=SHARED.concat(["between","around"]),ALIGN_ITEMS=SHARED.concat(["baseline","stretch"]),ALIGN_AXES=SHARED.concat(["between","baseline","stretch"]),props=Object.assign(boolPropFactory("inline","column","reverse","noWrap","wrapReverse","grow"),{tag:{type:String,default:"div"},justify:{type:String,default:null,validator:function(e){return-1!==JUSTIFY_CONTENT.indexOf(e)}},align:{type:String,default:null,validator:function(e){return-1!==ALIGN_ITEMS.indexOf(e)}},hAlign:{type:String,default:null,validator:function(e){return-1!==ALIGN_AXES.indexOf(e)}},vAlign:{type:String,default:null,validator:function(e){return-1!==ALIGN_AXES.indexOf(e)}}}),Flex={functional:!0,props:props,render:function(e,n){var t=n.props,r=n.data,a=n.children,o=t.column?"align-items":"justify-content",l=t.column?"justify-content":"align-items";return e(t.tag,mergeData(r,{class:["vf__flex"+(t.inline?"--inline":""),"vf__flex-dir--"+(t.column?"column":"row")+(t.reverse?"-reverse":""),(s={"vf__flex-nowrap":t.noWrap,"vf__grow-children":t.grow},s["vf__flex-wrap"+(t.wrapReverse?"-reverse":"")]=!t.noWrap,s["vf__justify-content-"+t.justify]=t.justify,s["vf__align-items-"+t.align]=t.align,s["vf__"+o+"-"+t.hAlign]=t.hAlign,s["vf__"+l+"-"+t.vAlign]=t.vAlign,s)]}),a);var s}},FlexRow={functional:!0,inheritAttrs:!1,render:function(e,n){n.props;var t=n.data,r=n.children;return e(Flex,mergeData(t,{props:{column:!1}}),r)}},FlexCol={functional:!0,inheritAttrs:!1,render:function(e,n){n.props;var t=n.data,r=n.children;return e(Flex,mergeData(t,{props:{column:!0}}),r)}},components=Object.freeze({Flex:Flex,FlexRow:FlexRow,FlexCol:FlexCol}),index={install:function(e){for(var n in components)Object.hasOwnProperty.call(components,n)&&e.component(n,components[n])}};module.exports=index;
//# sourceMappingURL=vue-flex.common.js.map
