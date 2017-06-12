<template>
  <div class="select" :class="{active:status}">
    <div class="selected-bar" @click="toggle">
      <span class="selected-text" v-if="activeIndex == -1">{{defaultText}}</span>
      <span class="selected-text" v-else>{{keyString ? _active[keyString] : _active}}</span>
      <svg aria-hidden="true" class="icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiala"></use>
      </svg>
    </div>
    <ul class="select-items expandInDown" v-if="list">
      <li class="select-item" :class="{active:activeIndex == index, disabled:item.disabled}"
          v-for="(item, index) in list"
          @click="activeItem($event, index)">{{keyString ? item[keyString] : item}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'mrc-select',
    props: {
      list: {
        type: Array
      },
      changeSelect: {
        type: Function
      },
      keyString: {
        type: String,
        default: ''
      },
      bindData: null,
      defaultText: {
        type: String,
        default: '默认'
      },
      active: ''
    },
    data () {
      return {
        status: false,
        activeIndex: -1,
        _active: {}
      }
    },
    beforeMount () {
      for (let n = 0; n < this.list.length; n++) {
        let val = this.keyString ? this.list[n][this.keyString] : this.list[n]
        if (this.active === val) {
          this.activeIndex = n
          this._active = this.list[n]
          break
        }
      }
    },
    mounted () {
      let _this = this
      document.addEventListener('click', (e) => {
        if (!_this.$el.contains(e.target)) _this.status = false
      })
    },
    methods: {
      toggle () {
        this.status = !this.status
      },
      activeItem (event, index) {
        let _name = event.currentTarget.className
        if (_name.indexOf('disabled') > -1 || _name.indexOf('active') > -1) {
          return false
        }

        if (this.changeSelect) {
          this.changeSelect(this.list[index], this._active, this.bindData)
        }

        this.activeIndex = index
        this._active = this.list[index]

        this.status = false
      },
      next () {
        this.to(1)
      },
      pre () {
        this.to(-1)
      },
      to (step) {
        let toIndex = this.activeIndex + step
        if (toIndex < 0 || toIndex > this.list.length - 1) {
          return false
        }

        if (this.changeSelect) {
          this.changeSelect(this.list[toIndex], this._active, this.bindData)
        }

        this.activeIndex = toIndex
        this._active = this.list[toIndex]
      },
      clear () {
        this.activeIndex = -1
        this._active = {}
      },
      reset () {
        for (let n = 0; n < this.list.length; n++) {
          let val = this.keyString ? this.list[n][this.keyString] : this.list[n]
          if (this.active === val) {
            this.activeIndex = n
            this._active = val
            break
          }
        }
      }
    },
    watch: {
      active (a) {
        if (a) {
          for (let n = 0; n < this.list.length; n++) {
            let val = this.keyString ? this.list[n][this.keyString] : this.list[n]
            if (a === val) {
              this.activeIndex = n
              this._active = this.list[n]
              break
            }
          }
        }
      },
      list (a) {
        for (let n = 0; n < a.length; n++) {
          let val = this.keyString ? a[n][this.keyString] : a[n]
          if (this.active === val) {
            this.activeIndex = n
            this._active = this.list[n]
            break
          }
        }
      }
    }
  }
</script>
