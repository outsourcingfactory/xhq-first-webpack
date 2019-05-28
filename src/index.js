import  'css/index.scss'
import $ from 'jquery';
let a=require('./image/noData@2x.png')
let imgTe="<img  src='"+a+"' />";
$('#app').html(imgTe);
let testObj={a:1,b:2};
let test2={c:3,...testObj};
console.log(process.env.NODE_ENV)
