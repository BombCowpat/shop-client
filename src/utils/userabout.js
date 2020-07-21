import { v4 as uuidv4 } from 'uuid';



function getUserTempId(){
  //获取本地tempid
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  //如果获取不到
  if(!userTempId){
    //重新生成uuid
    userTempId=uuidv4();
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  return userTempId
}

export {
  getUserTempId
}