<template>
	<transition name="fadeFood">
		<div class="foods" v-show="showFalg" ref="food">
			<div class="food-content" >
				<div class="images-header">
					<img :src="getfood.image" />
					<div class="back" @click="hideshowFalg">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{getfood.name}}</h1>
					<div class="detail">
						<span class="sell-count">月销{{getfood.sellCount}}份</span>
						<span class="rating">好评率{{getfood.rating}}%</span>
					</div>
					<div class="price">
						<span class="new">￥{{getfood.price}}</span>
						<span class="old" v-show="getfood.oldPrice">￥{{getfood.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapp">
						<Cartcontal :food="getfood"></Cartcontal>
					</div>
					<div class="buy" v-show="!getfood.count || getfood.count===0" @click="addfood">
						加入购物车
					</div>
				</div>	
				<Split></Split>
				<div class="info" v-show="getfood.info">
					<h1 class="title">商品信息</h1>
					<p v-show="getfood.info" class="text">{{getfood.info}}</p>
				</div>
				<Split></Split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingSelect :selectType="selectType" 
						:onlyContent="onlyContent" 
						:desc="desc" 
						:ratings="getfood.ratings"
						@newtSelectType="newtSelectTypes"
						@newOnlyCount="newOnlyCounts"
						>
					</ratingSelect>
					<div class="rating-wrapp">
						<ul v-show="getfood.ratings && getfood.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)"  v-for="rating in getfood.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avater" :src="rating.avatar" width="12" height="12" />
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!getfood.ratings || !getfood.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll'
import Cartcontal from '../cartconcontrol/cartconcontrol'
import Split from '../split/split'
import ratingSelect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'
	const all=2;
export default{
	components:{
		Cartcontal,
		Split,
		ratingSelect
	},
	props:{
		getfood:{
			type:Object
		}
	},
	data(){
		return{
			showFalg:false,
			selectType:all,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽'
			}
		}
	},
	filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
	methods:{
		newtSelectTypes(value){			
			this.selectType=value;
			this.$nextTick(() => {
	           this.scroll.refresh();
	        });
		},
		newOnlyCounts(){
			this.onlyContent=!this.onlyContent;
			this.$nextTick(() => {
           		this.scroll.refresh();
       		});
		},
		show(){
			this.showFalg=true;
			this.selectType=all;
			this.onlyContent=true;
			this.$nextTick(()=>{
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.food, {
	                click: true
	              });
				}else{
					this.scroll.refresh();
				}
			})	         
		},
		hideshowFalg(){
			this.showFalg=false
		},
		addfood(event){
			if(!event._constructed){
				return
			};
			Vue.set(this.getfood,'count',1)
		},
		needShow(type,text){
			 if (this.onlyContent && !text) {
	          return false;
	        }
			if(this.selectType==all){
				return true
			}else{
				return type===this.selectType
			}
		}
	}
}
</script>

<style>
@import "../../common/fonts/style.css";
.foods{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 48px;
	width: 100%;
	background: #FFFFFF;
	z-index: 40;
	transition: all .5s linear; 
}
.fadeFood-transition{
	transform: translateX(0);
}
.fadeFood-enter,.fadeFood-leave-active{
	transform: translateX(100%);
}
.foods .images-header{
	position: relative;
	height: 375px;
	width: 100%;
}
.foods .images-header img{
	width: 100%;
	height: 100%;
}
.foods .images-header .back{
	position: absolute;
	top: 10px;
	left: 0;
}
.foods .images-header .back .icon-arrow_lift{
	font-size: 20px;
	display: block;
	padding: 10px;
	color: white;
}
.foods .content{
	padding: 18px;
	position: relative;
}
.foods .content .title{
	font-size: 14px;
	line-height: 14px;
	margin-bottom: 8px;
	font-weight: 700;
	color: rgb(7,17,27);
}
.foods .content .detail{
	font-size: 0;
	line-height: 10px;
	margin-bottom: 18px;
	height: 10px;
}
.foods .content .detail .sell-count{
	font-size: 10px;
	color: rgb(147,153,159);
	margin-right: 12px;
}
.foods .content .detail .rating{
	font-size: 10px;
	color: rgb(147,153,159);
}
.foods .content .price{
	font-size: 0;
	font-weight: 700;
	line-height: 24px;
}
.foods .content .price .new{
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.foods .content .price .old{
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}
.foods .cartcontrol-wrapp{
	position: absolute;
	right: 12px;
	bottom: 12px;
}
.foods .buy{
	position: absolute;
	right: 18px;
	bottom: 18px;
	height: 24px;
	line-height: 24px;
	border-radius:12px ;
	font-size: 10px;
	padding: 0 12px;
	box-sizing: border-box;
	color: white;
	background: rgb(0,160,220);
	
}
.foods .info{
	padding: 18px;
}
.foods .info .title{
	line-height: 14px;
	margin-bottom: 6px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.foods .info .text{
	font-size: 14px;
	color: rgb(77,85,93);
	line-height: 24px;
	font-weight: 200;
	padding: 0 8px;
}
.foods .rating{
	padding-top: 18px;
}
.foods .rating .title{
	line-height: 18px;
	margin-left: 18px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.foods .rating .rating-wrapp{
	padding: 0 18px;
}
.foods .rating .rating-wrapp .rating-item{
	padding: 16px 0;
	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	position: relative;
}
.foods .rating .rating-wrapp .rating-item .user{
	position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
}
.foods .rating .rating-wrapp .rating-item .user .name{
	display: inline-block;
    margin-right: 6px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.foods .rating .rating-wrapp .rating-item .user .avatar{
	border-radius: 50%
}
.foods .rating .rating-wrapp .rating-item .time{
	margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.foods .rating .rating-wrapp .rating-item .text{
	line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}
.foods .rating .rating-wrapp .rating-item .text .icon-thumb_up,.foods .rating .rating-wrapp .rating-item .text .icon-thumb_down{
	margin-right: 4px;
    line-height: 16px;
    font-size: 12px;
}
.foods .rating .rating-wrapp .rating-item .text .icon-thumb_up{
	color: rgb(0, 160, 220)
}
.foods .rating .rating-wrapp .rating-item .text .icon-thumb_down{
	color: rgb(147, 153, 159)
}
.foods .rating .rating-wrapp .no-rating{
	padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
}
</style>