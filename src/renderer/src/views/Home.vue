<template>
  <div class="demo-card">
    <t-card class="info-card" :bordered="false" hover-shadow :style="{ width: '480px' ,height: '150px' }" @click="expressionclickHandler">
      {{ showExpressions.join('') }}
      {{ tempArr.join('') }}
    </t-card>
  </div>
    <div class="newdemo-card">
      <t-card class="result-card" :bordered="false" :style="{ width: '500px' ,height: '70px' }" @click="resultclickHandler">
        {{ result }}
      </t-card>
    </div>
  <!-- 键盘区域 -->
  <div id="keys">
    <t-button class="button-style" @click="onClick('sin')">sin</t-button>
    <t-button class="button-style" @click="onClick('cos')">cos</t-button>
    <t-button class="button-style" @click="onClick('tan')">tan</t-button>
    <t-button class="button-style" @click="onClick('asin')">sin⁻¹</t-button>
    <t-button class="button-style" @click="onClick('acos')">cos⁻¹</t-button>
    <t-button class="button-style" @click="onClick('atan')">tan⁻¹</t-button>
    <t-button class="button-style" @click="onClick('^2')">x²</t-button>
    <t-button class="button-style" @click="onClick('^')">^</t-button>
    <t-button class="button-style" @click="onClick('log')">log</t-button>
    <t-button class="button-style" @click="onClick('(')">(</t-button>
    <t-button class="button-style" @click="onClick(')')">)</t-button>
    <t-button class="button-style" @click="onClick_ac()">清空</t-button>
    <t-button class="button-style" @click="onClick('sqrt')">√</t-button>
    <t-button class="button-style" @click="onClick('7')">7</t-button>
    <t-button class="button-style" @click="onClick('8')">8</t-button>
    <t-button class="button-style" @click="onClick('9')">9</t-button>
    <t-button class="button-style" @click="onClick('*0.01')">%</t-button>
    <t-button class="button-style" @click="onClick_de()">DEL</t-button>
    <t-button class="button-style" @click="onClick('^(-1)')">x⁻¹</t-button>
    <t-button class="button-style" @click="onClick('4')">4</t-button>
    <t-button class="button-style" @click="onClick('5')">5</t-button>
    <t-button class="button-style" @click="onClick('6')">6</t-button>
    <t-button class="button-style" @click="onClick('*')">×</t-button>
    <t-button class="button-style" @click="onClick('/')">÷</t-button>
    <div style="text-align: center; font-size: 25px;">水</div>
    <t-button class="button-style" @click="onClick('1')">1</t-button>
    <t-button class="button-style" @click="onClick('2')">2</t-button>
    <t-button class="button-style" @click="onClick('3')">3</t-button>
    <t-button class="button-style" @click="onClick('+')">+</t-button>
    <t-button class="button-style" @click="onClick('-')">-</t-button>
    <div style="text-align: center; font-size: 25px;">印</div>
    <t-button class="button-style" @click="onClick('pi')">π</t-button>
    <t-button class="button-style" @click="onClick('0')">0</t-button>
    <t-button class="button-style" @click="onClick('e')">e</t-button>
    <t-button class="button-style" @click="onClick('.')">.</t-button>
    <t-button class="button-style" @click="evaluating()">=</t-button>
  </div>
</template>

<script lang="ts" setup>

import { evaluate } from 'mathjs'
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';


const exprArr = ref<string[]>([])
const showExpressions = ref<string[]>([])
const tempArr = ref<string[]>([])
const result = ref<string>('')
const EPSILON = 1e-12; // 误差阈值


const onClick = (num: string) => {
  tempArr.value = []
  if (num === 'e' && exprArr.value[exprArr.value.length - 1] === 'log') {
    showExpressions.value.push(num)
    return; // 避免连续输入 'log' 后跟 'e'
  }
  exprArr.value.push(num);
  if (num === 'pi') {
    showExpressions.value.push('π');
  } else if (num === 'sqrt') {
    showExpressions.value.push('√');
  } else if (num === '^2') {
    showExpressions.value.push('²');
  } else if (num === '^(-1)') {
    showExpressions.value.push('⁻¹');
  } else if (num === '*0.01') {
    showExpressions.value.push('%');
  } else if (num === '*') {
    showExpressions.value.push('×');
  } else if (num === '/') {
    showExpressions.value.push('÷');
  } else if (num === 'asin') {
    showExpressions.value.push('sin⁻¹');
  } else if (num === 'acos') {
    showExpressions.value.push('cos⁻¹');
  } else if (num === 'atan') {
    showExpressions.value.push('tan⁻¹');
  } else {
    showExpressions.value.push(num);
  }
  console.log(exprArr.value);
}


const onClick_ac = (): void => {
  showExpressions.value = []
  exprArr.value = []
  tempArr.value = []
  result.value = ''
}


const onClick_de = (): void => {
  if (exprArr.value[exprArr.value.length - 1] === 'log'&&showExpressions.value[showExpressions.value.length - 1] === 'e') {
    showExpressions.value.pop()
    return; // 避免连续输入 'log' 后跟 'e'
  }
  exprArr.value.pop()
  showExpressions.value.pop()
  console.log(exprArr.value)
}

const sanitizeResult = (value: number): number => {
  const intPart = Math.round(value);
  const decimalPart = Math.abs(value - intPart);
  if (decimalPart < EPSILON) {
    return intPart; // 小数部分接近0，返回整数部分
  }
  return value; // 否则返回原值
}

const evaluating = (): number => {
  tempArr.value = showExpressions.value
  try {
    const rawResult = evaluate(exprArr.value.join(''))
    const numresult = sanitizeResult(rawResult)
    console.log(numresult)
    exprArr.value = []
    showExpressions.value = []
    result.value = numresult.toString()
    return numresult
  } catch (e) {
    console.error('你认真的吗？')
    exprArr.value = []
    showExpressions.value = []
    result.value = '你认真的吗？'
    return NaN
  }
}

const expressionclickHandler = () => {
  const textToCopy = showExpressions.value.join('')||tempArr.value.join('');
  if (!textToCopy) {
    return;
  }
  navigator.clipboard.writeText(textToCopy);
  MessagePlugin.success('复制成功');
};

const resultclickHandler = () => {
  const textToCopy = result.value;
  if (!textToCopy) {
    return;
  }
  navigator.clipboard.writeText(textToCopy);
  MessagePlugin.success('复制成功');
};

</script>

<style scoped>

#keys {
  position: absolute;
  top: 50%; /* 从页面中间开始（垂直方向） */
  left: 50%; /* 水平方向起点在页面中间 */
  transform: translateX(-50%); /* 往左偏移自身一半，实现水平居中 */
  display: grid;
  grid-template-columns: repeat(6, 70px);
  row-gap: 20px;
  column-gap: 10px;
  justify-content: center;
  padding: 20px;
}


.button-style {
  width: 70px;
  height: 40px;
  font-size: 25px;
  color: #333;
  background-color: #C2C2C2;
  border-color: #333;
}

.button-style:hover {
  background-color: #B4D8FF;
}

.t-button__text {
  font-weight: bolder !important;
}

.demo-card {
  position: absolute;
  bottom: 65%; /* 从页面中部开始 */
  left: 50%; /* 水平中心点 */
  transform: translateX(-50%); /* 向左移动自身宽度的一半 */
  max-height: 30vh; /* 最大高度为视口一半 */
  padding: 16px;
  background-color: transparent;
  word-break: break-all; /* 长文本强制换行 */
}

.newdemo-card {

  padding: 16px;
  background-color: transparent;
  word-break: break-all; /* 长文本强制换行 */
}

.info-card {
  /* 字体样式控制 */
  font-size: 26px;
  font-family: 'Arial', sans-serif;
  font-weight: bold !important;
  line-height: 1.6;
  color: #333;
  text-align: right;
  overflow: hidden; /* 隐藏超出部分 */
  background-color: #B4D8FF ;
}

.result-card {
  /* 字体样式控制 */
  background-color: transparent;
  font-size: 50px;
  font-family: 'Arial', sans-serif;
  font-weight: normal;
  line-height: 1;
  color: #333;
  text-align: right;
  overflow: hidden; /* 隐藏超出部分 */
}

</style>
