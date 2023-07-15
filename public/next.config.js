const withImages = require('next-images');
const withSass = require('@zeit/next-sass');

module.exports = withImages(
withSass()
)


// module.exports = {
// 	webpack: (
// 	  config,options) => {
// 	  // Important: return the modified config

// 		config.module.rules.push(
// 			{
// 				test: /\.(png|jpg|gif)$/i,
// 				use: [
// 				  {
// 					loader: 'url-loader',
// 				  },
// 				],
// 			  }
// 		)
		
// 		console.log(config.module.rules)

// 	  return config
// 	},
//   }