// 获取dom
const imgContainer = document.querySelector('.img-container');
const imgBox = document.querySelector('.img-box');
const block = document.querySelector('.block');
const empty = document.querySelector('.empty');
const sliderBtn = document.querySelector('.slider-btn');
const sliderText = document.querySelector('.slider-text');
const refresh = document.querySelector('.refresh');
const title = document.querySelector('.title');

const mouseDownEvent = e => {
    // 鼠标按下，获取鼠标位置  相对视口
    const startX = e.clientX;
    const blockWidth = block.offsetWidth;
    const sliderWidth = sliderBtn.offsetWidth;
    const imgBoxWidth = imgBox.offsetWidth;

    function moveEvent(e) {
        e.preventDefault();
        // 移动的时候  让文字消失
        sliderText.style.color = '#ccc';
        // 最大的值
        const blockMaxX = imgBoxWidth - blockWidth;
        const btnMaxX = imgBoxWidth - sliderWidth;
        // 鼠标移动，获取鼠标位置
        const moveX = e.clientX - startX;
        sliderBtn.style.left = moveX + 'px';
        // 设置块的位置
        block.style.left = moveX + 'px';
        // 判断边界条件
        if (moveX < 0) {
            sliderBtn.style.left = 0 + 'px';
            block.style.left = 0 + 'px';
        }
        if (moveX > blockMaxX) {
            block.style.left = blockMaxX + 'px';
        }
        if (moveX > btnMaxX) {
            sliderBtn.style.left = btnMaxX + 'px';
        }
    }

    function moveUpEvent(e) {
        e.preventDefault();

        // 鼠标抬起  若校验成功  则  距离小于两像素
        const blockX = block.offsetLeft;
        const emptyX = empty.offsetLeft;
        if (Math.abs(blockX - emptyX) < 2) {
            // 1. 设置成功的样式
            title.innerText = '验证成功';
            title.style.color = '#4caf50';
        } else {
            // 失败
            title.innerText = '验证失败';
            title.style.color = 'red';
            setTimeout(() => {
                init();
            }, 800);
        }

        // 鼠标抬起，取消事件
        document.removeEventListener('mousemove', moveEvent);
        document.removeEventListener('mouseup', moveUpEvent);
    }

    // 监听移动
    document.addEventListener('mousemove', moveEvent)
    // 监听鼠标抬起
    document.addEventListener('mouseup', moveUpEvent)
}


function init() {
    // 初始化样式和随机背景图
    title.innerText = '请进行滑动验证操作';
    title.style.color = '#000';

    const randomNum = Math.floor(Math.random() * 4) + 1;
    imgBox.style.backgroundImage = `url("./img${randomNum}.png")`;


    // 重新初始化位置

    /**
     * 空白块位置生成
     * 1. 在右半部分随机生成位置  就需要一个range
     * 
     */
    const maxXValue = imgBox.offsetWidth / 2 - block.offsetWidth;
    const emptyX = Math.floor(Math.random() * maxXValue) + imgBox.offsetWidth / 2;
    const maxYValue = imgBox.offsetHeight - block.offsetHeight;
    const emptyY = Math.floor(Math.random() * maxYValue);
    console.log(emptyX, emptyY);

    empty.style.left = emptyX + 'px';
    empty.style.top = emptyY + 'px';

    /**
     * 拖动块位置生成并且设置背景
     */
    block.style.left = 0 + 'px';
    block.style.top = emptyY + 'px';
    block.style.backgroundImage = imgBox.style.backgroundImage;
    block.style.backgroundPosition = `-${emptyX}px -${emptyY}px`;
    block.style.backgroundSize = `${imgBox.offsetWidth}px ${imgBox.offsetHeight}px `;
    block.style.backgroundRepeat = 'no-repeat';

    // btn 位置
    sliderBtn.style.left = 0 + 'px';
}
init();


refresh.addEventListener('click', () => {


    // 刷新动作最后做

    init();
});


sliderBtn.addEventListener('mousedown', mouseDownEvent)




