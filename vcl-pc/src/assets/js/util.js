let util = {
  debounceIdentify: 0,
  bounce (func, delay) {
    this.debounceIdentify && clearTimeout(this.debounceIdentify)
    this.debounceIdentify = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

export function setMenu (routers, code) {
  /*
  *  @routers  redux管理的 appRouter和otherRouter 的路由表
  *  @code  用户类型   user.codetype 字段  值为 1，2，3，4
  *
  * */
  let menu = []
  routers.forEach(router => {
    const INDEX = router
    if (INDEX.meta.role.indexOf(code) > -1 && INDEX.meta.navigator === true) {
      // 确定子路由
      let children = []
      router.children.forEach((child) => {
        if (child.meta.role.indexOf(code) > -1 && child.meta.navigator === true) {
          children.push(child)
        }
      })
      let obj = {
        title: INDEX.meta.title,
        path: INDEX.meta.title === '系统首页' ? '/home' : INDEX.path,
        icon: `ercp-icon-${INDEX.meta.icon}`,
        children: children
      }
      menu.push(obj)
    }
    // console.log(menu)
  })
  return menu
}

export function getCurrentPath (vm, router) {
  let currentPathArr = []
  if (router.name !== 'home') {
    console.log(router)
    if (router.name.indexOf('_index') > -1) {
      currentPathArr.push({
        title: router.meta.title,
        path: '',
        name: router.name
      })
    } else {
      router.matched.forEach(item => {
        let obj = {
          title: item.meta.title,
          path: item.path,
          name: item.name
        }
        if (item.path.indexOf('/:id') > -1) {
          obj.path = router.path
        }
        currentPathArr.push(obj)
      })
    }
  } else {
    let obj = {
      name: 'home',
      path: '/home',
      title: '系统首页'
    }
    currentPathArr.push(obj)
  }
  // console.log(currentPathArr);
  // 当 currentPathArr 的长度不为空的时候  提交 action
  return currentPathArr
}
export default util
