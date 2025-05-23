
/**
 * 效果
 * 文字自动向下滚动
 * 循环滚动
 * 
 * 
 * 思路
 * 开启定时器，过一段时间，让ul向上滚动30px
 * 滚动到最下边后，重新从最上边开始滚动
 */
// 把第一个li复制一份，放到ul的最后面

(function () {
    const ul = document.querySelector('ul');

    function cloneLi() {
        let firstLi = document.querySelectorAll('li')[0].cloneNode(true);
        ul.appendChild(firstLi);
    }
    cloneLi();


    const liList = document.querySelectorAll('li');
    const liLength = liList.length;
    let currentIndex = 0;
    let step = liList[0].offsetHeight;
    let duration = 1000;

    function scrollUl() {
        let startPosition = currentIndex * step; // 0  30  60   90
        currentIndex++;// 1 2 3   4   5 
        let endPosition = currentIndex * step; // 30  60  90  120

        let distance = endPosition - startPosition; // 30
        let totalDuration = 500; // 总时长500ms的动画
        let duration = 16.67; // 每帧时间  间隔
        let dis = distance / (totalDuration / duration); // 每帧移动的距离

        let timer = setInterval(() => {
            startPosition += dis;
            if (startPosition >= endPosition) {
                // 每段  在500ms后  startPosition 就要大于等于 endPosition  此时就不能再继续加了
                clearInterval(timer);
                if (currentIndex >= liLength - 1) {
                    // 在最后一段（到我们添加的firstNode）时，动画500ms后，此时要把ul的scrollTop设置为0 
                    // 在最后一段动画结束后，再置0
                    currentIndex = 0;
                    startPosition = 0;
                }
            }
            ul.scrollTop = startPosition;

        }, duration);
    }

    let outTimer = null
    // 开启定时器
    function startScroll() {
        outTimer = setInterval(scrollUl, duration);
    }

    startScroll();


    // 监听滚动事件  调整currentIndex
    let scrollFn = ul.addEventListener('scroll', () => {
        clearInterval(outTimer);
        // 计算当前滚动到第几个li
        let scrollTop = ul.scrollTop;
        currentIndex = Math.floor(scrollTop / step);
        // 重新开始滚动 
        startScroll();
    }, false);


    // 监听页面关闭事件  清空定时器
    window.addEventListener('unload', (event) => {
        clearInterval(outTimer);
        // 清空定时器
        outTimer = null;
        // 清空滚动事件
        ul.removeEventListener('scroll', scrollFn, false);
    }, false);
})()




