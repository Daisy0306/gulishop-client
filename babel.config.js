module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui", //引入element-ui
        "styleLibraryName": "theme-chalk" //引入element-ui样式
      }
    ]
  ]
}