<template>
    <el-header>{{msg}}</el-header>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            msg: 'XXX大学信息管理系统'
        }
    }
}
</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
</style>
