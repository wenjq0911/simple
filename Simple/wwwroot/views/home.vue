<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" :class="collapsed?'logo-collapse-width logo-collapsed':'logo-width logo'">
                {{collapsed?'':sysName}}
                <!--<img :src="logo" v-show="collapsed" />-->
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
                         unique-opened router v-show="!collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title">
                                <i :class="item.iconCls"></i>{{item.name}}
                            </template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                    </template>
                </el-menu>
                <!--导航菜单-折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                    <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
                        <template v-if="!item.leaf">
                            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
                            </ul>
                        </template>
                        <template v-else>
                            <li class="el-submenu">
                                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                            </li>
                        </template>
					</li>
				</ul>
			</aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <!--<strong class="title">{{$route.name}}</strong>-->
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
		</el-col>
	</el-row>
</template>

<script>
    export default {
        data() {
            return {
                sysName: 'Simple',
                logo: 'dist/resources/img/logo.png',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: '',
            }
        },
        methods: {
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });

            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }

        }
    }

</script>

<style scoped>
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    }

        .container .header {
            height: 60px;
            line-height: 60px;
            background: #20a0ff;
            color: #fff;
        }

            .container .header .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
            }

                .container .header .userinfo .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
                }

                    .container .header .userinfo .userinfo-inner img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }

            .container .header .logo {
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
            }

                .container .header .logo img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }

                .container .header .logo .txt {
                    color: #fff;
                }

            .container .header .logo-collapsed {
                padding: 0;
                font-size: 22px;
                padding-left: 0px;
                padding-top: 10px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
            }

                .container .header .logo-collapsed img {
                    width: 60px;
                    float: left;
                    margin: 0px;
                }

                .container .header .logo-collapsed .txt {
                    color: #fff;
                }

            .container .header .logo-width {
                width: 230px;
            }

            .container .header .logo-collapse-width {
                width: 60px;
            }

            .container .header .tools {
                padding: 0px 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }

        .container .main {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
        }

            .container .main aside {
                flex: 0 0 230px;
                width: 230px;
            }

                .container .main aside .el-menu {
                    height: 100%;
                }

                .container .main aside .collapsed {
                    width: 60px;
                }

                    .container .main aside .collapsed .item {
                        position: relative;
                    }

                    .container .main aside .collapsed .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

            .container .main .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }

            .container .main .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
            }

            .container .main .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 20px;
            }

                .container .main .content-container .breadcrumb-container .title {
                    width: 200px;
                    float: left;
                    color: #475669;
                }

                .container .main .content-container .breadcrumb-container .breadcrumb-inner {
                    float: left;
                    padding-bottom: 10px;
                }

                .container .main .content-container .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
</style>