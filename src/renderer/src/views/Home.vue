<template>
  <div class="demo-card">
    <t-card class="info-card" :bordered="false" hover-shadow :style="{ width: '500px' ,height: '150px' }">
      {{ exprArr.join('') }}
      <template>
        <a href="javascript:void(0)" @click="clickHandler">操作</a>
      </template>
    </t-card>
  </div>
    <div class="newdemo-card">
      <t-card class="result-card" :bordered="false" hover-shadow :style="{ width: '500px' ,height: '70px' }">
        {{ result }}
        <template>
        <a href="javascript:void(0)" @click="clickHandler">操作</a>
      </template>
      </t-card>
    </div>
    <!-- 上半部分内容，可以为空 -->
  <!-- 键盘区域 -->
  <div id="keys">
    <t-button size="large" shape ="round" @click="onClick('sin')">sin</t-button>
    <t-button size="large" shape ="round" @click="onClick('cos')">cos</t-button>
    <t-button size="large" shape ="round" @click="onClick('tan')">tan</t-button>
    <t-button size="large" shape ="round" @click="onClick('asin')">sin⁻¹</t-button>
    <t-button size="large" shape ="round" @click="onClick('acos')">cos⁻¹</t-button>
    <t-button size="large" shape ="round" @click="onClick('atan')">tan⁻¹</t-button>
    <t-button size="large" shape ="round" @click="onClick('^2')">x²</t-button>
    <t-button size="large" shape ="round" @click="onClick('^')">^</t-button>
    <t-button size="large" shape ="round" @click="onClick('log')">log</t-button>
    <t-button size="large" shape ="round" @click="onClick('(')">(</t-button>
    <t-button size="large" shape ="round" @click="onClick(')')">)</t-button>
    <t-button size="large" shape ="round" @click="onClick_ac()">清空</t-button>
    <t-button size="large" shape ="round" @click="onClick('sqrt')">√</t-button>
    <t-button size="large" shape ="round" @click="onClick('7')">7</t-button>
    <t-button size="large" shape ="round" @click="onClick('8')">8</t-button>
    <t-button size="large" shape ="round" @click="onClick('9')">9</t-button>
    <t-button size="large" shape ="round" @click="onClick('*0.01')">%</t-button>
    <t-button size="large" shape ="round" @click="onClick_de()">DEL</t-button>
    <t-button size="large" shape ="round" @click="onClick('^(-1)')">x⁻¹</t-button>
    <t-button size="large" shape ="round" @click="onClick('4')">4</t-button>
    <t-button size="large" shape ="round" @click="onClick('5')">5</t-button>
    <t-button size="large" shape ="round" @click="onClick('6')">6</t-button>
    <t-button size="large" shape ="round" @click="onClick('*')">×</t-button>
    <t-button size="large" shape ="round" @click="onClick('/')">/</t-button>
    <div style="text-align: center">水</div>
    <t-button size="large" shape ="round" @click="onClick('1')">1</t-button>
    <t-button size="large" shape ="round" @click="onClick('2')">2</t-button>
    <t-button size="large" shape ="round" @click="onClick('3')">3</t-button>
    <t-button size="large" shape ="round" @click="onClick('+')">+</t-button>
    <t-button size="large" shape ="round" @click="onClick('-')">-</t-button>
    <div style="text-align: center">印</div>
    <t-button size="large" shape ="round" @click="onClick('pi')">π</t-button>
    <t-button size="large" shape ="round" @click="onClick('0')">0</t-button>
    <t-button size="large" shape ="round" @click="onClick('e')">e</t-button>
    <t-button size="large" shape ="round" @click="onClick('.')">.</t-button>
    <t-button size="large" shape ="round" @click="evaluating()">=</t-button>
  </div>
</template>

<script lang="ts" setup>
import { evaluate } from 'mathjs'
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next';

const exprArr = ref<string[]>([])
const result = ref<string>('')
const EPSILON = 1e-12; // 误差阈值

const onClick = (num: string) => {
  if (num === 'e' && exprArr.value[exprArr.value.length - 1] === 'log') {
    return; // 避免连续输入 'log' 后跟 'e'
  }
  exprArr.value.push(num);
  console.log(exprArr.value);
}


const onClick_ac = (): void => {
  exprArr.value = []
  result.value = ''
}


const onClick_de = (): void => {
  exprArr.value.pop()
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
  try {
    const rawResult = evaluate(exprArr.value.join(''))
    const numresult = sanitizeResult(rawResult)
    console.log(numresult)
    exprArr.value = []
    result.value = numresult.toString()
    return numresult
  } catch (e) {
    console.error('你认真的吗？')
    exprArr.value = []
    result.value = '你认真的吗？'
    return NaN
  }
}

const clickHandler = () => {
  MessagePlugin.success('操作');
};
</script>

<style scoped>

.transparent-box {
  height: 10vh;          /* 高度为视口的10% */
}

.container {
  height: 30vh; /* 容器高度为视口的一半 */
}

#keys {
  position: absolute;
  top: 50%; /* 从页面中间开始 */
  display: grid;
  grid-template-columns: repeat(6, 60px);
  row-gap: 20px;
  column-gap: 20px;
  justify-content: center;
  padding: 20px;
}


.demo-card {
  position: absolute;
  bottom: 70%; /* 从页面中部开始 */
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
  font-weight: normal;
  line-height: 1.6;
  color: #333;
  text-align: right;
  overflow: hidden; /* 隐藏超出部分 */
}

.result-card {
  /* 字体样式控制 */
  font-size: 26px;
  font-family: 'Arial', sans-serif;
  font-weight: normal;
  line-height: 1.6;
  color: #333;
  text-align: right;
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
</style>
