// 获取表单节点（元素）
// 获取id为form的节点（html标签、DOM节点)
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const phonenumber = document.getElementById('phonenumber');

// 显示错误提示信息
function showError(input, message) {
  // 获取input节点的父节点formControl
  const formControl = input.parentElement;
  // 设置formControl的class属性值
  formControl.className = "form-control error";
  // 在formControl中查找small节点
  const small = formControl.querySelector("small");
  // 将small节点内部的html文本内容设为message
  small.innerText = message;
}

// 设置校验成功时的表单样式
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// 获取字段名
function getFieldName(input) {
  // 返回input节点的前一个兄弟节点的文本内容
  return input.previousElementSibling.innerText;
}

// 校验必填字段
function checkRequired(inputArr) {
  let notEmpty = true;
  // 循环遍历数组inputArr，forEach方法的参数是一个函数，
  // 每次循环执行这个函数，并把一个数组元素的值赋给函数参数input
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} 是必填字段`);
      notEmpty = false;
    } else {
      showSuccess(input);
    }
  });
  return notEmpty;
}

//校验字符串长度
function checkLength(input,min,max){
  if (input.value.length<min){
    showError(input,`${getFieldName(input)}不少于${min}个字符`);
  }
  else if (input.value.length>max){
    showError(input,`${getFieldName(input)}不多于${max}个字符`);
  }
  else{
    showSuccess(input);
  }
}

//校验邮箱地址是否合法
function checkEmail(input){
  //定义正则表达式
  const re= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  //使用正则表达式re校验input节点的value属性值
  if (re.test(input.value.trim())){
    showSuccess(input);
  }
  else{
    showError(input,'邮箱地址不合法');
  }
}

//校验手机号码是否合法
function checkPhoneNumber(input){
  //定义正则表达式
  const re1= /^1[3-9]\d{9}$/
  //使用正则表达式re校验input节点的value属性值
  if (re1.test(input.value.trim())){
    showSuccess(input);
  }
  else{
    showError(input,'手机号码不合规');
  }
}

//校验两次密码一致
function checkPasswordsMatch(input1,input2){
  if (input1.value!==input2.value){
    showError(input2,'两次输入的密码不一致');
  }
}

//事件监听，表单点击提交按钮时触发
form.addEventListener('submit',(e) =>{
  //阻止浏览器的默认行为
  e.preventDefault();
  if (checkRequired([username,email,password,password2,phonenumber])){
    //用户名长度在[3,15]之间
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPhoneNumber(phonenumber);
    checkPasswordsMatch(password,password2);
  }
});
