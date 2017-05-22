/**
 * Created by marszed on 2017/3/3.
 * 接口配置表，请备注各个接口地址含义
 */
export default {
    "AGENCY": 'agency', // 经纪公司
    "REGISTER": '/agent/sys/apply', // 注册
    "LOGIN": '/agent/login', // 登录
    "FIRST": '/agent/sys/password/first', // 首次登录修改密码
    "HOME": '/agent/sys/home', // 工作台
    "FORGET": '/agent/sys/password/forget', // 忘记密码
    "CODE": '/agent/sys/code', // 根据登录账号判断是否存在验证码
    "SHOWCODEIMAGE": '/agent/sys/code', // 是否显示验证码
    "CODEIMAGE": '/agent/sys/codeimage?account=', // 获取验证码
    "LOGOUT": '/agent/sys/logout', // 登出
    "AGENTLIST": '/agent/agent/list/', // 经纪公司的经纪人列表
    "AGENTAUTHLIST": '/agent/agent/list/', // 经纪公司此项目的已授权经纪人列表
    "AGENTAUTH": '/agent/agent/auth/', // 授权或者取消授权给经纪人
    "AGENTADD": '/agent/agent/', // 添加经纪人
    "AGENTUPDATE": '/agent/agent', // 添加经纪人
    "AGENTDISABLED": '/agent/agent/', // 警用启用经纪人
    "COMPANYINFO": '/agent/sys/company/view/', // 公司信息查询
    "COMPANY": '/agent/sys/agent/edit', // 公司信息跟新
    "ACCOUNTEDIT": '/agent/sys/personal', // 个人信息更新
    "PASSWORDCHANGE": '/agent/sys/personal/password/change', // 个人信息-密码修改
    "ACCOUNTCHANGE": '/agent/sys/account/change', // 个人信息-邮箱修改
    "LANGUAGECHANGE": '/agent/sys/personal/change/', // 个人信息-语言修改
    "CONFIRMEMAIL": '/agent/sys/account/confirm', // 个人信息-重置邮箱
    "COUNTRY": '/agent/region/list', // 获取区域信息中的国家列表
    "PROJECTLIST": '/agent/project/list/', // 不动产项目列表查询
    "PROJECTCOLLECT": '/agent/project/collect/', // 不动产项目收藏和取消收藏
    "PROJECTDETAIL": '/agent/project/', // 获得不动产项目基本信息详情
    "DOCUMENT": '/agent/project/doc/', // 获取项目详情中的文档列表
    "PROGRESS": '/agent/project/progress/', // 查询不动产项目进度数据列表
    "PROPERTY": '/agent/property/list/', // 获取项目不动产列表
    "PROPERTYDETAIL": '/agent/property/', // 获取项目不动产详情
    "CHART": '/agent/property/sales/chart/', // 展示项目销控图
    "REGION": '/agent/region/sub/list/' // 获取区域信息中的子级区域列表
};