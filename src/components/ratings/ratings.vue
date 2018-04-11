<template >
	<div class="navRatings" ref="Ratings">
		<div class="navRatings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapp">
						<span class="title">服务态度</span>
						<Start :score="seller.serviceScore" class="start"></Start>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapp">
						<span class="title">商品评分</span>
						<Start :score="seller.foodScore" class="start"></Start>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapp">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<Split></Split>
			<ratingSelect :selectType="selectType" 
						:onlyContent="onlyContent" 
						:desc="desc" 
						:ratings="ratings"
						@newtSelectType="newtSelectTypes"
						@newOnlyCount="newOnlyCounts"
						>
			</ratingSelect>
			<div class="rating-wrapper">
		        <ul>
		          <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
		            <div class="avatar">
		              <img width="28" height="28" :src="rating.avatar">
		            </div>
		            <div class="content">
		              <h1 class="name">{{rating.username}}</h1>
		              <div class="star-wrapper">
		                <Start :size="24" :score="rating.score"></Start>
		                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
		              </div>
		              <p class="text">{{rating.text}}</p>
		              <div class="recommend" >
		                <span class="icon-thumb_up icon" v-show="rating.rateType===0"></span>
		                 <span class="icon-thumb_down icon" v-show="rating.rateType===1"></span>
		                <span class="item" v-for="item in rating.recommend"  v-show="rating.recommend.length">{{item}}</span>
		              </div>
		              <div class="time">
		               	{{rating.rateTime | formatDate}}
		              </div>
		            </div>
		          </li>
		        </ul>
		     </div>
		</div>		
	</div>
</template>

<script>
import BScroll from 'better-scroll'	
import Start from "../../components/star/star"
import Split from "../split/split"
import ratingSelect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'
	const all=2;

export default{
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		Start,
		Split,
		ratingSelect
	},
	data(){
		return{
			ratings:[],
			selectType:all,
			onlyContent:true,
			desc:{
				all:'全部',
				positive:'满意',
				negative:'不满意'
			}
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
	},
	filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
	created(){
		this.$http.get('/api/ratings')
		.then((res)=>{
			this.ratings=res.body.data
			//console.log(res)
			this.$nextTick(()=>{
	  			this.scroll = new BScroll(this.$refs.Ratings, {
	                click: true
	              });
	  		})	
		},(err)=>{
			console.log(err)
		})
	}
}
</script>

<style>
@import "../../common/fonts/style.css";
/*定义适口的高度*/
.navRatings{
	position: absolute;
	bottom: 0;
	top: 178px;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.navRatings .overview{
	display: flex;
	padding: 18px 0;
}
.navRatings .overview .overview-left{
	flex: 0 0 137px;
	width: 137px;
	border-right: 1px solid rgba(7,17,27,0.2);
	text-align: center;
	padding:  6px 0;
}
.navRatings .overview .overview-left .score{
	margin-bottom: 6px;
	line-height: 28px;
	font-size: 24px;
	color: rgb(255,153,0);
}
.navRatings .overview .overview-left .title{
	line-height: 12px;
	font-size: 12px;
	color: rgb(7,17,27);
	margin-bottom: 8px;
}
.navRatings .overview .overview-left .rank{
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
	margin-bottom: 6px;
}
.navRatings .overview .overview-right{
	flex: 1;
	padding: 6px 0 6px 24px;
}
.navRatings .overview .overview-right .score-wrapp{
	margin-bottom: 8px;
    font-size: 0;
}
.navRatings .overview .overview-right .score-wrapp .title{
    font-size: 12px;
    color: rgb(7,17,27);
    display: inline-block;
}
.navRatings .overview .overview-right .score-wrapp .start{
	display: inline-block;
}
.navRatings .overview .overview-right .score-wrapp .score{
    display: inline-block;
    font-size:12px;
    color: rgb(255,153,0);
    vertical-align: top;
    line-height: 18px;
}
.navRatings .overview .overview-right .delivery-wrapp{
	font-size: 0;
}
.navRatings .overview .overview-right .delivery-wrapp .title{
	line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
}
.navRatings .overview .overview-right .delivery-wrapp .delivery{
	margin-left: 12px;
    font-size: 12px;
    color: rgb(147, 153, 159);
}
.navRatings .rating-wrapper{
	 padding: 0 18px;
}
.navRatings .rating-wrapper .rating-item{
	 display: flex;
	 border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	 padding: 18px 0;
	 
}
.navRatings .rating-wrapper .rating-item .avatar{
	flex: 0 0 28px;
	width: 28px;
	margin-right: 12px;
}
.navRatings .rating-wrapper .rating-item .avatar img{
	border-radius: 50%;
}
.navRatings .rating-wrapper .rating-item .content{
	flex: 1;
	position: relative;
}
.navRatings .rating-wrapper .rating-item .content .name{
	margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(7, 17, 27);
}
.navRatings .rating-wrapper .rating-item .content .star-wrapper{
	margin-bottom: 6px;
    font-size: 0;
}
.navRatings .rating-wrapper .rating-item .content .star-wrapper .star{
	display: inline-block;
    margin-right: 6px;
    vertical-align: top;
}
.navRatings .rating-wrapper .rating-item .content .star-wrapper .delivery{
	display: inline-block;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    vertical-align: top;
    padding-top: 2px;
}
.navRatings .rating-wrapper .rating-item .content .text{
	margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
}
.navRatings .rating-wrapper .rating-item .content .recommend{
	line-height: 16px;
    font-size: 0;
}
.navRatings .rating-wrapper .rating-item .content .recommend .icon{
	display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;   
}
.navRatings .rating-wrapper .rating-item .content .recommend .icon-thumb_up{	
    color: rgb(0, 160, 220)
}
.navRatings .rating-wrapper .rating-item .content .recommend .icon-thumb_down{	
    color: rgb(183, 187, 191)
}
.navRatings .rating-wrapper .rating-item .content .recommend .item{
	padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background: #fff;;
    display: inline-block;;
    margin: 0 8px 4px 0;;
    font-size: 9px;;
}
.navRatings .rating-wrapper .rating-item .content .time{
	position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
</style>