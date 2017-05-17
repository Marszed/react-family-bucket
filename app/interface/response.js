/**
 * Created by marszed on 2017/3/4.
 */
export default {
    // 注册
    "REGISTER": {
        "header": {"code": "0000", "message": "ok"},
        "data": {
            "vendorId": 1
        }
    },
    // 工作台
    "HOME": {
        "header": {"code": "0000", "message": "成功"},
        "data": {
            "vendorUserAcceptNum": 18,
            "projectAcceptNum": 18,
            "vendorUserNum": 34,
            "projectRejectNum": 6,
            "vendorUserWaitAuditNum": 0,
            "vendorUserRejectNum": 16,
            "projectInvalidNum": 4,
            "projectTotalNum": 31,
            "pojectWaitAuditNum": 7
        }
    },
    // 登录
    "LOGIN": {
        "header": {
            "code": "0000",
            "message": "成功"
        },
        "data": {
            "userInfo": {
                "vendorId": 1,
                "vendorName": "现代职业",
                "accountId": 4,
                "email": "xz168888@163.com",
                "password": "1000:d54770748cdc46c54a9175de1a441361c7e85d77b76ed6e0:460648916385b0414e41d3d8bb15db23d4d58dfa8792faf2",
                "mobilePhone": "11111111111re",
                "gender": 1,
                "profileImage": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/CN/1/person/2_20170217104825_31775.jpg",
                "title": "CTO",
                "country": "country.004",
                "countryName": "澳大利亚",
                "lastTime": 1493104174000,
                "accountLanguage": "zh_CN",
                "firstName": "许",
                "lastName": "卓",
                "regionId": 301001
            },
            "country": {
                "dicCountryCode": "country.004",
                "countryCode": "AU",
                "dicCountryName": "",
                "languageCode": "en_au",
                "currencyCode": "currency.002",
                "currencyName": "",
                "areaUnit": "ft²",
                "areaUnitCode": 2,
                "telephoneCode": "0061"
            },
            "firstLogin": false,
            "countryCode": "country.004",
            "showCode": false
        }
    },
    // 是否显示验证码
    "SHOWCODEIMAGE": {"header": {"code": "0000", "message": "ok"}, "data": false},
    // 国家列表查询
    "COUNTRY": {
        "header": {
            "code": "0000",
            "message": "成功"
        },
        "data": [
            {
                "regionId": 301001,
                "dicCode": "country.004",
                "dicValue": "澳大利亚",
                "parentId": 0,
                "isLeaf": false,
                "displayOrder": 0,
                "nameShort": "AU",
                "zip": ""
            },
            {
                "regionId": 501001,
                "dicCode": "country.003",
                "dicValue": "英国",
                "parentId": 0,
                "isLeaf": false,
                "displayOrder": 0,
                "nameShort": "UK",
                "zip": ""
            },
            {
                "regionId": 1000001,
                "dicCode": "country.002",
                "dicValue": "美国",
                "parentId": 0,
                "isLeaf": false,
                "displayOrder": 0,
                "nameShort": "US",
                "zip": ""
            }
        ]
    },
    // 项目列表
    "PROJECTLIST": {
        "header": {"code": "0000", "message": "成功"},
        "data": {
            "favoriteNumber": 2,
            "page": {
                "pageNum": 1,
                "pageSize": 20,
                "size": 3,
                "startRow": 1,
                "endRow": 3,
                "total": 3,
                "pages": 1,
                "list": [{
                    "projectId": 4,
                    "projectNo": "J000000004",
                    "title": "测绘周超",
                    "projectType": 1,
                    "countryCode": "country.002",
                    "countryName": "美国",
                    "regionFirstName": "阿拉斯加州",
                    "frontImage": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/AUS/1/测绘/SHOW/762017030201012457597.jpg",
                    "commissionType": 1,
                    "commissionMoney": 122.00,
                    "bonus": {
                        "id": null,
                        "projectId": 4,
                        "title": "哈哈",
                        "startTime": "2017-02-12",
                        "endTime": "2017-03-13",
                        "isForever": null,
                        "status": null,
                        "content": "<p>哈哈范德萨发大水</p>"
                    },
                    "favoriteFlag": 1,
                    "authorizeNumber": 2,
                    "detailAddr": "aaabcd",
                    "currencyName": "美元",
                    "minPrice": 123.32,
                    "maxPrice": 2222.33,
                    "targetDistance": 111.22,
                    "minArea": 101.5,
                    "maxArea": 585.6,
                    "noSoldNum": 26,
                    "reservedNum": 0,
                    "soldNum": 0,
                    "propertyNum": 26
                }, {
                    "projectId": 2119,
                    "projectNo": "J000002112",
                    "title": "公寓新增",
                    "projectType": 1,
                    "countryCode": "country.002",
                    "countryName": "美国",
                    "regionFirstName": "英格兰",
                    "frontImage": null,
                    "commissionType": 0,
                    "commissionMoney": 3.00,
                    "bonus": null,
                    "favoriteFlag": 0,
                    "authorizeNumber": 0,
                    "detailAddr": "white",
                    "currencyName": "美元",
                    "minPrice": 0.00,
                    "maxPrice": 0.00,
                    "targetDistance": 9348.78,
                    "minArea": null,
                    "maxArea": null,
                    "noSoldNum": 0,
                    "reservedNum": 0,
                    "soldNum": 0,
                    "propertyNum": null
                }, {
                    "projectId": 2122,
                    "projectNo": "J000002115",
                    "title": "公寓新增",
                    "projectType": 1,
                    "countryCode": "country.002",
                    "countryName": "美国",
                    "regionFirstName": "阿拉巴马州",
                    "frontImage": null,
                    "commissionType": 0,
                    "commissionMoney": 1.00,
                    "bonus": null,
                    "favoriteFlag": 1,
                    "authorizeNumber": 1,
                    "detailAddr": "美国亚拉巴马州克兰顿",
                    "currencyName": "美元",
                    "minPrice": 1.00,
                    "maxPrice": 13.00,
                    "targetDistance": 119.58,
                    "minArea": 110.3,
                    "maxArea": 590.3,
                    "noSoldNum": 22,
                    "reservedNum": 1,
                    "soldNum": 2,
                    "propertyNum": 25
                }],
                "prePage": 0,
                "nextPage": 0,
                "isFirstPage": true,
                "isLastPage": true,
                "hasPreviousPage": false,
                "hasNextPage": false,
                "navigatePages": 8,
                "navigatepageNums": [1],
                "navigateFirstPage": 1,
                "navigateLastPage": 1,
                "firstPage": 1,
                "lastPage": 1
            },
            "authorizeNumber": 2
        }
    },
    // 项目详情
    "PROJECTDETAIL": {
        "header": {"code": "0000", "message": "成功"},
        "data": {
            "projectId": 4,
            "projectNo": "J000000004",
            "title": "测绘周超",
            "available": 26,
            "reserved": 0,
            "sold": 0,
            "picList": [],
            "projectType": 1,
            "minPrice": 230450.00,
            "maxPrice": 500000.00,
            "countryCode": "country.002",
            "countryName": "美国",
            "regionFirstName": "阿拉斯加州",
            "regionSecondName": "",
            "regionThirdName": "",
            "detailAddr": "aaabcd",
            "zipCode": "99501",
            "targetDistance": 111.22,
            "sellingPointList": [],
            "longitude": "53.06999494080159",
            "latitude": "-2.192884426458704",
            "description": "<p>asdasdasdasdsa</p>",
            "isAbroad": true,
            "abroadPercent": 12.12,
            "abroadNumber": 12,
            "reservationFee": 121.95,
            "reservationDetail": "定金，这是定金",
            "currencyName": "美元",
            "termNumber": 0,
            "bonus": {
                "id": 55,
                "projectId": 4,
                "title": "哈哈",
                "startTime": "2017-02-12",
                "endTime": "2017-03-13",
                "isForever": 0,
                "status": 3,
                "content": "<p>哈哈范德萨发大水</p>"
            },
            "transactionList": [],
            "commissionType": 0,
            "commissionMoney": 1.00
        }
    },
    "DOCUMENT": {
        "header": {
            "code": "0000",
            "message": "成功"
        },
        "data": [
            {
                "resourceId": 8,
                "projectId": 2122,
                "resourceType": "2",
                "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/vendors/US/1/测试项目新增/FLOOR_PLANS/82017032311511536872.jpg",
                "fileName": "811213252111009835.jpg",
                "fileType": ".jpg",
                "isFrontImage": false,
                "createTime": 1494235069000,
                "fileKey": "vendors/US/1/测试项目新增/FLOOR_PLANS/82017032311511536872.jpg",
                "fileSize": 0,
                "remark": null
            },
            {
                "resourceId": 9,
                "projectId": 2122,
                "resourceType": "8",
                "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/vendors/US/1/测试项目新增/FLOOR_PMANS_DOC/92017032311512336872.jpg",
                "fileName": "568559656748811383.jpg",
                "fileType": ".jpg",
                "isFrontImage": false,
                "createTime": 1494235071000,
                "fileKey": "vendors/US/1/测试项目新增/FLOOR_PMANS_DOC/92017032311512336872.jpg",
                "fileSize": 0,
                "remark": null
            },
            {
                "resourceId": 10,
                "projectId": 2122,
                "resourceType": "8",
                "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/vendors/US/1/测试项目新增/FLOOR_PMANS_DOC/102017032311512336872.jpg",
                "fileName": "583031127486809675.jpg",
                "fileType": ".jpg",
                "isFrontImage": false,
                "createTime": 1494235069000,
                "fileKey": "vendors/US/1/测试项目新增/FLOOR_PMANS_DOC/102017032311512336872.jpg",
                "fileSize": 0,
                "remark": null
            },
            {
                "resourceId": 11,
                "projectId": 2122,
                "resourceType": "1",
                "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/vendors/US/1/测试项目新增/BROCHURE/112017032311515636872.jpg",
                "fileName": "1.jpg",
                "fileType": ".jpg",
                "isFrontImage": false,
                "createTime": 1494235068000,
                "fileKey": "vendors/US/1/测试项目新增/BROCHURE/112017032311515636872.jpg",
                "fileSize": 0,
                "remark": null
            },
            {
                "resourceId": 13,
                "projectId": 2122,
                "resourceType": "4",
                "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/vendors/US/1/测试项目新增/CONTRACT/132017032311515936872.jpg",
                "fileName": "2.jpg",
                "fileType": ".jpg",
                "isFrontImage": false,
                "createTime": 1494235067000,
                "fileKey": "vendors/US/1/测试项目新增/CONTRACT/132017032311515936872.jpg",
                "fileSize": 0,
                "remark": null
            }
        ]
    },
    "PROGRESS": {
        "header": {
            "code": "0000",
            "message": "ok"
        },
        "data": [
            {
                "progressId": 18,
                "projectId": 1,
                "updateTime": "2017-02-20 00:00:00.0",
                "updateDes": "assacsca",
                "historyresourceList": []
            },
            {
                "progressId": 19,
                "projectId": 1,
                "updateTime": "2017-02-20 00:00:00.0",
                "updateDes": "ascsacsac",
                "historyresourceList": [
                    {
                        "resourceId": 31,
                        "progressId": 19,
                        "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/zh/1/3/progess/312017022007365731775.gif",
                        "fileKey": "zh/1/3/progess/312017022007365731775.gif"
                    }
                ]
            },
            {
                "progressId": 20,
                "projectId": 1,
                "updateTime": "2017-02-20 00:00:00.0",
                "updateDes": "ascascsa",
                "historyresourceList": [
                    {
                        "resourceId": 32,
                        "progressId": 20,
                        "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/zh/1/1/progess/322017022007375931775.gif",
                        "fileKey": "zh/1/1/progess/322017022007375931775.gif"
                    },
                    {
                        "resourceId": 33,
                        "progressId": 20,
                        "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/zh/1/1/progess/332017022007375931775.png",
                        "fileKey": "zh/1/1/progess/332017022007375931775.png"
                    },
                    {
                        "resourceId": 34,
                        "progressId": 20,
                        "resourceUrl": "http://ipx-oss-study.oss-cn-shenzhen.aliyuncs.com/zh/1/1/progess/342017022007375931775.bmp",
                        "fileKey": "zh/1/1/progess/342017022007375931775.bmp"
                    }
                ]
            }
        ]
    },
    "CHART": {
        "header": {
            "code": "0000",
            "message": "ok"
        },
        "data": [
            {
                "propertyId": 1,
                "lot": "001",
                "bed": 7,
                "carSpace": 2,
                "bath": 1,
                "study": 5,
                "constructionArea": 351.6,
                "landArea": 141.6,
                "currencyCode": null,
                "currencyName": "#currency.001#",
                "floorLevel": 1,
                "propertyStatus": 3
            },
            {
                "propertyId": 2,
                "lot": "002",
                "bed": 8,
                "carSpace": 2,
                "bath": 10,
                "study": 7,
                "constructionArea": 371.7,
                "landArea": 286,
                "currencyCode": null,
                "currencyName": "#currency.001#",
                "floorLevel": 1,
                "propertyStatus": 3
            },
            {
                "propertyId": 3,
                "lot": "003",
                "bed": 4,
                "carSpace": 2,
                "bath": 5,
                "study": 7,
                "constructionArea": 103.9,
                "landArea": 305,
                "currencyCode": null,
                "currencyName": "#currency.001#",
                "floorLevel": 1,
                "propertyStatus": 2
            },
            {
                "propertyId": 1047,
                "lot": "UG01",
                "bed": 2.5,
                "carSpace": 4,
                "bath": 2.5,
                "study": 4,
                "constructionArea": 210.9,
                "landArea": 1000,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 3,
                "propertyStatus": 2
            },
            {
                "propertyId": 1048,
                "lot": "UG02",
                "bed": 9,
                "carSpace": 2,
                "bath": 8,
                "study": 13,
                "constructionArea": 205.3,
                "landArea": 293.3,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 1,
                "propertyStatus": 1
            },
            {
                "propertyId": 1049,
                "lot": "UG03",
                "bed": 5,
                "carSpace": 2,
                "bath": 5,
                "study": 6,
                "constructionArea": 173.4,
                "landArea": 209.9,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 1,
                "propertyStatus": 1
            },
            {
                "propertyId": 1050,
                "lot": "UG04",
                "bed": 11,
                "carSpace": 2,
                "bath": 4,
                "study": 6,
                "constructionArea": 151.3,
                "landArea": 369.8,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 1,
                "propertyStatus": 3
            },
            {
                "propertyId": 1051,
                "lot": "UG05",
                "bed": 12,
                "carSpace": 2,
                "bath": 4,
                "study": 10,
                "constructionArea": 136.2,
                "landArea": 219.1,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 1,
                "propertyStatus": 2
            },
            {
                "propertyId": 1052,
                "lot": "UG06",
                "bed": 12,
                "carSpace": 2,
                "bath": 10,
                "study": 6,
                "constructionArea": 127,
                "landArea": 186.3,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 1,
                "propertyStatus": 1
            },
            {
                "propertyId": 1053,
                "lot": "UG07",
                "bed": 10,
                "carSpace": 2,
                "bath": 9,
                "study": 14,
                "constructionArea": 126.5,
                "landArea": 173.9,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 1,
                "propertyStatus": 2
            },
            {
                "propertyId": 1054,
                "lot": "UG08",
                "bed": 13,
                "carSpace": 2,
                "bath": 13,
                "study": 5,
                "constructionArea": 151.4,
                "landArea": 210.9,
                "currencyCode": null,
                "currencyName": "#currency.002#",
                "floorLevel": 1,
                "propertyStatus": 1
            }
        ]
    }
};