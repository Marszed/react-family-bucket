/**
 * Created by marszed on 2017/3/3.
 * 接口配置表，请备注各个接口地址含义
 */
export default {
    "AGENCY": 'agency', // 经纪公司
    "REGISTER": '/agency/sys/apply', // 注册
    "LOGIN": '/agency/sys/login', // 登录
    "FIRST": '/agency/sys/password/first', // 首次登录修改密码
    "HOME": '/agency/sys/home', // 工作台
    "FORGET": '/agency/sys/password/forget', // 忘记密码
    "CODE": '/agency/sys/code', // 根据登录账号判断是否存在验证码
    "SHOWCODEIMAGE": '/agency/sys/code', // 是否显示验证码
    "CODEIMAGE": '/agency/sys/codeimage?account=', // 获取验证码
    "LOGOUT": '/agency/sys/logout', // 登出
    "AGENTLIST": '/agency/agent/list/', // 经纪公司的经纪人列表
    "AGENTAUTHLIST": '/agency/agent/list/', // 经纪公司此项目的已授权经纪人列表
    "AGENTAUTH": '/agency/agent/auth/', // 授权或者取消授权给经纪人
    "AGENTADD": '/agency/agent/', // 添加经纪人
    "AGENTUPDATE": '/agency/agent', // 添加经纪人
    "AGENTDISABLED": '/agency/agent/', // 警用启用经纪人
    "COMPANYINFO": '/agency/sys/company/view/', // 公司信息查询
    "COMPANY": '/agency/sys/agency/edit', // 公司信息跟新
    "ACCOUNTEDIT": '/agency/sys/account/edit', // 个人信息更新
    "PASSWORDCHANGE": '/agency/sys/password/change', // 个人信息-密码修改
    "ACCOUNTCHANGE": '/agency/sys/account/change', // 个人信息-邮箱修改
    "LANGUAGECHANGE": '/agency/sys/change/', // 个人信息-语言修改
    "CONFIRMEMAIL": '/agency/sys/account/confirm', // 个人信息-重置邮箱
    "COUNTRY": '/agency/region/list', // 获取区域信息中的国家列表
    "PROJECTLIST": '/agency/project/list/', // 不动产项目列表查询
    "PROJECTCOLLECT": '/agency/project/collect/', // 不动产项目收藏和取消收藏
    "PROJECTDETAIL": '/agency/project/', // 获得不动产项目基本信息详情
    "DOCUMENT": '/agency/project/doc/', // 获取项目详情中的文档列表
    "PROGRESS": '/agency/project/progress/', // 查询不动产项目进度数据列表
    "PROPERTY": '/agency/property/list/', // 获取项目不动产列表
    "PROPERTYDETAIL": '/agency/property/', // 获取项目不动产详情
    "CHART": '/agency/property/sales/chart/', // 展示项目销控图
    "REGION": '/agency/region/sub/list/' // 获取区域信息中的子级区域列表
};