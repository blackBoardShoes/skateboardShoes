import axios from '../index'
const { api } = require('@/dev').proxyTableApi

// 获取项目列表(join/create)
export const getAllProject = data => {
  return axios.get(api + `/ercpProject/getPageErcpProject?userId=${data.userId}&keyword=${data.projectType}&perPage=${data.perPage}&currentPage=${data.currentPage}&like=${data.searchText}`)
}

// 新增项目
export const addMProject = data => {
  return axios.post(api + `/ercpProject/addErcpProject`, data)
}

// 获取单个项目的基本信息
export const getProjectInfo = data => {
  return axios.get(api + `/ercpProject/getErcpProject?projectId=${data}`)
}

// 修改项目基本信息
export const modifyProject = data => {
  return axios.put(api + `/ercpProject/updateErcpProject`, data)
}

// 锁定项目
export const lockProject = data => {
  return axios.put(api + `/ercpProject/lockPro?projectId=${data}`)
}

// 删除项目
export const deleteProject = data => {
  return axios.put(api + `/ercpProject/deletePro?projectId=${data}`)
}

// 获取所有用户：

// 获取成员列表
export const getMembers = data => {
  return axios.get(api + `/mix/getProjectMembers?projectId=${data}`)
}

// 添加成员至项目
export const addProjectMember = data => {
  return axios.post(api + `/mix/addProjectMember?id=${data.userId}&projectId=${data.projectId}`, data.members)
}

// 移除项目成员
export const removeProjectMember = data => {
  return axios.delete(api + `/mix/deleteProjectMember?id=${data.userId}&projectId=${data.projectId}&userId=${data.memberId}`)
}

// 项目成员分页
// export const getProjectMembers = data => {
//   return axios.post(api + `/mix/getProjectMembers?projectId=${data}`)
// }
// 筛选患者
// export const filterPaient = data => {
//   return axios.post(api + `formdata/inclusion?currentPage=1&perPage=50${data.basic}`, data.record)
// }

// // 生成文件
// export const createFile = data => {
//   return axios.post(api + `formdata/export?fileName=${data.name}`, data.body)
// }

// // 获取患者列表
// export const fileLists = data => {
//   return axios.get(api + `formdata/export_files`)
// }

// // 下载文件
// export const downFile = data => {
//   return axios.get(api + `formdata/download/${data.fileId}/${data.fileName}`, config)
// }

export const filterPaient = data => {
  return axios.post(api + `formdata/inclusion?currentPage=1&perPage=50${data.basic}`, data.record)
}

// 生成文件
export const createFile = data => {
  return axios.post(api + `formdata/export?fileName=${data.name}`, data.body)
}

// 获取患者列表
export const fileLists = data => {
  return axios.get(api + `formdata/export_files`)
}

// 下载文件
// export const downFile = data => {
//   return axios.get(api + `download/${data.fileId}/${data.fileName}`)
// }
export const downFile = data => {
  var eleLink = document.createElement('a')
  eleLink.download = data.fileName
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  console.log(data)
  eleLink.href = api + `/formdata/download/${data.fileId}/${data.fileName}`
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
  return axios.get(api + `/formdata/download/${data.fileId}/${data.fileName}`)
}
