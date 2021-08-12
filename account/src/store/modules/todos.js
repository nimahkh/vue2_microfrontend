const state = () => ({
  clickCounts: 0,
  todos: []
})

// getters
const getters = {
  getCount: (state) => {
    return state.clickCounts
  },
  getTodos: (state) => {
    return state.todos
  }
}

// actions
const actions = {
  countInc ({ _, commit }) {
    commit('incrementCount')
  },
  addTodo ({ _, commit }, todo) {
    commit('pushToTodos', todo)
  }
}

// mutations
const mutations = {
   incrementCount (state) {
    state.clickCounts =  state.clickCounts + 1 
  },
  pushToTodos (state, todo) {
    state.todos.push(todo)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}