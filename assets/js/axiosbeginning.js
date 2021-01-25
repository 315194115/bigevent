axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net';

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config);
    if (config.url.indexOf('/my') !== -1) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么

    // console.log(response);

    // 对response响应回来的数据做判断，看看 status 和 message的结果

    if (
      response.data.status === 1 &&
      response.data.message === "身份认证失败！"
    ) {
      // 用户的身份认证失败
      localStorage.removeItem("token");

      // 需要把页面跳转回到login登录页面
      location.href = "/home/login.html";
    }

    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);