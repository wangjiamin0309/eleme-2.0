<template>
	<div>
	<div class="shopcart" >
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapp">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
				<div class="desc">配送费用为{{this.deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pays">
				<div class="pay" :class="payClass" >{{pay}}</div>
			</div>			
		</div>
		<!--小球动画 start-->
		<div class="ball-container">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div class="ball" v-show="ball.show">
						<div class="inners inner-hook"></div>
					</div>
				</transition>					
			</div>				
		</div>
		<!--小球动画 end-->
		<transition name="fold">
			<div class="shopcar-list" v-show="ListShow">
				<div class="list-header">
					<div class="title">购物车</div>
					<div class="empty" @click="empty">清空</div>
				</div>
				<div class="list-content" ref="ListContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapp">
								<Cartcountrd :food="food"></Cartcountrd>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
	<transition name="fades">
		<div class="List-mask" v-show="ListShow" @click="hideList"></div>
	</transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll'	
import Cartcountrd from '../cartconcontrol/cartconcontrol'
export default{
	components:{
		Cartcountrd
	},
	props:{
		selectFoods:{
			type:Array,
			default(){
				return [
					{price:20,count:1}
				]
			}
		},
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:20
		}
	},
	data(){
		return{
			balls:[
				{show:false},
				{show:false},
				{show:false},
				{show:false},
				{show:false}
			],
			dropBalls:[],
			fold:true
		}
	},
	computed:{
		totalPrice(){
			let total=0;
			this.selectFoods.forEach((food)=>{
				total+=food.price*food.count
			})
			return total
		},
		totalCount(){
			let count=0;
			this.selectFoods.forEach((food)=>{
				count+=food.count
			})
			return count
		},
		pay(){
			if(this.totalCount===0){
				return '￥'+this.minPrice+'元起送'
			}else if(this.minPrice>this.totalPrice){
				let diff=this.minPrice-this.totalPrice
				return '还差￥'+diff+'元起送'
			}else{
				return '去结算'
			}
		},
		payClass(){
			if(this.minPrice>this.totalPrice){
				return 'not-enough'
			}else{
				return 'enough'
			}
		},
		ListShow(){
			if(!this.totalCount){
				this.fold=true;
				return false;
			}
			let show =!this.fold;
			if (show) {//如果显示详情页
	          this.$nextTick(() => {//数据变化后，DOM并没有立即生效，而BScroll严重依赖于DOM，所以使用nextTick
	            if (!this.scroll) {//如果实例不存在，新建
	              this.scroll = new BScroll(this.$refs.ListContent, {
	                click: true
	              });
	            } else {//实例存在，直接调用refresh接口
	              this.scroll.refresh();
	            }
	          });
	        }
			return show;
		}
	},
	methods:{
		hideList(){
			this.fold=true
		},
		toggleList(){
			if(!this.totalCount){
				return;
			}
			this.fold = !this.fold;
		},
		pays(){
			if(this.minPrice>this.totalPrice){
				return
			}
			alert('去支付￥'+this.totalPrice)
		},
		empty(){
			this.selectFoods.forEach((food)=>{
				food.count=0
			})
		},
		drop(el) {
			//console.log(el)
	        for (let i = 0; i < this.balls.length; i++) {
	          let ball = this.balls[i];
	          if (!ball.show) {
	            ball.show = true;
	            ball.el = el;
	            this.dropBalls.push(ball);
	            return;
	          }
	        }
	  },
	  beforeDrop(el) {
        let count = this.balls.length;
	        while (count--) {
	          let ball = this.balls[count];
	          if (ball.show) {
	            let rect = ball.el.getBoundingClientRect();
	            let x = rect.left - 32;
	            let y = -(window.innerHeight - rect.top - 22);
	            el.style.display = '';
	            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
	            el.style.transform = `translate3d(0,${y}px,0)`;
	            let inner = el.getElementsByClassName('inner-hook')[0];
	            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
	            inner.style.transform = `translate3d(${x}px,0,0)`;
	          }
	        }
	      },
	      dropping(el, done) {
	        /* eslint-disable no-unused-vars */
	        let rf = el.offsetHeight;
	        this.$nextTick(() => {
	          el.style.webkitTransform = 'translate3d(0,0,0)';
	          el.style.transform = 'translate3d(0,0,0)';
	          let inner = el.getElementsByClassName('inner-hook')[0];
	          inner.style.webkitTransform = 'translate3d(0,0,0)';
	          inner.style.transform = 'translate3d(0,0,0)';
	          el.addEventListener('transitionend', done);
	        });
	      },
	      afterDrop(el) {
	        let ball = this.dropBalls.shift();
	        if (ball) {
	          ball.show = false;
	          el.style.display = 'none';
	        }
	      }
		
	}
}
</script>

<style>
@import "../../common/fonts/style.css";
.shopcart{
	position: fixed;
	width: 100%;
	height:48px;
	left: 0;
	bottom: 0;
	background: #141d27;
	z-index: 50;
}
.shopcart .content{
	display: flex;
	
}
.shopcart .content .content-left{
	flex: 1;
}
.shopcart .content .content-left .logo-wrapp{
	width: 56px;
	height: 56px;
	border-radius: 50%;
	background:#141d27 ;
	position: relative;
	top: -12px;
	margin: 0 12px;
	padding: 6px;
	box-sizing: border-box;
	display: inline-block;
}
.shopcart .content .content-left .logo-wrapp .logo{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background:#2b343c ;
	text-align: center;
}
/*高亮显示蓝色背景*/
.shopcart .content .content-left .logo-wrapp .highlight{
	background: rgb(0,160,220);
}
.shopcart .content .content-left .logo-wrapp .num{
	position: absolute;
	top: 0;
	right: 0;
	width: 24px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color: white;
	background: rgb(240,20,20);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.shopcart .content .content-left .logo-wrapp .logo .icon-shopping_cart{
	font-size: 24px;
	color: #80858a;
	line-height: 44px;
}
/*高亮显示白色图标*/
.shopcart .content .content-left .logo-wrapp .logo .highlight{
	color: #FFFFFF;
}
.shopcart .content .content-left .price{
	display: inline-block;
	margin-top: 12px;
	border-right: 1px solid rgba(255,255,255,0.1);
	font-size:16px ;
	font-weight: 700;
	line-height:24px ;
	color: rgba(255,255,255,0.4);
	vertical-align: top;
	padding-right: 12px;
}
/*高亮显示白色价格*/
.shopcart .content .content-left .highlight{
	color: #FFFFFF;	
}
.shopcart .content .content-left .desc{
	line-height: 24px;	
	vertical-align: top;
	display: inline-block;
	margin:12px 0 0 12px;
	font-size: 10px;
	color: rgba(255,255,255,0.4);
}
.shopcart .content .content-right{
	flex: 0 0 105px;
	width: 105px;
}
/*去结算变绿色背景*/
.shopcart .content .content-right .not-enough{
	background: #2b333b;
}
.shopcart .content .content-right .enough{
	background: #00b43c!important;
	color: #FFFFFF!important;
}
.shopcart .content .content-right .pay{
	font-size: 12px;
	color: rgb(255,255,255,0.4);
	font-weight: 700;
	line-height: 48px;
	background: #2b333b;
	text-align: center;
}
/*动画小球得样式*/
.shopcart .ball-container .ball{
	position: fixed;
	left: 32px;
	bottom: 22px;
	z-index: 200;	
	transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
}
.shopcart .inners{
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: rgb(0,160,220);
	transition: all 0.4s linear;
}
/*列表*/
.shopcar-list{
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	width: 100%;
	 transform: translate3d(0, -100%, 0);
	 opacity: 1;
	 transition: all .5s;
}
.fold-enter,.fold-leave-active{
	transform: translate3d(0,0,0);
	opacity: 0;
}
.shopcar-list .list-header{
	height: 40px;
	line-height: 40px;
	padding: 0 18px;
	background: #F3F5F7;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcar-list .list-header .title{
	float: left;
	font-size: 14px;
	font-weight: 200;
	color: rgb(7,17,27);
}
.shopcar-list .list-header .empty{	
	float: right;
	font-size: 12px;
	color: rgb(0,160,220);
}
.shopcar-list .list-content{
	padding:0 18px;
	max-height: 217px;
	background: white;
	overflow: hidden;
}
.shopcar-list .list-content .food{
	position: relative;
	padding: 12px 0;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcar-list .list-content .food .name{
	line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
}
.shopcar-list .list-content .food .price{
	position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
}
.shopcar-list .list-content .food .cartcontrol-wrapp{
	position: absolute;
    right: 9px;
    bottom: 6px;
}
/*模糊背景*/
.List-mask{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 40;
	 background: rgba(7, 17, 27, 0.6);	
	 opacity: 1;
	 transition: all .5s;
	backdrop-filter: blur(10px); 
	   
}

.fades-enter,.fades-leave-active{
	opacity: 0;
	background: rgba(7, 17, 27, 0);
}
</style>