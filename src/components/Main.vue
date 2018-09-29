<template>
    <el-container>
	    <el-aside width="200px">
            <el-row class="tac">
			    <el-menu router class="el-menu-vertical-demo">
					<template v-for="res in resources">
                        <template v-if="res.sons==null">
                            <el-menu-item v-bind:key="res.uuid" :index="res.resHref">
                                <i :class="res.resIcon"></i><span slot="title">{{res.resName}}</span>
                            </el-menu-item>
                        </template>
                        <template v-else>
                            <el-submenu v-bind:key="res.uuid" :index="res.resHref">
                                <template slot="title">
                                    <i :class="res.resIcon"></i><span>{{res.resName}}</span>
                                </template>
                                <template v-for="son in res.sons">
                                    <el-menu-item v-bind:key="son.uuid" :index="son.resHref">
                                        <template slot="title">
                                            <i :class="son.resIcon"></i><span slot="title">{{son.resName}}</span>
                                        </template>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                    </template>
				</el-menu>
            </el-row>
		</el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'Main',
    data() {  
      return{
        resources: [] ,
        url:'http://localhost:8989/res/getMenu'
      }
    },
	created() {  
      this.$http.get(this.url).then((response) => {
          console.log(response.data);
          this.resources= response.data;
      },(response) => {
			    alert("500")
	    });
    }
}
</script>

<style>
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
</style>
