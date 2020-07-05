class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  css(styles = {}) {
    // var 1:
    // for (const style in styles) {
    //   if (!styles.hasOwnProperty(style)) {
    //     continue;
    //   }
    //   this.$el.style[style] = styles[style]
    // }

    // var 2:
    // Object.entries(styles).forEach((key, value) => {
    //   console.log(key, value)
    //   this.$el.style[key] = value
    // });

    // var 3:
    Object.assign(this.$el.style, styles);
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  focus() {
    this.$el.focus()
    return this
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}