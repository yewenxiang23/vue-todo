<template>
  <div>
      <div :class="['todo-item', {'completed':todo.completed}]">
          <input
              type="checkbox"
              class="toggle"
              v-model="todo.completed"
          />
          <label>{{todo.content}}</label>
          <button class="destroy" @click="deleteTodo"></button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style scoped>

.todo-item.completed {
  /* 过渡属性 */
  transiton: color 4s;
  -webkit-transition: color 4s;
  line-height: 1.2;
  display: block;
  /* 允许在单词内换行 */
  word-break: break-all;
  /* 合并空白符序列，但是保留换行符。 */
  white-space: pre-line;
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-item {
  position: relative;
  background-color: #fff;
  font-size: 24px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.todo-item label {
  /* 过渡属性 */
  transiton: color 4s;
  -webkit-transition: color 4s;
  line-height: 1.2;
  display: block;
  margin-left: 45px;
  padding: 15px;
  /* 允许在单词内换行 */
  word-break: break-all;
  /* 合并空白符序列，但是保留换行符。 */
  white-space: pre-line;
}
.todo-item:hover .destroy:after {
  content: "x";
}
.toggle {
  text-align: center;
  width: 400px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  outline: none;
  /* 使元素呈现标准样式 normal|icon|window|button|menu|field; */
  appearance: none;
  -webkit-appearance: none;
  display: inline-block;
}
.toggle:checked:before {
  content: url("../../assets/images/done.png");
  position: absolute;
  left: 12px;
  cursor: pointer;
}
.toggle:before {
  content: url("../../assets/images/round.png");
  position: absolute;
  left: 12px;
  cursor: pointer;
}
.destroy{
  position:absolute;
  top:50%;
  right:10px;
  bottom:0;
  width:40px;
  height:40px;
  margin:auto 0;
  font-size:30px;
  color:#cc9a9a;
  margin-bottom:11px;
  transiton:color 0.2s east-out;
  -webkit-transition:color 0.2s east-out;
  background-color: transparent;
  appearance:none;
  -webkit-appearance:none;
  border-width:0;
  cursor:pointer;
  outline:none;
}
</style>