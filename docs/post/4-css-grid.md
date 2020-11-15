# 初识 CSS Grid

> 何建贤 / 2020-11-16

## 关于页面布局

在最开始，网页基本都是通过table、float浮动或者position定位进行布局，那是比较单调的年代。随着技术的发展，单调的布局方式已经满足不了需求。接着就有了flexbox，一个专门为响应式页面而设计的布局模式。Flexbox可以很容易地对元素或内容进行排版，并获各大主流浏览器支持，可以说是目前页面布局的首选。

但是，Flexbox还不算是最好的响应式布局方式，它更多的只适合于一维的页面布局，某些布局还需依赖外围元素，下面的例子会说到。而这次说要讲的`CSS Grid`，将会是最好的响应式布局方式。`栅格系统`相信很多人都知道，但是它的实现方式，基本都是通过上面所提到的布局方式来生成，而CSS Grid作为原生能力，虽同叫栅格，却又大不相同，它可以轻松应对各种复杂的二维页面布局，用法简单，功能强大。

## 先来一个小例子

有了CSS Grid，我们在开发网页时，页面就像是一块带网格的木板，我们可以随意地在板上贴上模块，并且模块位置可以随意调整，不受元素结构影响。下面将用一个小例子来演示一下。

如下图：

<img src='https://user-images.githubusercontent.com/6087438/36086132-65ec807e-1005-11e8-804d-f440ce8338b0.png' width=600>

### a.元素结构

假设我们要做一个这样的响应式布局页面。熟悉flexbox的人，看到pc页面的时候，脑里也应该有个大概的元素结构了，可能如下面这样：

```html
<div id="container">
    <div id="header">header</div>
    <div>
        <div id="main">main</div>
        <div>
            <div id="hot">hot</div>
            <div id="tag">tag</div>
        </div>
    </div> 
    <div id="footer">footer</div>
</div>
```

这个也就是刚上面提到的，Flexbox布局对元素结构是有一定的要求的，而且一般也只是横向或纵向上的排列。而上面的这个元素结构，当要转成mobile这个布局的时候，就明显不适应了（这里不讨论有没有方法可以用flexbox实现）。

而对于CSS Grid，就没有这种顾虑，元素结构如下：

```html
<div id="container">
    <div id="header">header</div>
    <div id="main">main</div>
    <div id="hot">hot</div>
    <div id="tag">tag</div>
    <div id="footer">footer</div>
</div>
```


### b.编写样式

在开始样式前，我们先来分析一下：

1、页面上共有5个模块，分别是 header、main、hot、tag及footer；
2、接着需要一块木板，叫#container；
3、按pc端布局，分成3行2列即可，header和footer分别占一行和两列，而main占两行一列，hot和tag分别是一行一列；
4、当变成mobile的时候，改成5行1列，各模块各占一行一列，然后调整一下位置。

pc端的结构大概如下图：

<img src='//dn-cnode.qbox.me/FkJSuboIgEvGYHKXaYBoc79lqZU1' width=400>

是时候表演真正的技术了😂

第一步，使用`grid-area`对各模块进行定义:

```css
#header {
    grid-area: header;
}
#main {
    grid-area: main;
}
#hot {
    grid-area: hot; 
}
#tag {
    grid-area: tag;
}
#footer {
    grid-area: footer;
}
```

接着，通过`display: grid`生成'木板'，然后设置其列数及比例，再设置其对应的模块位置:

```css
#container {
    display: grid;
    grid-gap: 10px;
    grid-auto-rows: 100px;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: 
        "header header"
        "main hot"
        "main tag"
        "footer footer";
}
```

到这里，其实pc版的布局已经完成了，上面的几个属性，可能比较难理解，其中`grid-template-columns`和`grid-template-areas`的用途正好是上面分析提到的第三点，首先是分成3:1的2列（fr为单位），然后直接使用模块代号，放入对应位置即可，非常的形象及方便。当然这里只是其中一部分的属性，更多的资料可以查阅[CSS_Grid_Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

最后一步，通过媒体查询，设置mobile的布局：

```css
@media (max-width: 500px) {
    #container {
        display: grid;
        grid-gap: 2px;
        grid-auto-rows: 50px;
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "hot"
            "main"
            "tag"
            "footer";
    }
}
```

可以看到，这样的布局调整，只需要修改`grid-template-columns`和`grid-template-areas`即可，变成1列5行，然后调整模块位置，是不是很方便？

[这里是在线demo](http://jsfiddle.net/hejx/19660ko8/1/?utm_source=website&utm_medium=embed&utm_campaign=19660ko8)

## 总结

通过上面的例子，可以看到CSS Grid在布局方面的确是非常强大，必然是将来的页面布局首选。相比于flexbox，CSS Gird可以更加轻松地应对一些非传统或非对称的页面布局，特别是一些复杂的二维布局，而flexbox更适用于单行单列的一维布局，但对内部元素的排位就要比CSS Grid更好。总的来说，同时使用Flexbox和CSS Grid进行页面布局，会是一个很好的选择。

不过目前来说，因为浏览器兼容问题，想用上CSS Gird，估计还需等待一些时日。目前在新版的Firefox和Chrome上已经支持，希望其他浏览器可以随后跟上。

> 本文简短，旨在让读者对CSS Grid有个初步的认识。实际中，CSS Grid还有很多可用的属性和概念，例如：网格线(Grid Line)、网格轨道(Grid Track)等，具体的说明可以查看下方的参考资料。

参考资料：

* [MDN CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
* [CSS Grid布局指南](http://blog.csdn.net/ceshi986745/article/details/51733383)