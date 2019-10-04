# Bundle
bundle是theworld中实际游戏的逻辑，theworld本身只提供了框架及机制，并不包含任何核心的“玩法”，所有的这一切都是由bundle实现的。可以理解bundle就是其他游戏中mod这一概念。

Bundle本质上是一个文件夹（后期提供npm包机制），其文件夹结构如下
* root
    * areas
        * death-core.js
    * creatures
        * templates
            * rat-template.js
        * creatures
            * rat.js
    * items
        * templates
            * trainning-sword-template.js
        * items
            * trainning-sword.js
    * index.js

## index.js
index里面包含了一些全局相关的注册逻辑，比如为某个area注册areaManager，以及后面的一些扩展。

## areas
一个包含areas的bundle会在其areas文件夹中添加多个js文件（脚本），每个脚本包含内容如下

```Javascript
module.exports = {

}
```

## creatures


## items
