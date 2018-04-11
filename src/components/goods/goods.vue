<template>
	<div>
	<div class="goods">
		<div class="menu-wrapp" ref="menuWrapper">
			<ul>
				<li class="menu-item" v-for="(item,index) in goods" @click="ListMenu(index,$event)":class="{'currt':currenIndex===index}">
					<span class="text">
						<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapp" ref="foodsWrapper" >
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook" >
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="getselectedFood(food,$event)">
							<div class="icon">
								<img :src="food.icon" width="57" height="57"/>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span class="pinglv">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="new">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontal-wrapp">
									<Cartcontal :food="food" @increment="incrementTotal"></Cartcontal>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<ShopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods" ref="shopCart"></ShopCart>
	</div>
	<food :getfood="selectedFoods" ref="food"></food>
	</div>
</template>

<script>
import food from '../food/food'
import BScroll from 'better-scroll'
import ShopCart from '../shopcart/shopcart'
import Cartcontal from '../cartconcontrol/cartconcontrol'
export default{
	components:{
		ShopCart,
		Cartcontal,
		food
	},
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			goods:[],
			ListHeight:[],
			scrollY:0,
			selectedFoods:{},
			classMap:['decrease','discount','special','invoice','guarantee']
		}
	},
	computed:{
		currenIndex(){
			for(let i=0;i<this.ListHeight.length;i++){
				//获取区间的范围
				let height1=this.ListHeight[i];
				let height2=this.ListHeight[i+1];
				//判断是否落在区间内 （i遍历到最后一个时，height2将找不到）
				if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
					return i;
				}
			}
			//如果ListHeight什么都没有返回0
			return 0
		},
		selectFoods(){
			let foods=[];
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
	methods:{
		_initScroll(){
			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
				click:true
			})
          	this.foosScroll = new BScroll(this.$refs.foodsWrapper,{
          		probeType:3,
            	click:true
          	});
          	//监听事件，传入的参数为pos（pos为位置）
            this.foosScroll.on('scroll',(pos)=>{
            	this.scrollY=Math.abs(Math.round(pos.y));
            })
		},
		//用Array记录每个区间的高度
		_jisuanheight(){
			//获取每个class为'food-list-hook'的li（也就是区间的高度）
			let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			let height=0;
			this.ListHeight.push(height);
			//循环有几个区间
			for(let i=0;i<foodList.length;i++){
				let item=foodList[i];
				//获取每个区间的高度
				height+=item.clientHeight;
				//将获取到的高度添加到ListHeight这数组里
				this.ListHeight.push(height);
			}
		},
		ListMenu(index,event){
			//切换到pc点击会派发俩次点击事件
			//event._constructed自己默认派发的事件为true，pc兼容就return掉
			if(!event._constructed){
				return
			}
			//console.log(index)
			//选择右侧相应的位置      通过index值来对应需要滚动到的接点
			let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			let el=foodList[index]
			this.foosScroll.scrollToElement(el,300)
		},
		incrementTotal(target) {
	        this.$refs.shopCart.drop(target);
	     },
	     //获取点击得食物
	    getselectedFood(food,value){
	    	if(!event._constructed){
				return
			}
	    	this.selectedFoods=food
	   		// console.log(this.selectedFoods)
	    	this.$refs.food.show()
	    }
	},
	created(){
		this.$http.get('/api/goods')
		.then((res)=>{
			//console.log(res)
			this.goods=res.body.data;
			this.$nextTick(()=>{
	  			this._initScroll();
	  			this._jisuanheight();
	  		})
		},(err)=>{
			console.log(err)
		});
		
	}
}
</script>

<style>
.goods{
	position: absolute;
	top: 179px;
	bottom: 46px;
	width: 100%;
	display: flex;
	overflow: hidden;
}
.goods .menu-wrapp{
	flex: 0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.goods .menu-wrapp .menu-item{
	display: table;/*垂直居中*/
	width: 56px;
	height: 54px;
	line-height: 14px;
	font-size:0 ;
	padding: 0 12px;
}
.goods .menu-wrapp .currt{
	position: relative;
	z-index: 10;
	margin-top: -1px;
	background: #FFFFFF;
	font-weight: 700;
	
}
.goods .menu-wrapp .menu-item .invoice{
	background: url(invoice_3@2x.png);	
}
.goods .menu-wrapp .menu-item .special{
	background:url(special_3@2x.png)
}
.goods .menu-wrapp .menu-item .guarantee{
	background: url(guarantee_3@2x.png)
}
.goods .menu-wrapp .menu-item .discount{
	background:url(discount_3@2x.png)
}
.goods .menu-wrapp .menu-item .decrease{
	background:url(decrease_3@2x.png)
}
.goods .menu-wrapp .menu-item .icon{
	display: inline-block;
	width:12px ;
	height: 12px;
	margin-right: 2px;
	background-size: cover;
	background-repeat: no-repeat;
}
.goods .menu-wrapp .menu-item .text{	
	font-size: 12px;
	display: table-cell;
	width: 56px;
	vertical-align: middle;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.goods .foods-wrapp{
	flex: 1;
}
.goods .foods-wrapp .title{
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	border-left:2px solid #d9dde1;
	font-size: 12px;
	color: rgb(147,153,159);
	background: #f3f5f7;
}
.goods .foods-wrapp .food-item{
	display: flex;
	margin: 18px;
	border-bottom: 1px solid rgb(7,17,27,0.1);
}
.goods .foods-wrapp .food-item:last-child{
	border-bottom:none
}
.goods .foods-wrapp .food-item .icon{
	flex: 0 0 57px;
	margin-right: 10px;
}
.goods .foods-wrapp .food-item .content{
	flex: 1;
	position: relative;
}
.goods .foods-wrapp .food-item .content .name{
	margin: 2px 0 8px 0;
	font-size: 14px;
	line-height:14px ;
	color: rgb(7,17,27);
}
.goods .foods-wrapp .food-item .content .desc{
	margin-bottom: 8px;
	line-height: 14px;
	font-size: 10px;
	color:rgb(147,153,159) ;
}
.goods .foods-wrapp .food-item .content .extra{	
	line-height: 10px;
	font-size: 0px;
	color:rgb(147,153,159) ;
}
.goods .foods-wrapp .food-item .content .extra .count{
	display: inline-block;
	margin-right: 12px;
	font-size: 10px;
}
.goods .foods-wrapp .food-item .content .extra .pinglv{
	font-size: 10px;
}
.goods .foods-wrapp .food-item .content .price{
	font-weight:700 ;
	line-height: 24px;
	font-size: 0;
}
.goods .foods-wrapp .food-item .content .price .new{
	font-size: 14px;
	margin-right: 8px;
	color: rgb(240,20,20);
}
.goods .foods-wrapp .food-item .content .price .old{
	font-size: 10px;
	text-decoration: line-through;
	color: rgb(147,153,159);
}
.goods .foods-wrapp .food-item .content .cartcontal-wrapp{
	position: absolute;
	right: 0;
	bottom: 12px;
}
</style>