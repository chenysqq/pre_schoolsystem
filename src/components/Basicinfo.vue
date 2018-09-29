<template>
  <div>
    <el-table border :data="students.slice((currentPage-1)*pagesize,currentPage*pagesize)" :row-class-name="tableRowClassName">
        <el-table-column prop="uuid" label="学号" align="center" fixed="left">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.stuName }}</p>
              <p>身份证: {{ scope.row.idCard }}</p>
              <p>手机: {{ scope.row.cellPhone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.uuid }}</el-tag>
              </div>
            </el-popover>
        </template>
        </el-table-column>
        <el-table-column prop="registeredAddress" label="户口所在地" align="center" width="250px">
        </el-table-column>
        <el-table-column prop="address" label="家庭住址" align="center" width="250px">
        </el-table-column>
        <el-table-column prop="inTime" label="入学时间" align="center">
        </el-table-column>
        <el-table-column prop="status" label="学生状态" align="center">
        </el-table-column>
        <el-table-column prop="operator" label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row),dialogFormVisible = true" type="primary" size="mini">修改</el-button>
            <el-dialog center :close-on-click-modal="false" :modal="false" title="修改学生个人信息" :visible.sync="dialogFormVisible">
            <el-form label-position="left" label-width="100px" size="mini" inline="true" :model="form" class="demo-form-inline">
              <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="姓名" :label-width="formLabeslWidth">
                        <el-input v-model="form.stuName" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="身份证类型" :label-width="formLabelWidth">
                        <el-cascader :options="idCardTypes" v-model="form.idCardType" @change="handleChange">
                        </el-cascader>
                      </el-form-item>
                      <el-form-item label="民族" :label-width="formLabelWidth">
                        <el-cascader
                          :options="nations"
                          v-model="form.nationNo"
                          @change="handleChange">
                        </el-cascader>
                      </el-form-item>
                      <el-form-item label="手机号码"  :label-width="formLabelWidth">
                        <el-input v-model="form.cellPhone" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="宿舍" :label-width="formLabelWidth">
                        <el-cascader
                          :options="dormitorys"
                          v-model="form.dormitoryNo"
                          @change="handleChange" filterable change-on-select>
                        </el-cascader>
                      </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="性别" :label-width="formLabeslWidth">
                          <el-radio v-model="form.stuSex" label="1">男</el-radio>
                          <el-radio v-model="form.stuSex" label="0">女</el-radio>
                        </el-form-item>
                        <el-form-item label="身份证号码" :label-width="formLabeslWidth">
                          <el-input v-model="form.idCard" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="政治面貌" :label-width="formLabelWidth">
                          <el-cascader
                            :options="politicals"
                            v-model="form.politicalNo"
                            @change="handleChange">
                          </el-cascader>
                        </el-form-item>
                        <el-form-item label="班级" :label-width="formLabelWidth">
                          <el-cascader
                            :options="colleges"
                            v-model="form.classNo"
                            @change="handleChange"  filterable change-on-select>
                          </el-cascader>
                        </el-form-item>
                        <el-form-item label="学生状态" :label-width="formLabeslWidth">
                          <el-select v-model="form.status" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </div>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit(),dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
            <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="mini">删除</el-button> -->
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="current_change"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Basicinfo',
  data () {
    return {
      url:'http://localhost:8989/studentModule/init',
      delUrl:'http://localhost:8989/student/delStuById/',
      updUrl:'http://localhost:8989/student/updateStudent',
      total:0,
  		pagesize:10,
  		currentPage:1,
      dialogFormVisible: false,
      dormitorys:[],
      students:[],
      cooleges:[],
      nations:[],
      politicals:[],
      idCardTypes:[],
      form: {
        uuid:'',
        stuName: '',
        idCard: '',
        idCardType:'',
        stuBirth: '',
        cellPhone: '',
        homePhone: '',
        registeredAddress: '',
        address: '',
        stuSex:'',
        politicalNo:'',
        classNo:'',
        dormitoryNo:'',
        inTime:'',
        status:'',
        nationNo:''
      },
      options: [{
        value: '1',
        label: '在读'
      }, {
        value: '2',
        label: '休学'
      }, {
        value: '3',
        label: '退学'
      }, {
        value: '4',
        label: '毕业'
      }, {
        value: '5',
        label: '留级'
      }],
      formLabelWidth: '100px'
    }
  },
  created: function(){
      this.$http.get(this.url,{//跨域请求数据
          jsonpCallback:'callbackFunction'//这里是callback
      }).then(function(res) {//请求成功回调，请求来的数据赋给searchList数组
          //console.log(res.data);
          this.total = res.data.length;
          this.pagesize=10;//每页的数据条数
          this.currentPage=1;//默认开始页面
          this.students=res.data.students;
          this.dormitorys=res.data.dormitorys;
          this.colleges=res.data.colleges;
          this.nations=res.data.nations;
          this.politicals=res.data.politicals;
          this.idCardTypes=res.data.idCardTypes;
      },function(res) {//失败显示状态码
          alert(res.status)
      })
  },
  methods: {
    init:function(){
      this.$http.get(this.url,{//跨域请求数据
          jsonpCallback:'callbackFunction'//这里是callback
      }).then(function(res) {//请求成功回调，请求来的数据赋给searchList数组
          //console.log(res.data);
          this.total = res.data.length;
          this.pagesize=10;//每页的数据条数
          this.currentPage=1;//默认开始页面
          this.students=res.data.students;
          this.dormitorys=res.data.dormitorys;
          this.colleges=res.data.colleges;
          this.nations=res.data.nations;
          this.politicals=res.data.politicals;
          this.idCardTypes=res.data.idCardTypes;
      },function(res) {//失败显示状态码
          alert(res.status)
      })
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    current_change:function(currentPage){
          this.currentPage = currentPage;
    },
    handleClick:function(row){
        this.form.uuid=row.uuid;
        this.form.stuName=row.stuName;
        this.form.idCard=row.idCard;
        this.form.stuBirth=row.stuBirth;
        this.form.cellPhone=row.cellPhone;
        this.form.homePhone=row.homePhone;
        this.form.registeredAddress=row.registeredAddress;
        this.form.address=row.address;
        this.form.stuSex=row.stuSex;
        this.form.politicalNo=[row.politicalNo];
        this.form.classNo=[row.clazzVO.college.uuid,row.clazzVO.uuid];
        this.form.dormitoryNo=[row.dormitoryVO.building.uuid,row.dormitoryVO.uuid];
        this.form.inTime=row.inTime;
        this.form.status=row.status;
        this.form.nationNo=[row.nationNo];
        this.form.idCardType=[row.idCardType];
        this.form.status=row.status;
    },
    onSubmit:function(){
        this.$http.post(this.updUrl,
        {
         uuid:this.form.uuid,
         stuName:this.form.stuName,
         stuSex:this.form.stuSex,
         idCardType:this.form.idCardType[0],
         idCard:this.form.idCard,
         nationNo:this.form.nationNo[0],
         politicalNo:this.form.politicalNo[0],
         cellPhone:this.form.cellPhone,
         classNo:this.form.classNo[1],
         dormitoryNo:this.form.dormitoryNo[1],
         status:this.form.status
        },{emulateJSON:true})
        .then(function(response) {//请求成功回调，请求来的数据赋给searchList数组
          if(response.data==1){
            this.init();
            this.$message({
              message: '恭喜你，修改成功!',
              type: 'success'
            });
          }else{
            this.$message.error('错了哦，修改失败!');
          }
      },function(response) {//失败显示状态码
          this.$message.error('错了哦，修改失败!');
      })
    }
    // deleteRow(index, rows) {
    //   var obj = rows[index];
    //   console.log(obj);
    //   this.$confirm('此操作将删除该学生信息, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //       center: true
    //     }).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       });
    //       this.$http.get(this.delUrl+obj.uuid,{//跨域请求数据
    //           jsonpCallback:'callbackFunction'//这里是callback
    //       }).then(function(res) {//请求成功回调，请求来的数据赋给searchList数组
    //           if(res.data==1){
    //             rows.splice(index, 1);
    //           }
    //       },function(res) {//失败显示状态码
    //           alert(res.status)
    //       });
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });          
    //     });
    //   this.total = this.tableData.length;
    //   this.currentPage = Math.ceil(this.total/this.pagesize);
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
	    background-color: #B3C0D1;
	    color: #333;
	    line-height: 60px;
	  }
	  .el-aside {
	    color: #333;
	  }
	  .el-table .warning-row {
	    background: oldlace;
	  }
	
	  .el-table .success-row {
	    background: #f0f9eb;
	  }
</style>
