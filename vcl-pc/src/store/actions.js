const actions = {
  increment (context, payload) {
    context.commit('increment', payload)
  },
  setAllFields (context, payload) {
    console.log(payload, 'payloadpayloadpayloadpayload')
    context.commit('setAllFields', payload)
  }
}

export default actions
