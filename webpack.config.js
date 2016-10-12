module.exports = {
  entry  : __dirname + '/src/index.js',
  output : {
    path     : __dirname,
    filename : 'dist.js'
  },
  module : {
    loaders: [
      {
        test   : /.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      }
    ]
  }
};
