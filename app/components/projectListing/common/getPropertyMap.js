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
const propertyMap = ((messages) => {
    let allItem = {
        lot: {
            state: 1,
            type: 1,
            maxLength: 10,
            requiredMsg: messages.pleaseInput + messages.lot,
            required: true
        },
        floorLevel: {
            state: 1,
            type: 1,
            validations: {
                tinyint: true
            },
            validationErrors: {
                tinyint: messages.tinyint
            },
            maxLength: 3,
            requiredMsg: messages.pleaseInput + messages.floorLevel,
            required: true
        },
        aspect: {
            state: 1,
            type: 2,
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
            errMsg: messages.pleaseChoose
        },
        stage: {
            state: 0,
            type: 1,
            maxLength: 3
        },
        bed: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                propertyRoomNum: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                propertyRoomNum: messages.propertyRoomNum
            },
            maxLength: 5,
            requiredMsg: messages.pleaseInput + messages.bed,
            required: true
        },
        bath: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                propertyRoomNum: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                propertyRoomNum: messages.propertyRoomNum
            },
            maxLength: 5,
            requiredMsg: messages.pleaseInput + messages.bath,
            required: true
        },
        study: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                propertyRoomNum: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                propertyRoomNum: messages.propertyRoomNum
            },
            maxLength: 5,
            requiredMsg: messages.pleaseInput + messages.study,
            required: true
        },
        carSpace: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                propertyRoomNum: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                propertyRoomNum: messages.propertyRoomNum
            },
            maxLength: 5,
            requiredMsg: messages.pleaseInput + messages.carSpace,
            required: true
        },
        carLot: {
            state: 0,
            type: 1,
            maxLength: 10
        },
        storageNo: {
            state: 0,
            type: 1,
            maxLength: 10
        },
        isAbroad: {
            state: 1,
            type: 2,
            option: [
                {"id": 1, "data": messages.yes},
                {"id": 2, "data": messages.no}
            ],
            errMsg: messages.pleaseChoose
        },
        internalArea: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                aDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                aDecimal: messages.aDecimal
            },
            maxLength: 12,
            requiredMsg: messages.pleaseInput + messages.internalArea,
            required: true
        },
        balconyArea: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                aDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                aDecimal: messages.aDecimal
            },
            maxLength: 10,
            requiredMsg: messages.pleaseInput + messages.balconyArea,
            required: true
        },
        constructionArea: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                aDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                aDecimal: messages.aDecimal
            },
            maxLength: 13,
            requiredMsg: messages.pleaseInput + messages.constructionArea,
            required: true
        },
        price: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 15,
            requiredMsg: messages.pleaseInput + messages.price,
            required: true,
            unit: '$'
        },
        propertyStatus: {
            state: 1,
            type: 2,
            option: [
                {"id": 1, "data": messages.available},
                {"id": 2, "data": messages.reserved},
                {"id": 3, "data": messages.sold}
            ],
            errMsg: messages.pleaseChoose
        },
        completionDate: {
            state: 0,
            type: 4
        },
        houseView: {
            state: 0,
            type: 2,
            option: [
                {"id": 1, "data": messages.cityView},
                {"id": 2, "data": messages.seaView},
                {"id": 3, "data": messages.mountainView},
                {"id": 4, "data": messages.parkView},
                {"id": 5, "data": messages.waterView}
            ],
            errMsg: messages.pleaseChoose,
            cancel: "true"
        },
        estRate: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            unit: '$'
        },
        estimatedCancelRates: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            unit: '$'
        },
        waterRates: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            unit: '$'
        },
        ownerCrop: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            unit: '$'
        },
        estimatedStampDuty: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            unit: '%'
        },
        insurance: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            unit: '$'
        },
        transactionFee: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            requiredMsg: messages.pleaseInput + messages.transactionFee,
            required: true,
            unit: '$'
        },
        titleInsurance: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            requiredMsg: messages.pleaseInput + messages.titleInsurance,
            unit: '$'
        },
        propertyTax: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                min5Max4: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                min5Max4: messages.min5Max4,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 13,
            requiredMsg: messages.min5max4,
            unit: '%'
        },
        rentalGuarrante: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                zeroTo100: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                zeroTo100: messages.zeroTo100
            },
            maxLength: 8,
            unit: '%'
        },
        isDisplay: {
            state: 1,
            type: 2,
            option: [
                {"id": 1, "data": messages.yes},
                {"id": 2, "data": messages.no}
            ],
            errMsg: messages.pleaseChoose
        },
        width: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                aDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                aDecimal: messages.aDecimal
            },
            maxLength: 12,
            requiredMsg: messages.pleaseInput + messages.width,
            required: true
        },
        length: {
            state: 0,
            type: 1,
            validations: {
                isNumeric: true,
                aDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                aDecimal: messages.aDecimal
            },
            maxLength: 12
        },
        landArea: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                aDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                aDecimal: messages.aDecimal
            },
            maxLength: 12,
            requiredMsg: messages.pleaseInput + messages.landArea,
            required: true
        },
        landPrice: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 15,
            requiredMsg: messages.pleaseInput + messages.landPrice,
            required: true,
            unit: '$'
        },
        landTitle: {
            state: 1,
            type: 4,
            requiredMsg: messages.pleaseInput + messages.landTitle
        },
        buildPrice: {
            state: 1,
            type: 1,
            validations: {
                isNumeric: true,
                doubleDecimal: true
            },
            validationErrors: {
                isNumeric: messages.isNumeric,
                doubleDecimal: messages.doubleDecimal
            },
            maxLength: 15,
            requiredMsg: messages.pleaseInput + messages.buildPrice,
            required: true,
            unit: '$'
        }
    };
    return {
        AU: {
            1: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                floorLevel: allItem.floorLevel,
                aspect: allItem.aspect,
                stage: allItem.stage,
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                carLot: allItem.carLot,
                storageNo: allItem.storageNo,
                internalArea: allItem.internalArea,
                balconyArea: allItem.balconyArea,
                constructionArea: allItem.constructionArea,
                isAbroad: allItem.isAbroad,
                completionDate: allItem.completionDate,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                ownerCrop: allItem.ownerCrop,
                estimatedStampDuty: allItem.estimatedStampDuty,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            2: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: {
                    state: 1,
                    type: 1,
                    maxLength: 3,
                    requiredMsg: messages.pleaseInput + messages.stage,
                    required: true
                },
                width: allItem.width,
                length: allItem.length,
                landArea: allItem.landArea,
                landPrice: allItem.landPrice,
                landTitle: allItem.landTitle,
                floorLevel: allItem.floorLevel,
                constructionArea: allItem.constructionArea,
                buildPrice: allItem.buildPrice,
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                isAbroad: allItem.isAbroad,
                completionDate: allItem.completionDate,
                aspect: allItem.aspect,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                ownerCrop: allItem.ownerCrop,
                estimatedStampDuty: allItem.estimatedStampDuty,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            3: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: allItem.stage,
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                carLot: allItem.carLot,
                width: {
                    state: 0,
                    type: 1,
                    validations: {
                        isNumeric: true,
                        aDecimal: true
                    },
                    validationErrors: {
                        isNumeric: messages.isNumeric,
                        aDecimal: messages.aDecimal
                    },
                    maxLength: 12
                },
                length: allItem.length,
                landArea: allItem.landArea,
                constructionArea: allItem.constructionArea,
                balconyArea: allItem.balconyArea,
                floorLevel: {
                    state: 0,
                    type: 1,
                    validations: {
                        tinyint: true
                    },
                    validationErrors: {
                        tinyint: messages.tinyint
                    },
                    maxLength: 3
                },
                isAbroad: allItem.isAbroad,
                completionDate: allItem.completionDate,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                ownerCrop: allItem.ownerCrop,
                estimatedStampDuty: allItem.estimatedStampDuty,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            4: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: {
                    state: 1,
                    type: 1,
                    maxLength: 3,
                    requiredMsg: messages.pleaseInput + messages.stage,
                    required: true
                },
                width: allItem.width,
                length: allItem.length,
                landArea: allItem.landArea,
                landTitle: allItem.landTitle,
                isAbroad: allItem.isAbroad,
                aspect: allItem.aspect,
                houseView: allItem.houseView,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                estimatedStampDuty: allItem.estimatedStampDuty,
                isDisplay: allItem.isDisplay
            },
            keys: []
        },
        US: {
            1: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                floorLevel: allItem.floorLevel,
                aspect: allItem.aspect,
                stage: allItem.stage,
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                carLot: allItem.carLot,
                storageNo: allItem.storageNo,
                internalArea: allItem.internalArea,
                balconyArea: allItem.balconyArea,
                constructionArea: allItem.constructionArea,
                completionDate: allItem.completionDate,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                ownerCrop: allItem.ownerCrop,
                insurance: allItem.insurance,
                transactionFee: allItem.transactionFee,
                titleInsurance: allItem.titleInsurance,
                propertyTax: allItem.propertyTax,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            2: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: {
                    state: 1,
                    type: 1,
                    maxLength: 3,
                    requiredMsg: messages.pleaseInput + messages.stage,
                    required: true
                },
                width: allItem.width,
                length: allItem.length,
                landArea: allItem.landArea,
                landPrice: allItem.landPrice,
                landTitle: allItem.landTitle,
                floorLevel: allItem.floorLevel,
                constructionArea: allItem.constructionArea,
                buildPrice: allItem.buildPrice,
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                completionDate: allItem.completionDate,
                aspect: allItem.aspect,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                ownerCrop: allItem.ownerCrop,
                insurance: allItem.insurance,
                transactionFee: allItem.transactionFee,
                titleInsurance: allItem.titleInsurance,
                propertyTax: allItem.propertyTax,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            3: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: allItem.stage,
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                carLot: allItem.carLot,
                width: {
                    state: 0,
                    type: 1,
                    validations: {
                        isNumeric: true,
                        aDecimal: true
                    },
                    validationErrors: {
                        isNumeric: messages.isNumeric,
                        aDecimal: messages.aDecimal
                    },
                    maxLength: 12
                },
                length: allItem.length,
                landArea: allItem.landArea,
                constructionArea: allItem.constructionArea,
                balconyArea: allItem.balconyArea,
                floorLevel: {
                    state: 0,
                    type: 1,
                    validations: {
                        tinyint: true
                    },
                    validationErrors: {
                        tinyint: messages.tinyint
                    },
                    maxLength: 3
                },
                completionDate: allItem.completionDate,
                aspect: allItem.aspect,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                ownerCrop: allItem.ownerCrop,
                insurance: allItem.insurance,
                transactionFee: allItem.transactionFee,
                titleInsurance: {
                    state: 1,
                    type: 1,
                    validations: {
                        isNumeric: true,
                        doubleDecimal: true
                    },
                    validationErrors: {
                        isNumeric: messages.isNumeric,
                        doubleDecimal: messages.doubleDecimal
                    },
                    maxLength: 13,
                    requiredMsg: messages.pleaseInput + messages.titleInsurance,
                    required: true
                },
                propertyTax: allItem.propertyTax,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            4: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: {
                    state: 1,
                    type: 1,
                    maxLength: 3,
                    requiredMsg: messages.pleaseInput + messages.stage,
                    required: true
                },
                width: allItem.width,
                length: allItem.length,
                landArea: allItem.landArea,
                landTitle: allItem.landTitle,
                aspect: allItem.aspect,
                houseView: allItem.houseView,
                insurance: allItem.insurance,
                transactionFee: allItem.transactionFee,
                titleInsurance: allItem.titleInsurance,
                propertyTax: allItem.propertyTax,
                isDisplay: allItem.isDisplay
            },
            keys: []
        },
        UK: {
            1: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                floorLevel: allItem.floorLevel,
                aspect: allItem.aspect,
                stage: allItem.stage,
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                carLot: allItem.carLot,
                storageNo: allItem.storageNo,
                internalArea: allItem.internalArea,
                balconyArea: allItem.balconyArea,
                constructionArea: allItem.constructionArea,
                completionDate: allItem.completionDate,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                ownerCrop: allItem.ownerCrop,
                estimatedStampDuty: allItem.estimatedStampDuty,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            2: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: {
                    state: 1,
                    type: 1,
                    maxLength: 3,
                    requiredMsg: messages.pleaseInput + messages.stage,
                    required: true
                },
                width: allItem.width,
                length: allItem.length,
                landArea: allItem.landArea,
                landPrice: allItem.landPrice,
                landTitle: allItem.landTitle,
                floorLevel: allItem.floorLevel,
                constructionArea: allItem.constructionArea,
                buildPrice: allItem.buildPrice,
                balconyArea: {
                    state: 0,
                    type: 1,
                    validations: {
                        isNumeric: true,
                        aDecimal: true
                    },
                    validationErrors: {
                        isNumeric: messages.isNumeric,
                        aDecimal: messages.aDecimal
                    },
                    maxLength: 10
                },
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                completionDate: allItem.completionDate,
                aspect: allItem.aspect,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                ownerCrop: allItem.ownerCrop,
                estimatedStampDuty: allItem.estimatedStampDuty,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            3: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: {
                    state: 1,
                    type: 1,
                    maxLength: 3,
                    requiredMsg: messages.pleaseInput + messages.stage,
                    required: true
                },
                bed: allItem.bed,
                bath: allItem.bath,
                study: allItem.study,
                carSpace: allItem.carSpace,
                carLot: allItem.carLot,
                width: {
                    state: 0,
                    type: 1,
                    validations: {
                        isNumeric: true,
                        aDecimal: true
                    },
                    validationErrors: {
                        isNumeric: messages.isNumeric,
                        aDecimal: messages.aDecimal
                    },
                    maxLength: 12
                },
                length: allItem.length,
                landArea: allItem.landArea,
                constructionArea: allItem.constructionArea,
                floorLevel: {
                    state: 0,
                    type: 1,
                    validations: {
                        tinyint: true
                    },
                    validationErrors: {
                        tinyint: messages.tinyint
                    },
                    maxLength: 3
                },
                completionDate: allItem.completionDate,
                houseView: allItem.houseView,
                estRate: allItem.estRate,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                ownerCrop: allItem.ownerCrop,
                estimatedStampDuty: allItem.estimatedStampDuty,
                rentalGuarrante: allItem.rentalGuarrante,
                isDisplay: allItem.isDisplay
            },
            4: {
                lot: allItem.lot,
                propertyStatus: allItem.propertyStatus,
                price: allItem.price,
                stage: {
                    state: 1,
                    type: 1,
                    maxLength: 3,
                    requiredMsg: messages.pleaseInput + messages.stage,
                    required: true
                },
                width: allItem.width,
                length: allItem.length,
                landArea: allItem.landArea,
                landTitle: allItem.landTitle,
                aspect: allItem.aspect,
                houseView: allItem.houseView,
                estimatedCancelRates: allItem.estimatedCancelRates,
                waterRates: allItem.waterRates,
                estimatedStampDuty: allItem.estimatedStampDuty,
                isDisplay: allItem.isDisplay
            },
            keys: []
        },
        // 房屋朝向
        aspectName: [messages.EAST, messages.WEST, messages.SOUTH, messages.NORTH, messages.SOUTHEAST, messages.NORTHEAST, messages.SOUTHWEST, messages.NORTHWEST, messages.EAST_WEST, messages.NORTH_SOUTH, messages.central],
        // 房屋景观
        houseViewName: [messages.cityView, messages.seaView, messages.mountainView, messages.parkView, messages.waterView],
        // propertyStatusName
        propertyStatusName: [messages.available, messages.reserved, messages.sold],
        // yesNo
        yesNo: [messages.yes, messages.no],
        // 不动产状态
        propertyStatusWord: [messages.available, messages.reserved, messages.sold],
        // 面积单位
        areaUnit: {
            AU: '(㎡)',
            UK: '(Ft²)',
            US: '(Ft²)'
        },
        // LengthUnit
        LengthUnit: {
            AU: '(m)',
            UK: '(Ft)',
            US: '(Ft)'
        },
        // 模板文件下载地址
        excelFilePath: '/xlsx/'
    };
});

export default propertyMap;


/*const validationWord = {
 validations: {
 isExisty: true,
 isInt: true,
 min5Max4: true,
 isNumeric: true,
 zeroTo100: true,
 zeroTo50: true,
 propertyRoomNum: true,
 aDecimal: true,
 doubleDecimal: true,
 tinyint: true,
 maxLen12: true,
 maxLen10: true,
 maxLen8: true,
 maxLenChar10: true,
 maxLenChar7: true,
 maxLen5: true,
 maxLen4: true,
 maxLen3: true
 },
 validationErrors: {
 isExisty: messages.isExistyEroorTip, // '不能为空'
 isInt: messages.isIntEroorTip, // '数值只能为整数'
 min5Max4: messages.min5max4, // '请输入0.5到到4的数值'
 isNumeric: messages.isNumericEroorTip, // '数值为整数或者小数'
 zeroTo100: messages.zeroTo100EroorTip, // '数值必须在0到100之间(含100)'
 zeroTo50: messages.zeroTo50EroorTip, // '数值必须在0到50之间(含50)'
 propertyRoomNum: messages.propertyRoomNumTip, // '数值小数位只能是0或5'
 aDecimal: messages.aDecimalEroorTip, // '数值小数位最多一位'
 doubleDecimal: messages.doubleDecimalEroorTip, // '数值小数位位最多两位'
 tinyint: messages.tinyint, // '数值为0到255的整数'
 maxLen12: messages.maxLen12, // '整数位最大长度为12'
 maxLen10: messages.maxLen10, // '整数位最大长度为10'
 maxLenChar10: messages.maxLenChar10, // '最大长度为10'
 maxLen8: messages.maxLen8, // '整数位最大长度为8'
 maxLenChar7: messages.maxLenChar7, // '最大长度为7'
 maxLen5: messages.maxLen5, // '整数位最大长度为5'
 maxLen4: messages.maxLen4, // '整数位最大长度为4'
 maxLen3: messages.maxLen3 // '整数位最大长度为3'
 },
 };*/
