module.exports={
    css:{
        loaderOptions:{
            postcss:{
                options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                    plugins: (loader) => [
                        require('postcss-import')({root: loader.resourcePath}),
                        require('autoprefixer')(), //CSS浏览器兼容
                        require('cssnano')()  //压缩css
                    ]
                }   
            }
        }
    }
}