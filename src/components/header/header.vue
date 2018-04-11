<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar"/>				
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon":class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>									</div>
				
			</div>
			<div class="supports-number" v-if="seller.supports" @click="ShowDetail">
				<span class="number">{{seller.supports.length}}个</span>		
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>		
		<div class="bulletin-wapper" @click="ShowDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<span class="icon-keyboard_arrow_right"></span>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" />
		</div>
		<transition name="fade">
			<div class="detail" v-show="ShowDetails">
				<div class="detail-wrapp clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapp">
							<Star :score="4.5"></Star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="seller-list">
							<li v-for="item in seller.supports" class="seller-list-item">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p>{{seller.bulletin}}</p>
						</div>
					</div>					
				</div>				
				<div class="detail-close">
					<i class="icon-close" @click="CloseDetail"></i> 
				</div>
			</div>
		</transition>
		<div class="detail" v-show="ShowDetails">
			<div class="detail-wrapp clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapp">
						<Star :score="seller.score"></Star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="seller-list">
						<li v-for="item in seller.supports" class="seller-list-item">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p>{{seller.bulletin}}</p>
					</div>
				</div>
				
			</div>
			
			<div class="detail-close">
				<i class="icon-close" @click="CloseDetail"></i> 
			</div>
		</div>
	</div>
</template>

<script >
import Star from '../star/star'
export default{
	components:{
		Star
	},
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			ShowDetails:false
		}
	},
	methods:{
		ShowDetail(){
			this.ShowDetails=true
		},
		CloseDetail(){
			this.ShowDetails=false
		}
	},
	created(){
		this.classMap=['decrease','discount','special','invoice','guarantee']
	}
}
</script>

<style>
@import "../../common/fonts/style.css";
.header{
	background: rgba(7,17,27,0.5);
	color: white;
	position: relative;
	overflow: hidden;
}
.header .content-wrapper{
	padding: 24px 12px 18px 24px;
	font-size: 0px;
	position: relative;
}
.header .content-wrapper .avatar{
	display: inline-block;
	margin-right: 16px;
}
.header .content-wrapper .avatar img{
	border-radius: 2px;
}
.header .content-wrapper .content{
	padding-top: 2px;
	display: inline-block;
	vertical-align: top;
}
.header .content-wrapper .content .title{
	margin: 2px 0 8px 0;
}
.header .content-wrapper .content .title .brand{
	display: inline-block;
	width: 30px;
	height: 18px;
	background: url(brand@2x.png) no-repeat;
	background-size: cover;
}
.header .content-wrapper .content .title .name{
	margin-left: 6px;
	font-size: 16px;
	font-weight: bold;
	line-height: 18px;
	vertical-align: top;
}
.header .content-wrapper .content .description{
	margin-bottom: 10px;
	font-size: 12px;
	font-weight: 200;
	line-height: 12px;
}
.header .content-wrapper .content .supports{
	font-size: 0;
	margin-bottom: 2px;
}
.content-wrapper .content .supports .invoice{
	background: url(invoice_1@2x.png);	
}
.content-wrapper .content .supports .special{
	background:url(special_1@2x.png)
}
.content-wrapper .content .supports .guarantee{
	background: url(guarantee_1@2x.png)
}
.content-wrapper .content .supports .discount{
	background:url(discount_1@2x.png)
}
.content-wrapper .content .supports .decrease{
	background:url(decrease_1@2x.png)
}
.content-wrapper .content .supports .icon{
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 4px;	
	background-repeat: no-repeat;
	background-size: cover;
}
.content-wrapper .content .supports .text{
	font-size: 10px;
	font-weight: 200;
	line-height: 12px;
}
.content-wrapper .supports-number{
	position: absolute;
	right: 12px;
	bottom: 18px;
	padding: 0 8px;
	height: 24px;
	line-height: 24px;
	border-radius: 14px;
	width: 40px;
	background-color: rgba(0,0,0,0.2);
	text-align: center;
}
.content-wrapper .supports-number .number{
	font-size: 10px;
	display: inline-block;
	
	margin-right: 4px;
}
.content-wrapper .supports-number .icon-keyboard_arrow_right{
	font-size: 10px;	
	line-height: 24px;
	display: inline-block;
	padding-top: 2px;
	vertical-align: top;
}
.bulletin-wapper{
	position: relative;
	height: 28px;
	line-height: 28px;
	padding: 0 22px 0 12px;
	background: rgba(7,17,27,0.2);
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;	
}
.bulletin-wapper .bulletin-title{
	display: inline-block;
	width: 22px;
	height: 12px;
	background: url(bulletin@2x.png) no-repeat;
	background-size: cover;	
	margin-right: 4px;	
	margin-top: 8px;	
}
.header .bulletin-wapper .bulletin-text{
	font-size: 10px;
	vertical-align: top;
}
.header .bulletin-wapper .icon-keyboard_arrow_right{	
	position: absolute;
	font-size: 10px;
	position: absolute;
	top: 10px;
	right: 12px;
}
.header .background{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: -1;
	filter: blur(10px);
}
.header .detail{
	position: fixed;
	z-index: 100;
	width: 100%;
	height: 100%;
	overflow: auto;
	background: rgba(7,17,27,0.7);
	top: 0;
	left: 0;
	transition:all .5s; 
	backdrop-filter:blur(10px)
}
.fade-transition{
	opacity: 1;	
	background: rgba(7,17,27,0.7);
}
.fade-enter,.fade-leave-active{
	opacity: 0;
	background: rgba(7,17,27,0);
}
.header .detail .detail-wrapp{
	min-height: 100%;
}
.header .detail .detail-wrapp .detail-main{
	margin-top: 64px;
	padding-bottom: 64px;
}
.header .detail .detail-wrapp .detail-main .name{
	text-align: center;
	font-size: 16px;
	font-weight: 700;
	line-height: 16px;
	color: rgb(255,255,255);
}
.header .detail .detail-wrapp .detail-main .star-wrapp{
	margin-top: 18px;
	padding: 2px 0;
	text-align: center;
}
.header .detail .detail-wrapp .detail-main .title{
	display: flex;
	width: 80%;
	margin: 30px auto 24px auto;
}
.header .detail .detail-wrapp .detail-main .title .line{
	position: relative;
	flex: 1;
	top: -6px;
	border-bottom: 2px solid rgba(255,255,255,.04);
}
.header .detail .detail-wrapp .detail-main .title .text{
	padding:0 12px;
	font-size: 14px;
	font-weight: 700;
}
.header .detail .detail-wrapp .detail-main .seller-list{
	width: 80%;
	margin: 24px auto 28px auto;
}
.header .detail .detail-wrapp .detail-main .seller-list .seller-list-item{
	height: 16px;
	line-height: 16px;
	margin-bottom:12px;
	padding: 0 12px;
	font-size: 0
}
.header .detail .detail-wrapp .detail-main .seller-list .icon{
	display: inline-block;
	width: 16px;
	height: 16px;
	margin-right: 6px;
	background-repeat: no-repeat;
	background-size: cover;
}
.header .detail .seller-list .seller-list-item .invoice{
	background: url(invoice_1@2x.png);	
}
.header .detail .seller-list .seller-list-item .special{
	background:url(special_1@2x.png)
}
.header .detail .seller-list .seller-list-item .guarantee{
	background: url(guarantee_1@2x.png)
}
.header .detail .seller-list .seller-list-item .discount{
	background:url(discount_1@2x.png)
}
.header .detail .seller-list .seller-list-item .decrease{
	background:url(decrease_1@2x.png)
}
.header .detail .detail-wrapp .detail-main .seller-list .text{
	display: inline-block;
	font-size: 12px;
	font-weight: 200;
	color:rgb(255,255,255);	
	vertical-align: top;	
}
.header .detail .bulletin{
	width: 80%;
	margin: 0 auto;
	padding: 0 12px;
}
.header .detail .bulletin p{
	font-size: 12px;
	line-height:24px ;
}
.header .detail .detail-close{
	position: relative;
	width: 32px;
	height: 32px;
	margin: -64px auto 0 auto;
	clear: both;
	font-size: 32px;
}
</style>