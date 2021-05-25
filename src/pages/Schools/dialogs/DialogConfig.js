export const Consts = {
    headers: {
        child1: 'Create School',
        child2: 'Import File',
    },
    operations: {
        cancel: 'Cancel',
        save: 'Save',
        WithData: 'With Representative',
    },
    messages: {
        info: '',
        success: 'Created Successfully',
        error: 'Created Failed',
        warning: '',
    },
    fields: {
        name: {
            title: 'School Name',
        },
        addr: {
            title: 'Address',
        },
        dist: {
            title: 'District',
        },
        status: {
            title: 'School Active',
        },
        eduLvl: {
            title: 'Educational Level',
        },
        // scale: {
        //     title: 'School Scale',
        // },
        type: {
            title: 'School Type',
        },
        salesStatus: {
            title: 'School Status',
        },
        des: {
            title: 'Description',
        },
        tel: {
            title: 'Tel',
        },
        repName: {
            title: 'Full Name',
        },
        repGender: {
            title: 'Gender',
            male: {
                lb: 'Male',
                value: 'true',
            },
            female: {
                lb: 'Female',
                value: 'false',
            },
        },
        repEmail: {
            title: 'Email',
        },
        repPhone: {
            title: 'Phone Number',
        },
    },

    excel: {
        name: 'Tên trường',
        educationalLevel: 'Cấp học',
        phone: 'SĐT trường',
        district: 'Quận/Huyện',
        address: 'Địa chỉ (tồn tại duy nhất)',
        reprName: 'Hiệu trưởng/Hiệu phó',
        isMale: 'Giới tính',
        reprPhone: 'SĐT HT/HP',
        reprEmail: 'Email HT/HP',
        type: 'Loại hình',
        // scale: 'Quy mô',
        status: 'Tình trạng',
        description: 'Thông tin chi tiết',
        isMaleValue: 'Nam',
    },
    contentText1:
        'To import file to this system, please select a file in your device. The system only accepts ',
    fileFormat: ' xlsx, xls, csv ',
    contentText2: 'file format.',
    contentLink: 'to download an import sample file.',
    linkText: 'Click here ',
    alertText: 'Total rows will be inserted  — ',
    alertType: {
        warning: 'Warning',
        success: 'Checked',
        error: 'Error',
    },
    refFile: 'documents/Import_Sample.xlsx',
}
