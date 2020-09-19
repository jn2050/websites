

class PubSubClass {
    constructor () {
      this.subIds = 0;
      this.subscriptions = {}
    }
    
    subscribe(topic, fn) {
      if(!this.subscriptions[topic]) this.subscriptions[topic] = {}
      const token = ++this.subIds
      this.subscriptions[topic][token] = fn
      return () => this.unsubscribe(topic, token)
    }
    
    publish (topic, ...args) {
      const subs = this.subscriptions[topic]
      if(!subs) return false
      Object.values(subs).forEach(sub => sub(...args))
    }
    
    unsubscribe (topic, token) {
      if(!token) delete this.subscriptions[topic] // Delete all subscriptions for the topic
      this.subscriptions[topic] && (delete this.subscriptions[topic][token]) // Delete specific subscription
    }
}

const PubSub = new PubSubClass()
export { PubSub }


/*
const unsub1 = PubSub.subscribe('spacex', data => console.log('Falcon was launched', data))
const unsub2 = PubSub.subscribe('spacex', data => console.log('Falcon Heavy was launched', data))
PubSub.publish('spacex', 'some data slash params')

// Unsubscribe single subscription
unsub1(); // Unsubscribes Falcon
unsub2(); // Unsubscribes Falcon Heavy

// Unsubscribe ALL subscriptions for a topic
PubSub.unsubscribe('spacex')
*/