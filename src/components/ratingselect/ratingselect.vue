<template>
	<div class="ratingselects">
		<div class="ratingselect">
			<div class="ratingType">
				<span @click="select(2,$event)" class="block positive " :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
				<span @click="select(0,$event)" class="block positive " :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
				<span @click="select(1,$event)" class="block negative " :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
			</div>
			
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const zheng=0;
	const fu=1;
	const all=2;
export default{
	props:{
		ratings:{
			type:Array,
			//数组的对象放回的都是函数
			default(){
				return [];
			}
		},
		selectType:{
			type:Number,
			default:all
		},
		onlyContent:{
			type:Boolean,
			default:false
		},
		desc:{
			type:Object,
			default(){
				return{
					all:'全部',
					positive:'满意',
					negative:'不满意'
				}
			}
		}
	},
	data(){
		return{
			
		}
	},
	computed:{
		positives(){
			return this.ratings.filter((aa)=>{
				return aa.rateType===zheng
			})
			
		},
		negative(){
			return this.ratings.filter((aa)=>{
				return aa.rateType===fu
			})
			
		}
	},
	methods:{
		select(type,event){
			if(!event._constructed){
				return
			};			
			this.$emit('newtSelectType',type);
		},
		toggleContent(event){
			if(!event._constructed){
				return
			};
			
			this.$emit('newOnlyCount');
		}
	}
}
</script>

<style>
@import "../../common/fonts/style.css";
.ratingselect{
	padding: 18px 0;
	margin: 0 18px;
	border-bottom: 2px solid rgb(7,17,27,.01);
	font-size: 0;
}

.ratingselect .block{
	padding: 8px 12px;
	margin-right: 8px;
	display: inline-block;
	border-radius: 1px;
	color: rgb(77,85,93);
	font-size: 12px;
	line-height: 16px;
}
.ratingselect .block.active{
	color: #FFFFFF;
}
.ratingselect .block .count{
	font-size: 8px;
	margin-left: 2px;
	
}
.ratingselect .positive{
	background: rgba(0,160,220,0.2);
}
.ratingselect .positive.active{
	background: rgba(0,160,220);
}
.ratingselect .negative{
	background: rgba(77,85,93,0.2);
}
.ratingselect .negative.active{
	background: rgba(77,85,93);
}
.ratingselects .switch{
	 padding: 12px 18px;
	 height: 24px;
	 line-height: 24px;
	 border-bottom: 1px solid rgba(7,17,27,0.1);
	 color: rgb(147,153,159);
	 font-size: 0;
}
.ratingselects .switch.on .icon-check_circle{
	color: #00c850;
}
.ratingselects .switch .icon-check_circle{
	font-size: 24px;
	vertical-align: top;
	display: inline-block;
	margin-right: 4px;
	color:rgb(147,153,159);
	
}
.ratingselects .switch .text{
	font-size: 12px;
	vertical-align: top;
	display: inline-block;
}
</style>