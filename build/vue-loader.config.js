module.exports = (isDev) => {
  return {
    preserveWhitepace: true, //去除模板中文本前后空格
    extractCSS: !isDev,      //css样式从.vue文件中提取出来，如果是异步加载组件则不需要
    // cssModules:{
    //   localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', //方便观察class在哪里定义
    //   camelCase: true,  //把css里横杠命名法转换为驼峰命名，方便在js文件里直接调用。
    // },
    //hotReload:true, 根据环境变量生成//只针对于html模板开关热重载，这个属性无法控制样式的热重载，由vue-style-loader控制
  }
}