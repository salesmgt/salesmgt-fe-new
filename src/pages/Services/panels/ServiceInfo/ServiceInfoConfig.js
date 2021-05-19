import { serviceNames } from "../../../../constants/Generals"

export const Consts = {
    headers: {
        child1: 'Service Detail',
        child2: 'Evaluation Criteria',
    },
    operations: {
        // cancel: 'Cancel',
        approve: 'Approve',
        reject: 'Reject',
    },
    fields: {
        fullName: {
            title: 'Full Name',
        },
    },
}

// Chưa có schoolLevel để tính
// export const criteria = (serviceType, schoolLevel) => {
//     switch (serviceType) {
//         case serviceNames.svc1: // ESL
//             if (schoolLevel === 'Tiểu học') {
//                 return [
//                     { key: 'check', name: '' },
//                     { key: 'price', name: 'Price Floor >= 700.000VND/period', value: 700000 },
//                     { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
//                     { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
//                     { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
//                 ]
//             } else {
//                 return [
//                     { key: 'check', name: '' },
//                     { key: 'price', name: 'Price Floor >= 800.000VND/period', value: 800000 },
//                     { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
//                     { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
//                     { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
//                 ]
//             }
//         case serviceNames.svc2: // SEL
//             if (schoolLevel === 'Tiểu học') {
//                 return [
//                     { key: 'check', name: '' },
//                     { key: 'price', name: 'Price Floor >= 600.000VND/period', value: 600000 },
//                     { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
//                     { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
//                     { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
//                 ]
//             } else {
//                 return [
//                     { key: 'check', name: '' },
//                     { key: 'price', name: 'Price Floor >= 700.000VND/period', value: 700000 },
//                     { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
//                     { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
//                     { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
//                 ]
//             }
//         case serviceNames.svc3: // Toán khoa
//             if (schoolLevel === 'Tiểu học') {
//                 return [
//                     { key: 'check', name: '' },
//                     { key: 'price', name: 'Price Floor >= 1.500.000VND/period', value: 1500000 },
//                     { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
//                     { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
//                     { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
//                 ]
//             }
//         case serviceNames.svc4: // STEAM
//             if (schoolLevel === 'Tiểu học') {
//                 return [
//                     { key: 'check', name: '' },
//                     { key: 'price', name: 'Price Floor >= 1.000.000VND/period', value: 1000000 },
//                     { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
//                     { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
//                     { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
//                 ]
//             } else {
//                 return [
//                     { key: 'check', name: '' },
//                     { key: 'price', name: 'Price Floor >= 1.800.000VND/period', value: 1800000 },
//                     { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
//                     { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
//                     { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
//                 ]
//             }

//         default:
//             break;
//     }
// }

export const criteria = [
    { key: 'price', name: 'Price Floor >= 1.000.000VND/period', value: 1000000 },
    { key: 'class', name: 'Number of applied classes >= 10 classes', value: 10 },
    { key: 'student', name: 'Number of students per class >= 40 students', value: 40 },
    { key: 'duration', name: "Contract's duration >= 7 months", value: 7 },
]