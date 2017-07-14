

var webpack = require('webpack');//����Webpackģ�鹩���ǵ��ã�����ֻ��ʹ��ES5�﷨��ʹ��ES6�﷨�ᱨ��
var Remarkable=require('remarkable');
var Alert=require("react-bootstrap/lib/Alert");

//__dirname��node.js�е�һ��ȫ�ֱ�������ָ��ǰִ�нű����ڵ�Ŀ¼
module.exports = {//ע��������exports����export
    devtool:"eval-source-map",//����Source Maps,����ʹ��eval-source-map.�����Ļ���source-map,cheap-module-source-map,cheap-module-eval-source-map
    entry:["webpack/hot/dev-server",__dirname + "/app/main.js"],//Ψһ����ļ�������Java�е�main����
    output: {//���Ŀ¼
        path: __dirname + "/build",//������js�ļ���ŵĵط�
        filename: "bundle.js"//������js�ļ���
    },

    module: {
        //loaders������
        rules: [
            {
                test: /\.(js|jsx)$/,//һ��ƥ��loaders��������ļ�����չ����������ʽ����������ƥ��js��jsx�ļ������룩
                exclude: /node_modules/,//���β���Ҫ������ļ����ļ��У�����ѡ��
                use: 'babel-loader'//loader�����ƣ����룩
            },

            {
                test: /\.css$/,//һ��ƥ��loaders��������ļ�����չ����������ʽ����������ƥ��css�ļ������룩
                exclude: /node_modules/,//���β���Ҫ������ļ����ļ��У�����ѡ��
                use: 'css-loader',//loader�����ƣ����룩
            },

        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()//��ģ���滻���
    ],

    //webpack-dev-derver����
    devServer:{
        contentBase: './build',//Ĭ��webpack-dev-server��Ϊ���ļ����ṩ���ط������������Ϊ����һ��Ŀ¼�µ��ļ��ṩ���ط�������Ӧ������������������Ŀ¼���������õ�"build"Ŀ¼��
        historyApiFallback: true,//�ڿ�����ҳӦ��ʱ�ǳ����ã���������HTML5 history API���������Ϊtrue�����е���ת��ָ��index.html
        inline: true,//����Ϊtrue����Դ�ļ��ı�ʱ���Զ�ˢ��ҳ��
        port: 3000,//����Ĭ�ϼ����˿ڣ����ʡ�ԣ�Ĭ��Ϊ"8080"
    },

};