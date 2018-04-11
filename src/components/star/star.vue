<template>
	<div class="star">
		<span v-for="(item,index) in results" :class="results[index]" class="star-item"></span>
	</div>
</template>

<script>
const length=5;
const class_on='star-on';
const class_half='star-half';
const class_off='star-off';
export default{
	props:{
		score:{
			type:Number
		}
	},
	computed:{
		results(){			
			let results=[];
			let score=Math.floor(this.score*2)/2;
			//取整数
			let zhengshu=Math.floor(score);
			//取半个星星
			let halfnumber=score%1!==0;
			for(var i=0;i<zhengshu;i++){
				results.push(class_on)
			}
			if(halfnumber){
				results.push(class_half)
			}
			while(results.length<length){
				results.push(class_off)
			}
			return results
		}
	}
}
</script>

<style>
.star{font-size: 0;}	
.star .star-on{
	background: url(star24_on@2x.png);
}
.star .star-half{
	background:url(star24_half@2x.png);
}
.star .star-off{
	background: url(star24_off@2x.png);
}
.star .star-item{
	width:15px;
	height: 15px;
	display: inline-block;
	background-repeat:no-repeat;
	margin-right: 16px;
	background-size: cover;
}
.star .star-item:last-child{
	margin-right: 0;
}	
</style>