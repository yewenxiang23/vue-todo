<template>
    <section class="todo">
        <input 
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要去做什么?"
            @keyup.enter="addTodo"
        >
        <ItemList
          :todo="todo"
          @del="deleteTodo"
          v-for="(todo, index) in filteredTodos"
          :key="index"
        />
        <Tabs
          :filter="filter"
          :todo="todo"
          @toggle="toggleFilter"
          @clearAll="clearAll"
        />
    </section>
</template>

<script>
import ItemList from './itemList'
import Tabs from './tabs'

let id = 0

export default {
  components: {
    ItemList,
    Tabs
  },
  data () {
    return {
      todo: [ ],
      filter: 'all'
    }
  },
  methods: {
    addTodo (e) {
      this.todo.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todo.splice(this.todo.findIndex(item => item.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAll () {
      this.todo = this.todo.filter(todo => !todo.completed)
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todo
      }
      const completed = this.filter === 'completed'
      return this.todo.filter(todo => completed === todo.completed)
    }
  }
}
</script>

<style scoped>
.todo {
  width: 600px;
  margin: 0px auto;
  box-shadow: 0px 0px 5px #666;
}
.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4rem;
  border: none;
  outline: none;
  color: inherit;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: inset 0 -1px 5px 0px rgba(0, 0, 0, 0);
  /* 字体反锯齿 */
  font-smoothing: antialiased;
  border-bottom:1px solid #ccc;
}
</style>