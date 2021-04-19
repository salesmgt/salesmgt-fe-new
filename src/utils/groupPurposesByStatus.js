import * as Milk from './Milk'

export const generatePurposeSelections = (schStatus) => {
    const listPurps = Milk.getMilk('salesPurps');
    // let purpsSelections = [];

    switch (schStatus) {
        case 'Chưa hợp tác':
            // Sales mới, Theo dõi
            // purpsSelections.push(listPurps[''])
            break;
        case 'Đang hợp tác':
            // Chăm sóc, Tái ký hợp đồng, Ký mới hợp đồng
            break;
        // case 'Tiềm năng':    // Confirm lại vs Major sau?????
        //     // Theo dõi
        //     break;
        case 'Ngưng hợp tác':
        default:
            break;
    }
}