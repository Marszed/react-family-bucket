/**
 * Created by marszed on 2017/3/20.
 */

/**
 * 不动产 数据池
 * state 1 必填字段 0 非必填字段
 * type 1 输入框 2 下拉选择框 3 下拉输入选择框 4 时间选择
 * 1.公寓 2.独栋别墅 3.联排别墅 4.土地
 * validations 验证规则
 * requiredMsg 必填字段提示
 * required 是否必填
 * option 下拉列表选项
 * errMsg 下拉列表错误提示
 * cancel 是否取消错误提示
 */
// state: 第几期
// lot: 单元号
// price: 价格
// landPrice: 土地价格
// buildPrice: 建房价格
// landTitle: 地契批准时间
// completionDate: 竣工时间
// study: 书房数量
// bed: 卧室数量
// bath: 浴室数量
// carSpace: 车位数量
// carLot: 车位号
// storageNo: 储藏室编号
// constructionArea: 建筑面积
// internalArea: 室内面积
// balconyArea: 阳台面积
// landArea: 土地面积
// width: 宽度
// length: 长度
// floorLevel: 层数
// aspect: 房屋朝向
// houseView: 房屋景观
// rentalGuarrante: 包租百分比
// estRate 预计租金

//
const propertyMap = ((messages, ValidateTool)=>{
    let allItem = {
        // 第一级信息
        lot: {
            key: 'lot',
            type: 1, // 控件类型 1 input(default) input(unit) input(active) 2 select(default) select(active) 3 date(default)
            maxLength: 10,
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.lot
                }
            ],
            required: true
        },
        propertyStatus: {
            key: 'propertyStatus',
            type: 2,
            initialValue: 1, //初始值
            active: true, // 文案字体蓝色
            prev: true, // 文案前置
            foremost: true, // 文案字体是否强调
            option: [
                {"id": 1, "data": messages.available},
                {"id": 2, "data": messages.reserved},
                {"id": 3, "data": messages.sold}
            ],
            required: true
        },
        isDisplay: {
            key: 'isDisplay',
            type: 2,
            initialValue: 1, //初始值
            required: true,
            option: [
                {"id": 1, "data": messages.yes},
                {"id": 2, "data": messages.no}
            ]
        },
        // 第二级信息
        bed: {
            key: 'bed',
            type: 4,
            maxLength: 4,
            icon: 'icon-bedroom',
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.bed
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : (Number(str.split('.')[1]) === 0 || Number(str.split('.')[1]) === 5))) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.propertyRoomNum
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0 && value < 99.5) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.validateError4
                }
            ],
            required: true
        },
        bath: {
            key: 'bath',
            type: 4, // + —
            maxLength: 4,
            icon: 'icon-washroom',
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.bath
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : (Number(str.split('.')[1]) === 0 || Number(str.split('.')[1]) === 5))) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.propertyRoomNum
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0 && value < 99.5) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.validateError4
                }
            ],
            required: true
        },
        study: {
            key: 'study',
            type: 4, // + —
            maxLength: 4,
            icon: 'icon-bookroom',
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.study
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : (Number(str.split('.')[1]) === 0 || Number(str.split('.')[1]) === 5))) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.propertyRoomNum
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0 && value < 99.5) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.validateError4
                }
            ],
            required: true
        },
        carSpace: {
            key: 'carSpace',
            type: 4, // + —
            maxLength: 4,
            icon: 'icon-Garage',
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.carSpace
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : (Number(str.split('.')[1]) === 0 || Number(str.split('.')[1]) === 5))) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.propertyRoomNum
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0 && value < 99.5) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.validateError4
                }
            ],
            required: true
        },
        // 土地信息
        stage: {
            key: 'stage',
            type: 1,
            maxLength: 2,
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.stage
                },
                {
                    validator: (rule, value, callback) => {
                        if (ValidateTool.isInt(value)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.stageTip
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0 || value <= 99999999) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError1
                }
            ],
            required: true
        },
        landTitle: {
            key: 'landTitle',
            type: 3,
            message: messages.pleaseChoose,
            required: true
        },
        width: function(obj) {
            return {
                key: 'width',
                type: 1,
                maxLength: 10,
                unit: 'len',
                active: obj.active !== undefined ? obj.active : false,
                rules: [
                    {
                        required:  obj.required !== undefined ? obj.required : true,
                        message: messages.pleaseInput + ' ' + messages.width
                    },
                    {
                        validator: (rule, value, callback) => {
                            const str = String(value);
                            if (value === undefined && obj.required !== true){
                                callback();
                                return false;
                            }
                            if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                callback();
                            } else {
                                callback(new Error('error in type'));
                            }
                        },
                        message: messages.aDecimal
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === undefined && obj.required !== true){
                                callback();
                                return false;
                            }
                            if (value >= 0.01 || value <= 999999999.9) {
                                callback();
                            } else {
                                callback(new Error('The amount of wrong'));
                            }
                        },
                        message: messages.validateError2
                    }
                ],
                required: obj.required !== undefined ? obj.required : true
            }
        },
        length: function(obj) {
            return {
                key: 'length',
                type: 1,
                maxLength: 10,
                unit: 'len',
                active: obj.active !== undefined ? obj.active : false,
                rules: [
                    {
                        required:  obj.required !== undefined ? obj.required : true,
                        message: messages.pleaseInput + ' ' + messages.length
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === undefined && obj.required !== true){
                                callback();
                                return false;
                            }
                            const str = String(value);
                            if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                callback();
                            } else {
                                callback(new Error('error in type'));
                            }
                        },
                        message: messages.aDecimal
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === undefined && obj.required !== true){
                                callback();
                                return false;
                            }
                            if (value >= 0.01 || value <= 999999999.9) {
                                callback();
                            } else {
                                callback(new Error('The amount of wrong'));
                            }
                        },
                        message: messages.validateError2
                    }
                ],
                required: obj.required !== undefined ? obj.required : true
            }
        },
        landArea: {
            key: 'landArea',
            type: 1,
            maxLength: 10,
            unit: 'area',
            rules: [
                {
                    required:  true,
                    message: messages.pleaseInput + ' ' + messages.landArea
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ],
            required: true
        },
        isAbroad: {
            key: 'isAbroad',
            type: 2,
            active: true,
            initialValue: 1, //初始值
            option: [
                {"id": 1, "data": messages.isAbroadYes},
                {"id": 2, "data": messages.isAbroadNo}
            ],
            message: messages.pleaseChoose,
            required: true
        },
        landPrice: {
            key: 'landPrice',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            active: true,
            prev: true,
            rules: [
                {
                    required:  true,
                    message: messages.pleaseInput + ' ' + messages.landPrice
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ],
            required: true
        },
        // 基本信息
        floorLevel: {
            key: 'floorLevel',
            type: 1,
            maxLength: 20,
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.floorLevel
                }
            ],
            required: true
        },
        constructionArea: {
            key: 'constructionArea',
            type: 1,
            maxLength: 10,
            unit: 'area',
            rules: [
                {
                    required:  true,
                    message: messages.pleaseInput + ' ' + messages.constructionArea
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ],
            required: true
        },
        buildPrice: {
            key: 'buildPrice',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            active: true,
            prev: true,
            rules: [
                {
                    required:  true,
                    message: messages.pleaseInput + ' ' + messages.buildPrice
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ],
            required: true
        },
        price: {
            key: 'price',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            active: true,
            prev: true,
            rules: [
                {
                    required:  true,
                    message: messages.pleaseInput + ' ' + messages.price
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ],
            required: true
        },
        // 补充信息
        completionDate: function(obj){
            return {
                key: 'completionDate',
                type: 3,
                active: obj.active !== undefined ? obj.active : false,
                required: obj.required !== undefined ? obj.required : false
            }
        },
        aspect: function(obj) {
            return {
                key: 'aspect',
                type: 2,
                active: obj.active !== undefined ? obj.active : true,
                option: [
                    {"id": 1, "data": messages.EAST},
                    {"id": 2, "data": messages.WEST},
                    {"id": 3, "data": messages.SOUTH},
                    {"id": 4, "data": messages.NORTH},
                    {"id": 5, "data": messages.SOUTHEAST},
                    {"id": 6, "data": messages.NORTHEAST},
                    {"id": 7, "data": messages.SOUTHWEST},
                    {"id": 8, "data": messages.NORTHWEST},
                    {"id": 9, "data": messages.EAST_WEST},
                    {"id": 10, "data": messages.NORTH_SOUTH},
                    {"id": 11, "data": messages.central}
                ],
                required: obj.required !== undefined ? obj.required :false
            }
        },
        houseView: function(obj) {
            return {
                key: 'houseView',
                type: 2,
                active: obj.active !== undefined ? obj.active : true,
                option: [
                    {"id": 1, "data": messages.cityView},
                    {"id": 2, "data": messages.beachView},
                    {"id": 3, "data": messages.seaView},
                    {"id": 4, "data": messages.riverView},
                    {"id": 5, "data": messages.lakeView},
                    {"id": 6, "data": messages.waterView},
                    {"id": 7, "data": messages.forestView},
                    {"id": 8, "data": messages.mountainView},
                    {"id": 9, "data": messages.parkView}
                ],
                required: obj.required !== undefined ? obj.required :false
            }
        },
        estRate: {
            key: 'estRate',
            type: 1,
            unit: 'mon',
            prev: true,
            maxLength: 12,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        estimatedCancelRates: {
            key: 'estimatedCancelRates',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        waterRates: {
            key: 'waterRates',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        ownerCrop: {
            key: 'ownerCrop',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        estimatedStampDuty:{
            key: 'estimatedStampDuty',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        rentalGuarrante: {
            key: 'rentalGuarrante',
            type: 1,
            maxLength: 5,
            unit: 'percent',
            rules: [
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0 || value <= 50) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.zeroTo50
                }
            ]
        },
        insurance: {
            key: 'insurance',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        transactionFee: {
            key: 'transactionFee',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        titleInsurance: {
            key: 'titleInsurance',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        propertyTax: {
            key: 'propertyTax',
            type: 1,
            maxLength: 12,
            unit: 'mon',
            prev: true,
            rules: [
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value === undefined){
                            callback();
                            return false;
                        }
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ]
        },
        internalArea: {
            key: 'internalArea',
            type: 1,
            maxLength: 10,
            unit: 'area',
            rules: [
                {
                    required:  true,
                    message: messages.pleaseInput + ' ' + messages.internalArea
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ],
            required: true
        },
        balconyArea: {
            key: 'balconyArea',
            type: 1,
            maxLength: 10,
            unit: 'area',
            rules: [
                {
                    required:  true,
                    message: messages.pleaseInput + ' ' + messages.balconyArea
                },
                {
                    validator: (rule, value, callback) => {
                        const str = String(value);
                        if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.doubleDecimal
                },
                {
                    validator: (rule, value, callback) => {
                        if (value >= 0.01 || value <= 9999999999.99) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.validateError3
                }
            ],
            required: true
        },
        storageNo: {
            key: 'storageNo',
            type: 1,
            maxLength: 10,
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.storageNo
                }
            ],
            required: true
        }
    };
    return {
        AU: {
            1: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                basicInfo: [
                    allItem.floorLevel,
                    allItem.aspect({active: false, required: true}),
                    allItem.internalArea,
                    allItem.balconyArea,
                    allItem.constructionArea,
                    {
                        key: 'storageNo',
                        type: 1,
                        maxLength: 10
                    },
                    allItem.isAbroad,
                    allItem.price
                ],
                supplement: [
                    allItem.houseView({active: false, required: false}),
                    allItem.completionDate({}),
                    allItem.estRate,
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.ownerCrop,
                    allItem.estimatedStampDuty,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'floorLevel', 'aspect', 'bed', 'bath',
                    'carSpace', 'study', 'storageNo', 'internalArea',
                    'balconyArea', 'constructionArea', 'isAbroad',
                    'price', 'propertyStatus', 'isDisplay',
                    'completionDate', 'houseView', 'estRate', 'estimatedCancelRates',
                    'waterRates', 'ownerCrop', 'estimatedStampDuty', 'rentalGuarrante'
                ]
            },
            2: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                landInfo: [
                    allItem.stage,
                    allItem.landTitle,
                    allItem.width({active: false, required: true}),
                    allItem.length({active: false, required: true}),
                    allItem.landArea,
                    allItem.isAbroad,
                    allItem.landPrice
                ],
                basicInfo: [
                    allItem.floorLevel,
                    allItem.constructionArea,
                    allItem.buildPrice,
                    allItem.price
                ],
                supplement: [
                    allItem.completionDate({}),
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.ownerCrop,
                    allItem.estimatedStampDuty,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'stage', 'width', 'length', 'landArea', 'landPrice', 'landTitle',
                    'floorLevel', 'constructionArea', 'buildPrice', 'bed', 'bath', 'carSpace', 'study',
                    'isAbroad', 'price', 'propertyStatus', 'isDisplay', 'completionDate', 'aspect',
                    'houseView', 'estRate', 'estimatedCancelRates', 'waterRates', 'ownerCrop', 'estimatedStampDuty', 'rentalGuarrante'
                ]
            },
            3: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                landInfo: [
                    allItem.landArea,
                    allItem.width({active: false, required: false}),
                    allItem.length({active: false, required: false})
                ],
                basicInfo: [
                    allItem.stage,
                    allItem.floorLevel,
                    allItem.constructionArea,
                    allItem.completionDate({required: true}),
                    allItem.isAbroad,
                    allItem.price
                ],
                supplement: [
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.ownerCrop,
                    allItem.estimatedStampDuty,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'stage', 'bed', 'bath', 'carSpace', 'study', 'landArea', 'constructionArea',
                    'floorLevel', 'completionDate', 'isAbroad', 'price', 'propertyStatus', 'isDisplay',
                    'width', 'length', 'aspect', 'houseView', 'estRate', 'estimatedCancelRates',
                    'waterRates', 'ownerCrop', 'estimatedStampDuty', 'rentalGuarrante'
                ]
            },
            4: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    {
                        key: 'width',
                        type: 1,
                        maxLength: 8,
                        icon: 'icon-width',
                        unit: 'len',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.aDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 999999999.9) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
                            }
                        ],
                        required: true
                    },
                    {
                        key: 'length',
                        type: 1,
                        maxLength: 8,
                        unit: 'len',
                        icon: 'icon-height',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.aDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 999999999.9) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
                            }
                        ],
                        required: true
                    },
                    {
                        key: 'landArea',
                        type: 1,
                        maxLength: 8,
                        unit: 'area',
                        icon: 'icon-area',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.doubleDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 9999999999.99) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError3
                            }
                        ],
                        required: true
                    }
                ],
                landInfo: [
                    allItem.stage,
                    allItem.landTitle,
                    allItem.isAbroad,
                    allItem.landPrice
                ],
                supplement: [
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.estimatedStampDuty
                ],
                order: [
                    'lot', 'stage', 'width', 'length', 'landArea', 'landTitle', 'isAbroad', 'landPrice',
                    'propertyStatus', 'isDisplay', 'aspect', 'houseView', 'estimatedCancelRates',
                    'waterRates', 'estimatedStampDuty'
                ]
            }
        },
        US: {
            1: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                basicInfo: [
                    allItem.floorLevel,
                    allItem.aspect({active: false, required: true}),
                    allItem.internalArea,
                    allItem.balconyArea,
                    allItem.constructionArea,
                    {
                        key: 'storageNo',
                        type: 1,
                        maxLength: 10
                    },
                    allItem.price
                ],
                supplement: [
                    allItem.completionDate({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.ownerCrop,
                    allItem.insurance,
                    allItem.transactionFee,
                    allItem.titleInsurance,
                    allItem.propertyTax,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'floorLevel', 'aspect', 'bed', 'bath',
                    'carSpace', 'study', 'storageNo', 'internalArea',
                    'balconyArea', 'constructionArea', 'price', 'propertyStatus', 'isDisplay',
                    'completionDate', 'houseView', 'estRate', 'ownerCrop',
                    'insurance', 'transactionFee', 'titleInsurance', 'propertyTax', 'rentalGuarrante'
                ]
            },
            2: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                landInfo: [
                    allItem.stage,
                    allItem.landTitle,
                    allItem.width({active: false, required: true}),
                    allItem.length({active: false, required: true}),
                    allItem.landArea,
                    allItem.landPrice
                ],
                basicInfo: [
                    allItem.floorLevel,
                    allItem.constructionArea,
                    allItem.buildPrice,
                    allItem.price
                ],
                supplement: [
                    allItem.completionDate({}),
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.ownerCrop,
                    allItem.insurance,
                    allItem.transactionFee,
                    allItem.titleInsurance,
                    allItem.propertyTax,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'stage', 'width', 'length', 'landArea', 'landPrice', 'landTitle',
                    'floorLevel', 'constructionArea', 'buildPrice', 'bed', 'bath', 'carSpace', 'study',
                    'price', 'propertyStatus', 'isDisplay', 'completionDate', 'aspect', 'houseView',
                    'estRate', 'ownerCrop', 'insurance', 'transactionFee', 'titleInsurance', 'propertyTax', 'rentalGuarrante'
                ]
            },
            3: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                landInfo: [
                    allItem.landArea,
                    allItem.width({active: false, required: false}),
                    allItem.length({active: false, required: false})
                ],
                basicInfo: [
                    allItem.stage,
                    allItem.floorLevel,
                    allItem.constructionArea,
                    allItem.completionDate({required: true}),
                    allItem.price
                ],
                supplement: [
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.ownerCrop,
                    allItem.insurance,
                    allItem.transactionFee,
                    allItem.titleInsurance,
                    allItem.propertyTax,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'stage', 'bed', 'bath', 'carSpace', 'study', 'landArea', 'constructionArea',
                    'floorLevel', 'completionDate', 'price', 'propertyStatus', 'isDisplay',
                    'width', 'length', 'aspect', 'houseView',
                    'estRate', 'ownerCrop', 'insurance', 'transactionFee', 'titleInsurance', 'propertyTax', 'rentalGuarrante'
                ]
            },
            4: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    {
                        key: 'width',
                        type: 1,
                        maxLength: 8,
                        icon: 'icon-width',
                        unit: 'len',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.aDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 999999999.9) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
                            }
                        ],
                        required: true
                    },
                    {
                        key: 'length',
                        type: 1,
                        maxLength: 8,
                        unit: 'len',
                        icon: 'icon-height',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.aDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 999999999.9) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
                            }
                        ],
                        required: true
                    },
                    {
                        key: 'landArea',
                        type: 1,
                        maxLength: 8,
                        unit: 'area',
                        icon: 'icon-area',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.doubleDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 9999999999.99) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError3
                            }
                        ],
                        required: true
                    }
                ],
                basicInfo: [
                    allItem.stage,
                    allItem.landTitle,
                    allItem.landPrice
                ],
                supplement: [
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.insurance,
                    allItem.transactionFee,
                    allItem.titleInsurance,
                    allItem.propertyTax
                ],
                order: [
                    'lot', 'stage', 'width', 'length', 'landArea', 'landTitle', 'landPrice',
                    'propertyStatus', 'isDisplay', 'aspect', 'houseView',
                    'insurance', 'transactionFee', 'titleInsurance', 'propertyTax'
                ]
            }
        },
        UK: {
            1: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                basicInfo: [
                    allItem.floorLevel,
                    allItem.aspect({active: false, required: true}),
                    allItem.internalArea,
                    allItem.balconyArea,
                    allItem.constructionArea,
                    allItem.storageNo,
                    allItem.price
                ],
                supplement: [
                    allItem.completionDate({}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.ownerCrop,
                    allItem.estimatedStampDuty,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'floorLevel', 'aspect', 'bed', 'bath', 'carSpace', 'study',
                    'storageNo', 'internalArea', 'balconyArea', 'constructionArea',
                    'price', 'propertyStatus', 'isDisplay', 'completionDate', 'houseView',
                    'estRate', 'estimatedCancelRates', 'waterRates', 'ownerCrop', 'estimatedStampDuty', 'rentalGuarrante'
                ]
            },
            2: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                landInfo: [
                    allItem.stage,
                    allItem.landTitle,
                    allItem.width({active: false, required: true}),
                    allItem.length({active: false, required: true}),
                    allItem.landArea,
                    allItem.landPrice
                ],
                basicInfo: [
                    allItem.floorLevel,
                    allItem.constructionArea,
                    allItem.buildPrice,
                    allItem.price
                ],
                supplement: [
                    allItem.completionDate({}),
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.ownerCrop,
                    allItem.estimatedStampDuty,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'stage', 'width', 'length', 'landArea', 'landPrice', 'landTitle',
                    'floorLevel', 'constructionArea', 'buildPrice', 'bed', 'bath', 'carSpace', 'study',
                    'price', 'propertyStatus', 'isDisplay', 'completionDate', 'aspect', 'houseView',
                    'estRate', 'estimatedCancelRates', 'waterRates', 'ownerCrop', 'estimatedStampDuty', 'rentalGuarrante'
                ]
            },
            3: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    allItem.bed,
                    allItem.bath,
                    allItem.study,
                    allItem.carSpace
                ],
                landInfo: [
                    allItem.landArea,
                    allItem.width({active: false, required: false}),
                    allItem.length({active: false, required: false})
                ],
                basicInfo: [
                    allItem.stage,
                    allItem.floorLevel,
                    allItem.constructionArea,
                    allItem.completionDate({required: true}),
                    allItem.price
                ],
                supplement: [
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estRate,
                    allItem.ownerCrop,
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.estimatedStampDuty,
                    allItem.rentalGuarrante
                ],
                order: [
                    'lot', 'stage', 'bed', 'bath', 'carSpace', 'study', 'landArea', 'constructionArea',
                    'floorLevel', 'completionDate', 'price', 'propertyStatus', 'isDisplay',
                    'width', 'length', 'aspect', 'houseView', 'estRate', 'estimatedCancelRates',
                    'waterRates', 'ownerCrop', 'estimatedStampDuty', 'rentalGuarrante'
                ]
            },
            4: {
                foremost: [
                    allItem.lot,
                    allItem.propertyStatus,
                    allItem.isDisplay
                ],
                secondary: [
                    {
                        key: 'width',
                        type: 1,
                        maxLength: 8,
                        icon: 'icon-width',
                        unit: 'len',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.aDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 999999999.9) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
                            }
                        ],
                        required: true
                    },
                    {
                        key: 'length',
                        type: 1,
                        maxLength: 8,
                        unit: 'len',
                        icon: 'icon-height',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) === 1)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.aDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 999999999.9) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
                            }
                        ],
                        required: true
                    },
                    {
                        key: 'landArea',
                        type: 1,
                        maxLength: 8,
                        unit: 'area',
                        icon: 'icon-area',
                        rules: [
                            {
                                required:  true,
                                message: messages.pleaseInput
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const str = String(value);
                                    if (ValidateTool.isNumeric(value) && (str.indexOf('.') === -1 ? true : Number(str.split('.')[1].length) <= 2)) {
                                        callback();
                                    } else {
                                        callback(new Error('error in type'));
                                    }
                                },
                                message: messages.doubleDecimal
                            },
                            {
                                validator: (rule, value, callback) => {
                                    if (value >= 0.01 || value <= 9999999999.99) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError3
                            }
                        ],
                        required: true
                    }
                ],
                landInfo: [
                    allItem.stage,
                    allItem.landTitle,
                    allItem.landPrice
                ],
                supplement: [
                    allItem.aspect({active: false, required: false}),
                    allItem.houseView({active: false, required: false}),
                    allItem.estimatedCancelRates,
                    allItem.waterRates,
                    allItem.estimatedStampDuty
                ],
                order: [
                    'lot', 'stage', 'width', 'length', 'landArea', 'landTitle', 'landPrice',
                    'propertyStatus', 'isDisplay', 'aspect', 'houseView', 'estimatedCancelRates',
                    'waterRates', 'estimatedStampDuty'
                ]
            }
        },
        // 房屋朝向
        aspectName: [messages.EAST, messages.WEST, messages.SOUTH, messages.NORTH, messages.SOUTHEAST, messages.NORTHEAST, messages.SOUTHWEST, messages.NORTHWEST, messages.EAST_WEST, messages.NORTH_SOUTH, messages.central],
        // 房屋景观 城市中心景观, 海滩景观, 海景，河景，湖景，水景，森林景观，山景
        houseViewName: [messages.cityView, messages.beachView, messages.seaView, messages.riverView, messages.lakeView, messages.waterView, messages.forestView, messages.mountainView, messages.parkView],
        // propertyStatusName
        propertyStatusName: [messages.available, messages.reserved, messages.sold],
        // yesNo
        yesNo: [messages.yes, messages.no],
        // 海外是否可购
        isAbroadName: [messages.isAbroadYes, messages.isAbroadNo],
        // 不动产状态
        propertyStatusWord: [messages.available, messages.reserved, messages.sold],
        // 货币单位
        monUnit: {
            zh: {
                UK: '英镑',
                US: '美元',
                AU: '澳元'
            },
            en: {
                UK: 'GBP',
                US: 'USD',
                AU: 'AUD',
            },
            AU: 'AUD',
            UK: '$',
            US: '$'
        },
        // 面积单位
        areaUnit: {
            AU: '㎡',
            UK: 'ft²',
            US: 'ft²'
        },
        // 长度单位
        lengthUnit: {
            AU: 'm',
            UK: 'ft',
            US: 'ft'
        },
        // 国家代码
        countryCode: {
            'country.001': 'CN',
            'country.002': 'US',
            'country.003': 'UK',
            'country.004': 'AU'
        },
        // 模板文件下载地址
        excelFilePath: '/xlsx'
    };
});

export default propertyMap;
