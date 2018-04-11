<template>
	<div class="seller" ref="Sellers">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<Start :score="seller.score" class="star"></Start>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="favorite" @click="toggleFavorite">
		          <span class="icon-favorite" :class="{'active':favorite}"></span>
		          <span class="text">{{favoriteText}}</span>
		        </div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}分钟</span>
						</div>
					</li>
				</ul>
				
			</div>
			<Split></Split>
			<div class="bulletin">
		        <h1 class="title">公告与活动</h1>
		        <div class="content-wrapper">
		          <p class="content">{{seller.bulletin}}</p>
		        </div>
		        <ul class="supports">
		          <li class="support-item" v-for="item in seller.supports">
		            <span class="icon" :class="classMap[item.type]"></span>
		            <span class="text">{{item.description}}</span>
		          </li>
		        </ul>
		    </div>
			<Split></Split>
			<div class="pics">
		        <h1 class="title">商家实景</h1>
		        <div class="pic-wrapper" ref="picWrapper">
		          <ul class="pic-list" ref="picList">
		            <li class="pic-item" v-for="pic in seller.pics">
		              <img :src="pic" width="120" height="90">
		            </li>
		          </ul>
		        </div>
		    </div>
		    <split></split>
		    <div class="info">
		        <h1 class="title">商家信息</h1>
		        <ul>
		          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
		        </ul>
		    </div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'	
import Start from "../../components/star/star"
import Split from '../../components/split/split'
export default{
	components:{
		Start,
		Split
	},
	data(){
		return{
			classMap:['decrease','discount','special','invoice','guarantee'],
			favorite:false
		}
	},
	props:{
		seller:{
			type:Object
		}
	},
	computed:{
		favoriteText(){
			if(this.favorite){
				return '已收藏'
			}else{
				return '收藏'
			}
		}
	},
	watch:{
		'seller'() {
        this.$nextTick(() => {
          this._initScroll();
           this. _initPics();
        });
      }
	},
	/*DOM渲染好后执行*/
	mounted(){
		//console.log('1')
		this.$nextTick(() => {
	        this._initScroll();
	        this. _initPics();
	      });
	},
	methods:{
		toggleFavorite(){
			if(!event._constructed){
				return
			};
			this.favorite =!this.favorite
		},
		 _initScroll() {
	        if (!this.scroll) {
	          this.scroll = new BScroll(this.$refs.Sellers, {
	            click: true
	          });
	        } else {
	          this.scroll.refresh();
	        }
	    },
	     _initPics() {
	        if (this.seller.pics) {
	          let picWidth = 120;
	          let margin = 6;
	          let width = (picWidth + margin) * this.seller.pics.length - margin;
	          this.$refs.picList.style.width = width + 'px';
	          this.$nextTick(() => {
	            if (!this.picScroll) {
	              this.picScroll = new BScroll(this.$refs.picWrapper, {
	                scrollX: true,
	                eventPassthrough: 'vertical'
	              });
	            } else {
	              this.picScroll.refresh();
	            }
	          });
	        }
	    }
	}
}
</script>

<style>
@import "../../common/fonts/style.css";
.seller{
	position: absolute;
	bottom: 0;
	top: 178px;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.seller .seller-content .overview{
	padding: 18px;
	position: relative;
}
.seller .seller-content .overview .title{
	margin-bottom: 8px;
	line-height: 14px;
	color: rgb(7, 17, 27);
	font-size: 14px;
}
.seller .seller-content .overview .desc{
	padding-bottom: 18px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .overview .desc .star{
	display: inline-block;;
	margin-right: 8px;
	 vertical-align: top;
}
.seller .seller-content .overview .desc .text{
	 display: inline-block;
      margin-right: 12px;
      line-height: 18px;
      vertical-align: top;
      font-size: 10px;
      color: rgb(77, 85, 93);
}
/*收藏*/
.seller .seller-content .overview .favorite{
	position: absolute;
	top: 18px;
	right: 18px;
	width: 50px;
	text-align: center;
}
.seller .seller-content .overview .favorite .icon-favorite{
	display: block;
    margin-bottom: 4px;
    line-height: 24px;
    font-size: 24px;
    color: #d4d6d9;
} 
.seller .seller-content .overview .favorite .active{
	color: rgb(240, 20, 20)
}
.seller .seller-content .overview .favorite .text{
	line-height: 10px;
    font-size: 10px;
    color: rgb(77, 85, 93);
}
/*起送价,商家配送,平均配送时间*/
.seller .seller-content .overview .remark{
	display: flex;
    padding-top: 18px;
}
.seller .seller-content .overview .remark .block{
	flex: 1;
	text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .overview .remark .block:last-child{
	border: none;
}
.seller .seller-content .overview .remark .block h2{
	margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
.seller .seller-content .overview .remark .block .content{
	line-height: 24px;
    font-size: 10px;
    color: rgb(7, 17, 27);
}
.seller .seller-content .overview .remark .block .content .stress{
	font-size: 24px;
}
/*公告与活动*/
.seller .seller-content .bulletin{
	padding: 18px 18px 0 18px
}
.seller .seller-content .bulletin .title{
	margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}
.seller .seller-content .bulletin .content-wrapper{
	padding: 0 12px 16px 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .bulletin .content-wrapper .content{
	line-height: 24px;
    font-size: 12px;
    color: rgb(240, 20, 20);
}
.seller .seller-content .bulletin .supports .support-item{
	padding: 16px 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;
}
.seller .seller-content .bulletin .supports .support-item:last-child{
	border: none;
}
.seller .seller-content .bulletin .supports .support-item .invoice{
	background: url(invoice_4@2x.png);	
}
.seller .seller-content .bulletin .supports .support-item .special{
	background:url(special_4@2x.png)
}
.seller .seller-content .bulletin .supports .support-item .guarantee{
	background: url(guarantee_4@2x.png)
}
.seller .seller-content .bulletin .supports .support-item .discount{
	background:url(discount_4@2x.png)
}
.seller .seller-content .bulletin .supports .support-item .decrease{
	background:url(decrease_4@2x.png)
}
.seller .seller-content .bulletin .supports .support-item .icon{
	display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;   
    background-size: cover;
    background-repeat: no-repeat;
}
.seller .seller-content .bulletin .supports .support-item .text{
	line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}
/*商家实景*/
.seller .seller-content .pics{
	padding: 18px;
}
.seller .seller-content .pics .title{
	margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
}
.seller .seller-content .pics .pic-wrapper{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
}
.seller .seller-content .pics .pic-wrapper .pic-list{
	font-size: 0;
}
.seller .seller-content .pics .pic-wrapper .pic-list .pic-item{
	margin-right: 6px;
	display: inline-block;
	width: 120px;
	height: 90px;
}
.seller .seller-content .pics .pic-wrapper .pic-list .pic-item:last-child{
	margin: 0;
}
/*商家信息*/
.seller .seller-content .info{
	padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
}
.seller .seller-content .info .title{
	padding-bottom: 12px;
    line-height: 14px;
    font-size: 14px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .info  .info-item{
	padding: 16px 12px;
    line-height: 16px;
    font-size: 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller .seller-content .info  .info-item:last-child{
	border: none;
}
</style>