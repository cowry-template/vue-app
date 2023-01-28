<template>
  <!-- 定时器 -->
  <span class="timer" v-if="label">{{ label }} </span>
  <span class="timer" v-if="suffix">{{ suffix }} </span>
</template>

<script>
import Counter from '@/utils/counter';

export default {
  props: ['remain', 'showSecond', 'suffix'], // 剩余时间，单位：毫秒
  data() {
    return {
      label: '',
    };
  },
  methods: {
    initLabel() {
      let str = '';
      if (this.showSecond) {
        return `${this.remain / 1000} s`;
      }

      let hour = parseInt(this.remain / 3600000, 10);
      let minute = parseInt((this.remain % 3600000) / 60000, 10);
      let second = parseInt(((this.remain % 3600000) % 60000) / 1000, 10);

      hour && (str += `${hour}:`);
      minute && (str += `${toDouble(minute)}:`);
      second && (str += `${toDouble(second)}`);

      return `${str}`;
    },
  },
  beforeMount() {
    this.label = this.initLabel();
  },

  mounted() {
    let remain = this.remain || 0;

    remain = parseInt(remain, 10);

    if (remain && remain >= 0) {
      this.oTimer = new Counter({
        remainderTime: remain,
        showSecond: true,
        onChange: data => {
          if (data.remainderTime == remain) return;

          this.label = `${data.remainderTimeStr}`;

          this.$emit('change', data);
        },
      });
    }
  },

  destroyed() {
    this.oTimer && this.oTimer.stop();
  },
};
</script>
