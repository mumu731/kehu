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
	.kh-table {
		border-left: 1px solid #E6E6E6;
		border-top: 1px solid #E6E6E6;
		border-collapse: collapse;
	}
	
	.kh-table th {
		width: 300px;
		height: 60px;
		background-color: #F2F2F2;
		border-right: 1px solid #E6E6E6;
		border-bottom: 1px solid #E6E6E6;
	}
	
	.kh-table td {
		width: 300px;
		height: 60px;
		text-align: center;
		background-color: #F6F6F6;
		border-right: 1px solid #E6E6E6;
		border-bottom: 1px solid #E6E6E6;
	}
	.kt-tj{
		margin-bottom: 5px;
		margin-left: 5px;
		margin-top: 5px;
	}
	
	.black_overlay {
		display: none;
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.8;
		opacity: .80;
		filter: alpha(opacity=80);
	}
	
	.white_content {
		display: none;
		position: absolute;
		top: 10%;
		left: 20%;
		width: 35%;
		height: 70%;
		border: 1px solid #999;
		background-color: white;
		z-index: 1002;
		overflow: auto;
		border-radius: 8px;
	}
	.kh-input{
		width: 300px;
	}
	#move{
		text-align: right; 
		cursor: default; 
		height: 40px;
		margin-right: 8px;
		margin-top: 5px;

	}
</style>
<template>
	<Row>
		<Col span="3">
			<div class="kh-nav-left">
				<Menu active-name="2" style="width: 200px;height: 100%;">
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
				<tooltip class='tt' content="你愁啥！" placement="bottom">
          			<Avatar style="background-color: #87d068" icon="person" />
      			</tooltip>
				
			</div>
		</Col>
		<Col span="21">
			<div class="kh-nav-nr">
				<i-button class="kt-tj" type="primary" @click="modal6 = true"><Icon type="plus"></Icon></i-button>
				
				<table class="kh-table layui-row">
					<tr>
						<th>ID</th>
						<th>姓名</th>
						<th>性别</th>
						<th>城市</th>
						<th>电话</th>
						<th>星级</th>
						<th>编辑</th>
					</tr>
					<tr v-for="item in titles">
						<td v-if="item.id">{{item.id}}</td>
						<td>{{item.name}}</td>
						<td>{{item.sax}}</td>
						<td>{{item.city}}</td>
						<td>{{item.tel}}</td>
						<td>{{item.num}}</td>
						<td>
							<Button type="primary" @click="ts()" shape="circle">编辑</Button>
						    <poptip
						        confirm
						        title="确定删除?"
						        @on-ok="dell(item)"
						        ok-text="确定"
						        cancel-text="取消" 
						        style="text-align: left;">
						        <Button type="error" shape="circle">删除</Button>
						    </poptip>
							
						</td>
					</tr>

				</table>
				
				<div id="MyDiv" class="white_content">
					<i-form :model="formItem" :label-width="80">
				        <form-item label="姓名">
				            <i-input v-model="formItem.name" class='kh-input'></i-input>
				        </form-item>
				        <form-item label="性别">
				            <radio-group v-model="formItem.radio">
				                <radio label="男">男</radio>
				                <radio label="女">女</radio>
				            </radio-group>
				        </form-item>
				        <form-item label="地区">
				           	<al-cascader v-model="formItem.resArr" data-type="name" style='width: 300px;'/>
				        </form-item>
				        <form-item label="电话">
				            <i-input v-model="formItem.tels" class='kh-input'></i-input>
				        </form-item>
				        <form-item label="等级">
				            <Rate v-model="formItem.numid"></Rate>
				        </form-item>
				        
				        <form-item>
				        	<Button type="primary" @click="bb()" shape="circle">提交</Button>
				        </form-item>
				    </i-form>
				</div>
				<modal
			        v-model="modal6"
			        title="添加客户"
			        :loading="loading"
			        @on-ok="asyncOK">
			        <i-form :model="formItem" :label-width="80">
				        <form-item label="姓名">
				            <i-input v-model="formItem.name" class='kh-input'></i-input>
				        </form-item>
				        <form-item label="性别">
				            <radio-group v-model="formItem.radio">
				                <radio label="男">男</radio>
				                <radio label="女">女</radio>
				            </radio-group>
				        </form-item>
				        <form-item label="地区">
				           	<al-cascader v-model="formItem.resArr" data-type="name" level="2" style='width: 300px;'/>
				        </form-item>
				        <form-item label="电话">
				            <i-input v-model="formItem.tels" class='kh-input'></i-input>
				        </form-item>
				        <form-item label="等级">
				            <Rate v-model="formItem.numid"></Rate>
				        </form-item>
				    </i-form>
			    </modal>
				
				
				
			</div>
		</Col>
	</Row>

</template>
<script>

	export default {
		data() {
			return {
				titles: '',
				name: '',
				sax: "",
				city: "",
				tel: '',
				num: '',
				formItem: {
                    name: '',
                    resArr: [],
                    radio: '男',
                    tels: '',
                    numid: 1
               	},
               	modal6: false,
               	loading: true
			}
		},
		mounted: function(){
			var self = this;
		   	$.ajax({
				type: "get",
				url: 'http://kehu.uv25.com/app/index.php',
				dataType: "json",
				success: function(res) {
					self.titles = res.data;
				}
			});
		},
  		methods:{
  			ts: function(){
  				alert("hhhh")
  			},
			dell: function(item){
				self.arrr = item.id;
				$.ajax({
					type: "post",
					url: 'http://kehu.uv25.com/app/del.php',
					data: {
						id:self.arrr
					},
					dataType: "json",
					success: function(res) {

					}
				});
				location.reload();
			},
			asyncOK () {
				var self = this;
				var arrs = self.formItem.resArr;
				self.dizhi = arrs.toString();
				$.ajax({
					type: "post",
					url: 'http://kehu.uv25.com/app/index.php',
					dataType: "json",
					data: {
						name: self.formItem.name,
						sax: self.formItem.radio,
						city: self.dizhi,
						tel: self.formItem.tels,
						num: self.formItem.numid
					},
					success: function(res) {
						
					}
				});
                setTimeout(() => {
                    this.modal6 = false;
                }, 2000);
                location.reload();
            }
  		}
	}
</script>