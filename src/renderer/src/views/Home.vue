<template>
  <div class="container">
    <!-- 上半部分内容，可以为空 -->
  </div>
  <!-- 键盘区域 -->
  <div id="keys">
    <t-button size="large" @click="onClick('1')">sin</t-button>
    <t-button size="large" @click="onClick('2')">cos</t-button>
    <t-button size="large" @click="onClick('3')">tan</t-button>
    <t-button size="large" @click="onClick('4')">sin⁻¹</t-button>
    <t-button size="large" @click="onClick('5')">cos⁻¹</t-button>
    <t-button size="large" @click="onClick('6')">tan⁻¹</t-button>
    <t-button size="large" @click="onClick('7')">x²</t-button>
    <t-button size="large" @click="onClick('8')">^</t-button>
    <t-button size="large" @click="onClick('9')">lg</t-button>
    <t-button size="large" @click="onClick('0')">ln</t-button>
    <t-button size="large" @click="onClick('1')">(</t-button>
    <t-button size="large" @click="onClick('2')">)</t-button>
    <t-button size="large" @click="onClick('3')">√</t-button>
    <t-button size="large" @click="onClick('4')">7</t-button>
    <t-button size="large" @click="onClick('5')">8</t-button>
    <t-button size="large" @click="onClick('6')">9</t-button>
    <t-button size="large" @click="onClick('7')">%</t-button>
    <t-button size="large" @click="onClick('8')">DEL</t-button>
    <t-button size="large" @click="onClick('9')">x⁻¹</t-button>
    <t-button size="large" @click="onClick('0')">4</t-button>
    <t-button size="large" @click="onClick('1')">5</t-button>
    <t-button size="large" @click="onClick('2')">6</t-button>
    <t-button size="large" @click="onClick('3')">×</t-button>
    <t-button size="large" @click="onClick('4')">÷</t-button>
    <div style="text-align: center">水</div>
    <t-button size="large" @click="onClick('6')">1</t-button>
    <t-button size="large" @click="onClick('7')">2</t-button>
    <t-button size="large" @click="onClick('8')">3</t-button>
    <t-button size="large" @click="onClick('9')">+</t-button>
    <t-button size="large" @click="onClick('0')">-</t-button>
    <div style="text-align: center">印</div>
    <t-button size="large" @click="onClick('0')">π</t-button>
    <t-button size="large" @click="onClick('0')">0</t-button>
    <t-button size="large" @click="onClick('0')">e</t-button>
    <t-button size="large" @click="onClick('0')">.</t-button>
    <t-button size="large" @click="onClick('0')">=</t-button>
  </div>
</template>

<script setup lang="ts">

const onClick = (num: string) => {
  console.log('Clicked:', num)
}
</script>
