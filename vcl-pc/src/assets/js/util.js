let util = {
  debounceIdentify: 0,
  bounce (func, delay) {
    this.debounceIdentify && clearTimeout(this.debounceIdentify)
    this.debounceIdentify = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

// 设置导航菜单
export function setMenu (routers, code) {
  /*
  *  @routers  redux管理的 appRouter和otherRouter 的路由表
  *  @code  用户类型   user.codetype 字段  值为 1，2，3，4，5, 6
  *
  * */
  let menu = []
  routers.forEach((item) => {
    if (item.meta.role.indexOf(code) > -1 && item.meta.navigator === true) {
      // 测试阶段考虑children
      let children = []
      if (item.children) {
        item.children.forEach((child) => {
          if (child.meta.role.indexOf(code) > -1 && child.meta.navigator === true) {
            children.push(child)
          }
        })
      }
      let obj = {
        title: item.meta.title,
        path: item.path,
        icon: `ercp-icon-${item.meta.icon}`,
        children: children
      }
      menu.push(obj)
    }
  })
  return menu
}

export function getCurrentPath (vm, router) {
  let currentPathArr = []
  if (router.name.indexOf('_index') > -1) {
    currentPathArr.push({
      title: router.meta.title,
      path: '',
      name: router.name
    })
  } else {
    router.matched.forEach(item => {
      if (item.redirect && item.name.indexOf('_index') > -1) {
      } else {
        let obj = {
          title: item.meta.title,
          path: item.path,
          name: item.name
        }
        if (item.path.indexOf('/:id') > -1) {
          obj.path = router.path
        }
        currentPathArr.push(obj)
      }
    })
  }
  // 当 currentPathArr 的长度不为空的时候  提交 action
  return currentPathArr
}
export default util
