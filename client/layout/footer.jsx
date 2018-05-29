import '../assets/styles/footer.css'
export default {
  data () {
    return {
      author: '叶文翔'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>作者：{this.author}</span>
      </div>
    )
  }
}
