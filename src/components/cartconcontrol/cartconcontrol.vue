<template>
	<div class="cartcountrd">		
			<transition name="move">
				<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="subtract">					
					<span class="icon-remove_circle_outline inner"></span>
				</div>
			</transition>		
		<div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>

<script>
import Vue from 'vue';
export default{
	props:{
		food:{
			type:Object
		}
	},
	methods:{
		addCart(){
			//解决PC端点击一次出现俩次
			if(!event._constructed){
				return
			};
			//添加一个不纯在的属性，要用vue的接口
				
			if(!this.food.count){
				//在this.food，添加count属性，默认值为1
				Vue.set(this.food,'count',1)
			}else{
				this.food.count++
			}
			this.$emit('increment', event.target);
		},
		subtract(){
			if(!event._constructed){
				return
			};
			if(this.food.count){
				this.food.count--
			}
		}
	},
	created(){
		//console.log(this.food)
	}
}
</script>

<style>
@import "../../common/fonts/style.css";
.cartcountrd{
	font-size: 0;
}
.cartcountrd .cart-decrease{
	display: inline-block;	
	padding: 6px;
	transition: all .4s linear;
}
/*动画效果*/
.cartcountrd .move-transition{
	opacity: 1;
	transform: translateX();
}
.cartcountrd .move-enter,.cartcountrd .move-leave-active{
	opacity: 0;
	transform: translateX(24px);
}

.cartcountrd .cart-decrease .inner{	
	display: inline-block;
	font-size: 24px;
	line-height: 24px;
	color: rgb(0,160,220);	
	transition: all .4s linear;
}
.cartcountrd .move-transition .inner{
	transform: rotate(0deg);
}
.cartcountrd .move-enter .inner,.cartcountrd .move-leave-active .inner{
	transform: rotate(180deg);
}
.cartcountrd .cart-count{
	display: inline-block;
	padding-top: 6px;
	font-size: 10px;
	text-align: center;
	vertical-align: top;
	line-height: 24px;
	color: rgb(147,153,159);
	width: 12px;	
}
.cartcountrd .cart-add{
	display: inline-block;
	padding: 6px;
	font-size: 24px;
	line-height: 24px;
	color: rgb(0,160,220);	
}

</style>