<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab">
    	<div class="tab-item">
    		<router-link to="/goods">商品</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/ratings">评论</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/seller">商家</router-link>
    	</div>
    	
   </div>
   <keep-alive>
   		<router-view :seller="seller"></router-view>
   </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/header'	
import { urlParse } from './common/js/util'
export default {
	components:{
		Header
	},
	data(){
		return{
			seller:{
				
			}
		}
	},
 	created(){
 		this.$http.get('/api/seller')
 		.then((res)=>{
 			this.seller=res.body.data
 			//console.log(this.seller)
 		},(err)=>{
 			console.log(err)
 		})
 	}
}
</script>

<style>
#app .tab{
	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
#app .tab .tab-item{
	flex: 1;
	text-align: center;
}
#app .tab .tab-item>a{
	display: block;
	font-size: 14px;
	color: rgb(77,85,93);
}
#app .tab .tab-item .router-link-active{
	color: rgb(240, 20, 20);
}
</style>
