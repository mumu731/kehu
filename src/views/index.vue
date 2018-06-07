<style scoped>
	.kh-nav-left {
		width: auto;
		height: 100vh;
	}
	
	.kh-nav-top {
		width: auto;
		height: 70px;
		background-color: #f8f8f9;
	}
	.kh-nav-top .tt{
		float: right;
		margin-top: 1%;
		margin-right: 2%;
	}
	.kh-nav-nr {
		width: auto;
	}
	.card-man{
		width:250px;
		height: 200px;
		margin-top: 2%;
		margin-left: 5%;
	}
	.card-woman{
		width:250px;
		height: 200px;
		margin-left: 35%;
		margin-top: -200px;
	}
	.card-num{
		width:250px;
		height: 200px;
		margin-left: 65%;
		margin-top: -200px;
	}
	#myChart{
		margin: 0 auto;
		margin-top: 2%;
	}
</style>
<template>
	<Row>
		<Col span="3">
			<div class="kh-nav-left">
				<Menu active-name="1" style="width: 200px;height: 100%;">
						
				    <MenuGroup title="客户管理系统">
			            <router-link to="/" style="color: #999999;"><MenuItem name="1">
		                	<Icon type="ios-speedometer"></Icon>
		                	数据展示
			            </MenuItem></router-link>
			            <router-link to="/shuju" style="color: #999999;"><MenuItem name="2">
		                	<Icon type="plus"></Icon>
		               		添加数据
			            </MenuItem></router-link>
			        </MenuGroup>
			    </Menu>
				
				
				
			</div>
		</Col>
		<Col span="21">
			<div class="kh-nav-top">
				<Avatar class='tt' style="background-color: #87d068" icon="person" />
			</div>
		</Col>
		<Col span="21">
			<div class="kh-nav-nr">
				
				<Card class='card-man'>
					<p slot="title">
						<Icon type="man"></Icon>
						男生
					</p>
					<ul>
						<li style="list-style: none;text-align: center;line-height: 130px;">
							<span ref="mybox" target="_blank">{{khman}}</span>
						</li>
					</ul>
				</Card>
				<Card class='card-woman'>
					<p slot="title">
						<Icon type="woman"></Icon>
						女生
					</p>
					<ul>
						<li style="list-style: none;text-align: center;line-height: 130px;">
							<a href="" target="_blank">{{khwoman}}</a>
						</li>
					</ul>
				</Card>
				<Card class='card-num'>
					<p slot="title">
						<Icon type="pie-graph"></Icon>
						总人数
					</p>
					<ul>
						<li style="list-style: none;text-align: center;line-height: 130px;">
							<a href="" target="_blank">{{zong}}</a>
						</li>
					</ul>
				</Card>
				
				<div id="myChart" :style="{width: '600px', height: '400px'}"></div>
				
			</div>
		</Col>
	</Row>

</template>
<script>
	
	export default {
		data() {
			return {
				zong: '',
				khman: '',
				khwoman: ''
			}
		},
		mounted(){
		    this.drawLine();
		    this.shujus();
		},
  		methods:{
  			shujus(){
  				var self=this;
				axios.get('http://kehu.uv25.com/app/index.php').then(res=>{
				    self.zong = res.data.num.res;
				}).catch(error=>console.log(error));
				
				axios.get('http://kehu.uv25.com/app/man.php').then(res=>{
				    self.khman = res.data.num.nan;
				}).catch(error=>console.log(error));
				
				axios.get('http://kehu.uv25.com/app/woman.php')
				.then(function(res){
				    self.khwoman = res.data.num.nv;
				})
				.catch(function(error){
				    console.log(error);
				});
  			},
	    	drawLine(){
	    		
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = this.$echarts.init(document.getElementById('myChart'));
		        const self = this;  
	    		console.log(this.$refs.mybox.innerText);
		        // 绘制图表
		        myChart.setOption({
		                title : {
					        text: '客户统计',
					        x:'center'
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:['男生','女生']
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            magicType : {
					                show: true, 
					                type: ['pie', 'funnel'],
					                option: {
					                    funnel: {
					                        x: '25%',
					                        width: '50%',
					                        funnelAlign: 'left',
					                        max: 1548
					                    }
					                }
					            },
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    calculable : true,
					    series : [
					        {
					            name:'客户',
					            type:'pie',
					            radius : '55%',
					            center: ['50%', '60%'],
					            data:[
					                {value:77, name:'男生'},
					                {value:22, name:'女生'}
					            ]
					        }
					    ]
		        });
	    	}
  		}
	}
</script>