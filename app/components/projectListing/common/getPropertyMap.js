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
    const floorLevel = [{"id":199,"data":199},{"id":198,"data":198},{"id":197,"data":197},{"id":196,"data":196},{"id":195,"data":195},{"id":194,"data":194},{"id":193,"data":193},{"id":192,"data":192},{"id":191,"data":191},{"id":190,"data":190},{"id":189,"data":189},{"id":188,"data":188},{"id":187,"data":187},{"id":186,"data":186},{"id":185,"data":185},{"id":184,"data":184},{"id":183,"data":183},{"id":182,"data":182},{"id":181,"data":181},{"id":180,"data":180},{"id":179,"data":179},{"id":178,"data":178},{"id":177,"data":177},{"id":176,"data":176},{"id":175,"data":175},{"id":174,"data":174},{"id":173,"data":173},{"id":172,"data":172},{"id":171,"data":171},{"id":170,"data":170},{"id":169,"data":169},{"id":168,"data":168},{"id":167,"data":167},{"id":166,"data":166},{"id":165,"data":165},{"id":164,"data":164},{"id":163,"data":163},{"id":162,"data":162},{"id":161,"data":161},{"id":160,"data":160},{"id":159,"data":159},{"id":158,"data":158},{"id":157,"data":157},{"id":156,"data":156},{"id":155,"data":155},{"id":154,"data":154},{"id":153,"data":153},{"id":152,"data":152},{"id":151,"data":151},{"id":150,"data":150},{"id":149,"data":149},{"id":148,"data":148},{"id":147,"data":147},{"id":146,"data":146},{"id":145,"data":145},{"id":144,"data":144},{"id":143,"data":143},{"id":142,"data":142},{"id":141,"data":141},{"id":140,"data":140},{"id":139,"data":139},{"id":138,"data":138},{"id":137,"data":137},{"id":136,"data":136},{"id":135,"data":135},{"id":134,"data":134},{"id":133,"data":133},{"id":132,"data":132},{"id":131,"data":131},{"id":130,"data":130},{"id":129,"data":129},{"id":128,"data":128},{"id":127,"data":127},{"id":126,"data":126},{"id":125,"data":125},{"id":124,"data":124},{"id":123,"data":123},{"id":122,"data":122},{"id":121,"data":121},{"id":120,"data":120},{"id":119,"data":119},{"id":118,"data":118},{"id":117,"data":117},{"id":116,"data":116},{"id":115,"data":115},{"id":114,"data":114},{"id":113,"data":113},{"id":112,"data":112},{"id":111,"data":111},{"id":110,"data":110},{"id":109,"data":109},{"id":108,"data":108},{"id":107,"data":107},{"id":106,"data":106},{"id":105,"data":105},{"id":104,"data":104},{"id":103,"data":103},{"id":102,"data":102},{"id":101,"data":101},{"id":100,"data":100},{"id":99,"data":"099"},{"id":98,"data":"098"},{"id":97,"data":"097"},{"id":96,"data":"096"},{"id":95,"data":"095"},{"id":94,"data":"094"},{"id":93,"data":"093"},{"id":92,"data":"092"},{"id":91,"data":"091"},{"id":90,"data":"090"},{"id":89,"data":"089"},{"id":88,"data":"088"},{"id":87,"data":"087"},{"id":86,"data":"086"},{"id":85,"data":"085"},{"id":84,"data":"084"},{"id":83,"data":"083"},{"id":82,"data":"082"},{"id":81,"data":"081"},{"id":80,"data":"080"},{"id":79,"data":"079"},{"id":78,"data":"078"},{"id":77,"data":"077"},{"id":76,"data":"076"},{"id":75,"data":"075"},{"id":74,"data":"074"},{"id":73,"data":"073"},{"id":72,"data":"072"},{"id":71,"data":"071"},{"id":70,"data":"070"},{"id":69,"data":"069"},{"id":68,"data":"068"},{"id":67,"data":"067"},{"id":66,"data":"066"},{"id":65,"data":"065"},{"id":64,"data":"064"},{"id":63,"data":"063"},{"id":62,"data":"062"},{"id":61,"data":"061"},{"id":60,"data":"060"},{"id":59,"data":"059"},{"id":58,"data":"058"},{"id":57,"data":"057"},{"id":56,"data":"056"},{"id":55,"data":"055"},{"id":54,"data":"054"},{"id":53,"data":"053"},{"id":52,"data":"052"},{"id":51,"data":"051"},{"id":50,"data":"050"},{"id":49,"data":"049"},{"id":48,"data":"048"},{"id":47,"data":"047"},{"id":46,"data":"046"},{"id":45,"data":"045"},{"id":44,"data":"044"},{"id":43,"data":"043"},{"id":42,"data":"042"},{"id":41,"data":"041"},{"id":40,"data":"040"},{"id":39,"data":"039"},{"id":38,"data":"038"},{"id":37,"data":"037"},{"id":36,"data":"036"},{"id":35,"data":"035"},{"id":34,"data":"034"},{"id":33,"data":"033"},{"id":32,"data":"032"},{"id":31,"data":"031"},{"id":30,"data":"030"},{"id":29,"data":"029"},{"id":28,"data":"028"},{"id":27,"data":"027"},{"id":26,"data":"026"},{"id":25,"data":"025"},{"id":24,"data":"024"},{"id":23,"data":"023"},{"id":22,"data":"022"},{"id":21,"data":"021"},{"id":20,"data":"020"},{"id":19,"data":"019"},{"id":18,"data":"018"},{"id":17,"data":"017"},{"id":16,"data":"016"},{"id":15,"data":"015"},{"id":14,"data":"014"},{"id":13,"data":"013"},{"id":12,"data":"012"},{"id":11,"data":"011"},{"id":10,"data":"010"},{"id":9,"data":"009"},{"id":8,"data":"008"},{"id":7,"data":"007"},{"id":6,"data":"006"},{"id":5,"data":"005"},{"id":4,"data":"004"},{"id":3,"data":"003"},{"id":2,"data":"002"},{"id":1,"data":"001"},{"id":0,"data":"Ground"},{"id":-1,"data":"UG 1"},{"id":-2,"data":"UG 2"},{"id":-3,"data":"UG 3"}];
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
                },
                {
                    validator: (rule, value, callback) => {
                        if (value !== 0 && value !== '0') {
                            callback();
                        } else {
                            callback(new Error('error in type'));
                        }
                    },
                    message: messages.noZero
                },
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
            required: true,
            keepSave: true
        },
        isDisplay: {
            key: 'isDisplay',
            type: 2,
            initialValue: 1, //初始值
            required: true,
            keepSave: true,
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
            maxLength: 8,
            keepSave: true,
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
                        if (value >= 0 && value <= 99999999) {
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
            keepSave: true,
            required: true
        },
        width: function(obj) {
            return {
                key: 'width',
                type: 1,
                maxLength: 12,
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
                            if ((value === undefined || value === "") && obj.required !== true){
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
                            if ((value === undefined || value === "") && obj.required !== true){
                                callback();
                                return false;
                            }
                            if (value >= 0.01 && value <= 999999999.9) {
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
                maxLength: 12,
                unit: 'len',
                active: obj.active !== undefined ? obj.active : false,
                rules: [
                    {
                        required:  obj.required !== undefined ? obj.required : true,
                        message: messages.pleaseInput + ' ' + messages.length
                    },
                    {
                        validator: (rule, value, callback) => {
                            if ((value === undefined || value === "") && obj.required !== true){
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
                            if ((value === undefined || value === "") && obj.required !== true){
                                callback();
                                return false;
                            }
                            if (value >= 0.01 && value <= 999999999.9) {
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
            maxLength: 12,
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
                        if (value >= 0.01 && value <= 999999999.99) {
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
            maxLength: 13,
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
                        if (value >= 0.01 && value <= 9999999999.99) {
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
            type: 5,
            maxLength: 20,
            rules: [
                {
                    required: true,
                    message: messages.pleaseInput + ' ' + messages.floorLevel
                }
            ],
            option: floorLevel,
            required: true
        },
        constructionArea: {
            key: 'constructionArea',
            type: 1,
            maxLength: 12,
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
                        if (value >= 0.01 && value <= 999999999.99) {
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
        buildPrice: {
            key: 'buildPrice',
            type: 1,
            maxLength: 13,
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
                        if (value >= 0.01 && value <= 9999999999.99) {
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
            maxLength: 13,
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
                        if (value >= 0.01 && value <= 9999999999.99) {
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
                required: obj.required !== undefined ? obj.required : false,
                keepSave: true
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
                    {"id": 9, "data": messages.parkView},
                    {"id": 10, "data": messages.other}
                ],
                required: obj.required !== undefined ? obj.required :false
            }
        },
        estRate: {
            key: 'estRate',
            type: 1,
            unit: 'mon',
            prev: true,
            next: true,
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
                        if ((value >= 0 && value <= 50) || !value) {
                            callback();
                        } else {
                            callback(new Error('The amount of wrong'));
                        }
                    },
                    message: messages.zeroTo50
                }
            ],
            keepSave: true
        },
        insurance: {
            key: 'insurance',
            type: 1,
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 13,
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
                        if ((value >= 0.01 && value <= 9999999999.99) || !value) {
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
            maxLength: 12,
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
                        if (value >= 0.01 && value <= 999999999.99) {
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
        balconyArea: {
            key: 'balconyArea',
            type: 1,
            maxLength: 12,
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
                        if (value >= 0.01 && value <= 999999999.99) {
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
    /*// 来个两百层的高楼大厦
    let floorLevelData = [], count = 1;
    do {
        floorLevelData.push({
            "id": count,
            "data": String(count).length == 1 ? '00' + count : (String(count).length == 2 ? "0" + count : count)
        });
        count ++;
    } while (count < 200);
    floorLevelData = (floorLevelData.reverse()).concat([
        {"id": 0, "data": messages.ground},
        {"id": -1, "data": messages.ug1},
        {"id": -2, "data": messages.ug2},
        {"id": -3, "data": messages.ug3}
    ]);
    console.log(JSON.stringify(floorLevelData));*/
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
                                    if (value >= 0.01 && value <= 999999999.9) {
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
                                    if (value >= 0.01 && value <= 999999999.9) {
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
                        maxLength: 12,
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
                                    if (value >= 0.01 && value <= 999999999.99) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
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
                                    if (value >= 0.01 && value <= 999999999.9) {
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
                                    if (value >= 0.01 && value <= 999999999.9) {
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
                        maxLength: 12,
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
                                    if (value >= 0.01 && value <= 999999999.99) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
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
                                    if (value >= 0.01 && value <= 999999999.9) {
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
                                    if (value >= 0.01 && value <= 999999999.9) {
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
                        maxLength: 12,
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
                                    if (value >= 0.01 && value <= 999999999.99) {
                                        callback();
                                    } else {
                                        callback(new Error('The amount of wrong'));
                                    }
                                },
                                message: messages.validateError2
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
        // 楼层
        floorLevel: floorLevel,
        // 房屋朝向
        aspectName: [messages.EAST, messages.WEST, messages.SOUTH, messages.NORTH, messages.SOUTHEAST, messages.NORTHEAST, messages.SOUTHWEST, messages.NORTHWEST, messages.EAST_WEST, messages.NORTH_SOUTH, messages.central],
        // 房屋景观 城市中心景观, 海滩景观, 海景，河景，湖景，水景，森林景观，山景
        houseViewName: [messages.cityView, messages.beachView, messages.seaView, messages.riverView, messages.lakeView, messages.waterView, messages.forestView, messages.mountainView, messages.parkView, messages.other],
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
