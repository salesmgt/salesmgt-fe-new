export const roleNames = {
    admin: 'ADMIN',
    manager: 'SALES MANAGER',
    supervisor: 'SALES SUPERVISOR',
    salesman: 'SALESMAN',
}

export const statusAcct = {
    active: 'Active',
    inactive: 'Inactive',
}

export const statusNames = {
    lead: 'Chưa hợp tác',
    customer: 'Đang hợp tác',
    pending: 'Ngưng hợp tác',
    potential: 'Tiềm năng'
}

export const schoolLevelNames = {
    th: 'Tiểu học',
    thcs: 'THCS',
    thpt: 'THPT',
    th_thcs: 'Tiểu học - THCS',
    thcs_thpt: 'THCS - THPT',
    th_thcs_thpt: 'Tiểu học - THCS - THPT'
}

// Đây là gtrị nhận lên từ BE
export const taskResultNames = {
    tbd: 'TBD',
    successful: 'successful',
    failed: 'failed',
}

// Đây là các tên tự đặt phía FE
export const taskStatusNames = {
    ongoing: 'Ongoing',
    success: 'Successful',
    failed: 'Failed',
}

export const serviceNames = {
    svc1: 'ESL',
    svc2: 'SEL',
    svc3: 'Toán Khoa',
    svc4: 'STEAM',
}

export const serviceStatusNames = {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected',
    // notStart: '',    // chỉ cần null là đc rồi chứ nhỉ? khỏi cần 1 status riêng cho nó   ==> Bỏ
}

export const kpiStatusNames = {
    applying: 'Being applied',
    expired: 'Expired',
    disable: 'Disable'
}

export const kpiDetailTypes = {
    auto: 'auto',
    manual: 'manual'
}

export const purposeNames = {
    purp1: 'Sales mới',
    purp2: 'Theo dõi',
    purp3: 'Chăm sóc',
    purp4: 'Tái ký hợp đồng',
    purp5: 'Ký mới hợp đồng',
}

export const suggestedReasons = {
    distance: 'Distance',
    ward: 'In Ward',
    district: 'In District',
    near: 'Nearly',
    exp: 'Experience',
    taskNo: 'Current assigned tasks',
    fewTask: 'Few tasks',
    quiteManyTask: 'Quite many tasks',
    manyTask: 'Many tasks',
    fullTask: 'Full tasks'
}

//==========================================================================

export const cookieNames = {
    accessToken: 'accessToken',
}

export const milkNames = {
    token: 'notMe',
    dists: 'dists',
    eduLvls: 'eduLvls',
    types: 'types',
    // scales: 'scales',
    status: 'status',   // schoolStatus
    roles: 'roles',
    schYears: 'schYears',
    salesPurps: 'salesPurps',
}
